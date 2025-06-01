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

    useEffect(() => {
        if (!userInfo) return;
        const ws = new WebSocket(`ws://localhost:8000/ws/notifications/`);
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const newNotification: Notification = {
                _id: data._id, // hoặc lấy từ backend nếu có
                message: data.message,
                link: data.link,
                seen: false,
                created_at: new Date().toISOString(),
                user: data.user
            };
            setNotifications(prev => [newNotification, ...prev]);
        };
        ws.onclose = () => console.log("WebSocket closed");
        ws.onerror = (err) => console.error("WebSocket error:", err);

        
        const fetchNotifications = async () => {
            try {
                const config = {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                };
                const response = await axios.get(`${baseURL}/api/notifications/`, config);
                console.log("Response", response)
                setNotifications(response.data.results);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
        return () => {
            ws.close();
        };
    }, [userInfo]);

    const handleNotificationClick = async (noti: Notification) => {
        if (!noti.seen) {
            try {
                const config = {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                };
                await axios.patch(`${baseURL}/api/notifications/${noti._id}/`, { seen: true }, config);
                setNotifications(prev =>
                    prev.map(n =>
                        n._id === noti._id ? { ...n, seen: true } : n
                    )
                );
            } catch (error) {
                console.error("Error marking notification as seen:", error);
            }
        }

        // Redirect sau khi xử lý
        window.location.href = `/${noti.link}`;
    };

        
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
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full px-1.5">
                            {unreadCount > 9 ? '9+' : unreadCount}
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
                                onClick={() => handleNotificationClick(noti)}
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

