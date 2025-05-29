import { useSelector } from "react-redux";
import { selectUser } from "../../types/user/userSlice";
import { useEffect,useState } from "react";

export default function ProfileScreen() {
    const userInfo = useSelector(selectUser);
    const tabs = ['info', 'uploads', 'mdlists'];
    const [activeTab, setActiveTab] = useState('info');
    useEffect(()=>{
        
    },[])
    return (
        userInfo ? (
            <>
                <div className="bg-gray-100">
                    <div className="container mx-auto py-8">
                        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                            {/* Phần thông tin bên trái */}
                            <div className="col-span-4 sm:col-span-3">
                                <div className="bg-white shadow rounded-lg p-6">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src="https://polywork-images-proxy.imgix.net/https%3A%2F%2Fwww.polywork.com%2Ffabform%2Favatar%3Fversion%3D0cff680649e03a4ca971c6e9ee8a2496?ixlib=rails-4.3.1&w=512&h=512&fit=crop&auto=format&s=b097b0d3e3db5a783064dd30ba909612"
                                            className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                                            alt="Profile image"
                                        />

                                        <h1 className="text-xl font-bold">Geoffrey Callaghan</h1>
                                        <p className="text-gray-700">Software Developer</p>
                                        <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                            <a href="https://veilmail.io/irish-geoff"
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">veilmail.io/irish-geoff</a>
                                            <a href="#"
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</a>
                                        </div>
                                    </div>

                                    <hr className="my-6 border-t border-gray-300" />

                                    <div className="flex flex-col">
                                        <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Skills</span>
                                        <ul>
                                            <li className="mb-2">JavaScript</li>
                                            <li className="mb-2">React</li>
                                            <li className="mb-2">Node.js</li>
                                            <li className="mb-2">HTML/CSS</li>
                                            <li className="mb-2">Tailwind CSS</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Phần thông tin bên phải */}
                            <div className="col-span-4 sm:col-span-9">
                                <div className="bg-white shadow rounded-lg p-6">
                                    <div className="relative inline-flex items-center bg-gray-100 rounded-lg p-1 space-x-1">
                                        {tabs.map((tab) => (
                                        <a
                                            key={tab}
                                            href={`?tab=${tab}`}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-4 py-2 font-bold rounded-md transition-colors ${
                                            activeTab === tab
                                                ? 'bg-black text-white'
                                                : 'text-gray-300 hover:text-black'
                                            }`}
                                        >
                                            <span className="capitalize">{tab}</span>
                                        </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <div className="flex items-center justify-center h-screen mt-1">
                <h1 className="text-xl font-bold text-center">Vui lòng đăng nhập</h1>
            </div>
        )
    );
}