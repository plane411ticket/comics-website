import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../types/user/userSlice";
import axios from "axios";
import {Notification} from "../../types/notification/notify"

const baseURL = import.meta.env.VITE_ADMIN_URL;

const Notify = () => {
    const userInfo = useSelector(selectUser);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // Tự động fetch mỗi 15 giây
    useEffect(() => {
        const fetchNotifications = async () => {
            if (!userInfo) return;

            try {
                const config = {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                };

                const response = await axios.get(`${baseURL}/api/notifications/`, config);
                setNotifications(response.data.results);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();

        const interval = setInterval(fetchNotifications, 5000); // 15 giây
        return () => clearInterval(interval); // cleanup
    }, [userInfo]);
    
    const unreadCount = notifications.filter(n => !n.seen).length;
    return (
        <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)}>
                <div className="relative cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700 hover:text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                            {unreadCount}
                        </span>
                    )}
                </div> 
            </button>
            {showDropdown && notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded shadow-lg z-50">
                    <ul className="max-h-60 overflow-y-auto">
                        {notifications.map((noti) => (
                            <li
                                key={noti._id}
                                className={`p-2 hover:bg-gray-100 border-b ${noti.seen ? 'text-gray-500' : 'text-black'}`}
                                onClick={async () => {
                                    if (!noti.seen) {
                                        try {
                                            await axios.patch(
                                                `${baseURL}/api/notifications/${noti._id}/`,
                                                { seen: true },
                                                {
                                                    headers: { 'Content-Type': 'application/json' },
                                                    withCredentials: true,
                                                }
                                            );

                                            setNotifications(prev =>
                                                prev.map(n =>
                                                    n._id === noti._id ? { ...n, seen: true } : n
                                                )
                                            );
                                        } catch (err) {
                                            console.error("Failed to mark as seen", err);
                                        }
                                    }
                                    window.location.href = `/${noti.link}`;
                                }}
                            >
                                <span className="text-sm">{noti.message}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                )}
            </div>
    );
};
export default Notify;

