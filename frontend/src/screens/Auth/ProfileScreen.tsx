import { useSelector } from "react-redux";
import { selectUser } from "../../types/user/userSlice";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import React from "react";
import { useSearchParams } from "react-router-dom";
import {fetchProfile} from "../../actions/userAction";
import { User } from "../../types/user/User";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { updateAvatar, updateProfile } from "../../actions/userAction";

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
        const [selectorStyles, setSelectorStyles] =  useState<{ left: number; width: number } | null>(null);
        const [selectorReady, setSelectorReady] = useState(false);
        const [profile, setProfile] = useState<User | null>(null);
        const isOwner = !username || username === userInfo?.name;
        const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("avatar", file);
            try {
                await updateAvatar(formData,userInfo);
                const updatedProfile = await fetchProfile();
                setEditProfile(updatedProfile);
                console.log("Avatar updated successfully", updatedProfile?.cover);
            } catch (error) {
                console.error("Error updating avatar:", error);
            }
        };

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
                  if(username) 
                    profileData = await fetchProfile(username);
                  else profileData = await fetchProfile();
                  
                  console.log("Fetching profile for user:", username," userInfo:", userInfo);
                  
                  if(!userInfo?.isLogin) setValid(false);
            
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
        },[searchParams]);

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
          const res = updateProfile(editProfile);
          if (res) {
            console.log("Profile updated successfully:", res);
          } else {
            console.error("Failed to update profile");
          }

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
                {editMode && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  id="avatar-upload"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow cursor-pointer hover:bg-gray-200"
                    title="Đổi ảnh đại diện"
                  >
                    <FaEdit size={20} className="text-gray-700" />
                  </label>
                  </>
                        )}
                      </div>


                <h2 className="text-xl font-bold">{profile?.username}</h2>

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
          <div className="col-span-4 justify-center sm:col-span-9 items-center">
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
              <div className="items-center mt-6 min-h-[200px]">
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
                    
                      
                     {/* Tên đăng nhập */}
<div className="flex flex-col items-center gap-2 w-full py-4">
  <label className="block font-semibold text-gray-700 text-4xl text-center" htmlFor="username">
    Tên đăng nhập:
  </label>
  {editMode ? (
    <input
      type="text"
      id="username"
      name="username"
      value={editProfile?.username || ""}
      onChange={handleChange}
      className="border rounded px-2 py-1 text-center text-2xl w-full max-w-xs"
    />
  ) : (
    <span className="text-gray-800 text-4xl text-center">{profile?.username}</span>
  )}
</div>
{/* Email */}
<div className="flex flex-col items-center gap-2 w-full py-4">
  <label className="block font-semibold text-gray-700 text-4xl text-center" htmlFor="email">
    Email:
  </label>
  {editMode ? (
    <input
      type="email"
      id="email"
      name="email"
      value={editProfile?.email || ""}
      onChange={handleChange}
      className="border rounded px-2 py-1 text-center text-2xl w-full max-w-xs"
    />
  ) : (
    <span className="text-gray-800 text-4xl text-center">{profile?.email}</span>
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
