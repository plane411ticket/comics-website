import meme from '../assets/huh_cat.png';
import { Link } from 'react-router-dom';


export default function Error() {
    return (
        <div className="flex items-center justify-center bg-orange-800 text-white font-Nurito px-4 h-screen ">
                    <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 sm:p-10  text-center animate-fade-in transition-all duration-400">
                        <Link to="/" className="text-2xl font-bold mb-4 text-orange-600 hover:text-orange-500">
                        <img
                            src={meme}
                            alt="huh"
                            className="w-100 h-70 mx-auto mb-6 object-contain"
                        />
                        </Link>
                        <h2 className="text-5xl md:text-4xl font-extrabold mb-3 text-orange-700">
                            Huh..Huh...!
                        </h2>
                        <p className="text-base md:text-lg mb-6 text-gray-600">
                            Trang bạn tìm kiếm không tồn tại! Vui lòng về trang chủ.
                        </p>
                        <Link
                            to="/"
                            className="inline-block bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg"
                        >
                            Về trang chủ
                        </Link>
                    </div>
                </div>
    )
}