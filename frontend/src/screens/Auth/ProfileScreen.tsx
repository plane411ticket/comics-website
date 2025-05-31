import { useSelector } from "react-redux";
import { selectUser } from "../../types/user/userSlice";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import React from "react";
import { useSearchParams } from "react-router-dom";
import {fetchProfile} from "../../actions/userAction";
import { User } from "../../types/user/User";
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
        // Update URL when tab changes
        useEffect(() => {
            setSearchParams({ tab: activeTab });
        }, [activeTab, searchParams]);

        const tabContent = Object.fromEntries(
            Object.entries(tabsConfig).map(([key, { component }]) => [key, component])
        ) as Record<TabKey, React.ReactNode>;
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

        const [profile, setProfile] = useState<User | null>(null);
        useEffect(()=>{
            if(userInfo)
            {
                const fetchData = async ()=>{
                    try {
                        const profileData = await fetchProfile();
                        setProfile(profileData);
                    } catch (error) {
                        console.error("Error fetching profile:", error);
                    }
                }
                fetchData();
            }
        },[userInfo]);

        

  return userInfo ? (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          {/* Left column */}
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
               
                  <img
                  src={profile?.cover}
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt="Profile image"
                />


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
            <div className="bg-white shadow rounded-lg p-6">
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
                <div className="mt-6 min-h-[100px]">
                {tabContent[activeTab]}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen mt-1">
      <h1 className="text-xl font-bold text-center">Vui lòng đăng nhập</h1>
    </div>
  );
}
