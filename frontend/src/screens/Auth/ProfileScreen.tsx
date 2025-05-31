import { useSelector } from "react-redux";
import { selectUser } from "../../types/user/userSlice";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import React from "react";
import { useSearchParams } from "react-router-dom";
import {fetchProfile, updateAvatar} from "../../actions/userAction";
import { User } from "../../types/user/User";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
// 1. Define the tab keys and their content types
type TabKey = "info" | "uploads" | "mdlists";


interface TabContent {
    title: string;
    component: React.ReactNode;
}

export default function ProfileScreen() {
        const userInfo = useSelector(selectUser);
        const [searchParams, setSearchParams] = useSearchParams();
        const tabRefs = useRef<{ [key in TabKey]?: HTMLAnchorElement | null }>({});
        const { username } = useParams();
        const [isValid,setValid] = useState<boolean>(false);
        // Define tabs with their content
        const tabsConfig: Record<TabKey, TabContent> = {
            info: {
                title: "Information",
                component: <div>Overview content</div>
            },
            uploads: {
                title: "My Uploads",
                component: <div>Uploads content</div>
            },
            mdlists: {
                title: "My Lists",
                component: <div>MDLists content</div>
            }
        };

        const tabs = Object.keys(tabsConfig) as TabKey[];
        
        // Get active tab from URL or default to 'info'
        const [activeTab, setActiveTab] = useState<TabKey>(() => {
            const tabParam = searchParams.get("tab") as TabKey;
            return tabs.includes(tabParam) ? tabParam : "info";
        });

        const [selectorStyles, setSelectorStyles] =  useState<{ left: number; width: number } | null>(null);
        const [selectorReady, setSelectorReady] = useState(false);
        const [profile, setProfile] = useState<User | null>(null);
        const isOwner = !username || username === userInfo?.name;
        // Update URL khi tab thay đổi //
        useEffect(() => {
            setSearchParams({ tab: activeTab });
        }, [activeTab, searchParams]);

        const tabContent = Object.fromEntries(
            Object.entries(tabsConfig).map(([key, { component }]) => [key, component])
        ) as Record<TabKey, React.ReactNode>;
        // Update selector khi tab thay đổi //
        useLayoutEffect(() => {
            const timer = setTimeout(() => {
                const el = tabRefs.current[activeTab];
                if (el) {
                const { offsetLeft, offsetWidth } = el;
                setSelectorStyles({ left: offsetLeft, width: offsetWidth });
                setSelectorReady(true);
                }
            }, 0);
        return () => clearTimeout(timer);
        }, [activeTab, userInfo]);

        // Fetch profile khi xác thực được đối tượng //
        useEffect(()=>{
          const fetchData = async () =>{
              try {
                var profileData = null;
                  console.log("Fetching profile for user:", username);
                  if(username) 
                    profileData = await fetchProfile(username);
                  else profileData = await fetchProfile();
                  
                  if(profileData === null) setValid(false);
                  else {
                    setProfile(profileData);
                    setValid(true);
                  }
                  console.log("Profile fetched:", profileData);
                  
              } catch (error) {
                  console.error("Error fetching profile:", error);
                  setValid(false);
              }
          }
            fetchData();
        },[userInfo, searchParams]);

        // Thêm state cho chế độ chỉnh sửa //
        const [editMode, setEditMode] = useState(false);
        const [editProfile, setEditProfile] = useState<User | null>(null);

        // Khi nhấn chỉnh sửa, copy dữ liệu profile sang editProfile
        const handleEdit = () => {
          setEditProfile(profile);
          setEditMode(true);
        };

        // Khi lưu chỉnh sửa
        const handleSave = async () => {
          // TODO: Gọi API cập nhật thông tin profile ở backend
          // await updateProfile(editProfile);
          setProfile(editProfile);
          setEditMode(false);
        };

        // Khi hủy chỉnh sửa
        const handleCancel = () => {
          setEditMode(false);
          setEditProfile(null);
        };

        // Khi thay đổi trường dữ liệu
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          if (!editProfile) return;
          setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
        };


        

  return isValid ? (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="w-full grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          {/* Left column */}
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6 min-h-[400px] flex flex-col">
              <div className="flex flex-col items-center">
                <div className="relative">
               
                  <img
                  src={profile?.cover}
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt="Profile image"
                  />

                {/* Nút đổi avatar */}
                <label className="absolute bottom-2 right-2 bg-black bg-opacity-60 rounded-full p-2 cursor-pointer hover:bg-opacity-80 transition">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    // onChange={handleAvatarChange}
                    // disabled={uploading}
                  />
                  {/* <span className="text-white text-xs">{uploading ? "..." : "🖊️"}</span> */}
                </label>
              </div>


                <h2 className="text-xl font-bold">{profile?.first_name}</h2>

                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">
                    Theo dõi
                  </button>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="flex flex-col">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                 {profile?.group ? profile.group : "Đã đăng nhập"}
                </span>
                
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6 h-full min-h-[400px] max-h-[400px] overflow-y-auto">
                {/* Animated Tabs */}
                <div className="relative inline-flex items-center bg-gray-100 rounded-lg p-1 space-x-1">
                {/* Animated background */}
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute top-1 bottom-1 bg-black rounded-md z-0"
                    style={{
                    left: selectorStyles?.left,
                    width: selectorStyles?.width,
                    }}
                />
                {tabs.map((tab) => (
                    <a
                    key={tab}
                    href={`?tab=${tab}`}
                    ref={(el) => {
                        tabRefs.current[tab] = el;
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(tab);
                    }}
                    className={`relative z-10 px-4 py-2 font-bold rounded-md transition-colors ${
                        activeTab === tab && selectorReady
                        ? "text-white"
                        : "text-gray-400 hover:text-black"
                    }`}
                    >
                    <span className="capitalize">{tab}</span>
                    </a>
                ))}
                </div>

                  {/* Content */}
              <div className="items-start mt-6 min-h-[200px]">
                {activeTab === "info" ? (
                  <div className="relative">
                    {/* Nút chỉnh sửa */}
                    {!editMode && isOwner && (
                      <button
                        className="absolute top-0 right-0 text-gray-500 hover:text-blue-600"
                        onClick={handleEdit}
                        title="Chỉnh sửa thông tin"
                      >
                        <FaEdit size={20} />
                      </button>
                    )}
                    <form className="w-full max-w-lg flex flex-col gap-4 ">
                      {/* Trạng thái */}
                      <div className="flex flex-col sm:flex-row items-start gap-2 ">
                        <label className="block font-semibold min-w-[120px] text-gray-700" htmlFor="status">
                          Trạng thái:
                        </label>
                        {editMode ? (
                          <textarea
      id="status"
      name="status"
      value={editProfile?.status || ""}
      onChange={handleChange}
      className="border rounded px-2 py-1 flex-1 resize-y"
      rows={3} // bạn có thể chỉnh số dòng textarea mặc định
    />
                        ) : (
                          <span className="text-gray-800 break-words whitespace-pre-line w-full text-left">{profile?.status || "Chưa có"}</span>
                        )}
                      </div>
                      {/* Tên đăng nhập */}
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                        <label className="block font-semibold min-w-[120px] text-gray-700" htmlFor="first_name">
                          Tên đăng nhập:
                        </label>
                        {editMode ? (
                          <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={editProfile?.first_name || ""}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 flex-1"
                          />
                        ) : (
                          <span className="text-gray-800">{profile?.first_name}</span>
                        )}
                      </div>
                      
                      {/* Email */}
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                        <label className="block font-semibold min-w-[120px] text-gray-700" htmlFor="email">
                          Email:
                        </label>
                        {editMode ? (
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={editProfile?.email || ""}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 flex-1"
                          />
                        ) : (
                          <span className="text-gray-800">{profile?.email}</span>
                        )}
                      </div>
                      {/* Ngày sinh */}
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                        <label className="block font-semibold min-w-[120px] text-gray-700" htmlFor="birthday">
                          Ngày sinh:
                        </label>
                        {editMode ? (
                          <input
                            type="date"
                            id="birthday"
                            name="birthday"
                            value={editProfile?.birthday || ""}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 flex-1"
                          />
                        ) : (
                          <span className="text-gray-800">{profile?.birthday}</span>
                        )}
                      </div>
                      {/* Nút lưu/hủy */}
                      {editMode && (
                        <div className="flex gap-4 mt-2">
                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={handleSave}
                            type="button"
                          >
                            Lưu
                          </button>
                          <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            onClick={handleCancel}
                            type="button"
                          >
                            Hủy
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                ) : (
                  tabContent[activeTab]
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen mt-1">
      <h1 className="text-xl font-bold text-center">Profile không tồn tại</h1>
    </div>
  );
}
