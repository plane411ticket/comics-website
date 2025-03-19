//import Navbar from "../../screens/Navbar/Navbar.tsx"; // Import đúng file Navbar
import homeMobile from "../../assets/home_mobile.jpg";
import kid from "../../assets/kid.jpg";

const HomePage = () => {
  return (
  /*  <div className="min-h-screen bg-white " id="Homepage" >
      <div className="container mx-auto text-center py-10">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to My Manga</h2>
        <p className="text-gray-600 mt-4">Explore thousands of manga now!</p>
      </div>
    </div> */

      <div className="min-h-screen bg-black text-white flex flex-col md:flex-row items-center justify-between px-6">
          {/* Phần bên trái: Nội dung giới thiệu */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left space-y-6">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center space-x-2">
              <span>🔧 Không thể bỏ qua</span>
          </button>
            
          <h1 className="text-10xl md:text-10xl font-bold text-center">
            <span className="block">Welcome</span>
            <span className="block">to</span>
            <span className="block">my website</span>
         </h1>
          <p className="text-lg text-gray-300">Là món ăn tinh thần không thể bỏ lỡ cho các fan chân chính của KLH-chan!!!!</p>
    
          {/* Nút CTA */}
          <a href="#" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:opacity-80 transition">
              Tham gia ngay →
          </a>
        </div>

        {/* Phần bên phải (chiếm 1/2 màn hình) */}
         {/* Phần bên phải: Mockups */}
      <div className="relative w-[600px] h-[400px] flex items-center justify-center mt-10 md:mt-0">
        {/* iPad Mockup */}
        <div className="relative w-[600px] h-[520px] bg-gray-900 rounded-3xl border-8 border-gray-800 shadow-xl overflow-hidden mt-20">
          <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 rounded-t-2xl"></div>
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${kid})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        </div>

        {/* Mobile Mockup */}
        <div className="absolute w-[280px] h-[450px] bg-gray-900 rounded-[40px] border-[10px] border-gray-800 shadow-xl overflow-hidden left-[-100px] top-[20%] scale-90 hover:scale-100 hover:shadow-2xl transition-transform">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-2xl"></div>
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${homeMobile})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        </div>
      </div>
  </div>
  );
};
    



export default HomePage;
