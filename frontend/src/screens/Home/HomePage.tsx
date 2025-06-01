//import Navbar from "../../screens/Navbar/Navbar.tsx"; // Import đúng file Navbar
/* 
    <div className="min-h-screen bg-white " id="Homepage" >
      <div className="container mx-auto text-center py-10">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to My Manga</h2>
        <p className="text-gray-600 mt-4">Explore thousands of manga now!</p>s
      </div>
    </div> 

 */

import { useEffect, useState } from "react";
import { FaCircle } from 'react-icons/fa';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import homeMobile from "../../assets/home_mobile.jpg";
import kid from "../../assets/kid.jpg";
import book from "../../assets/book.jpg";
import magazine from "../../assets/magazine.jpg";
import video from "../../assets/trailer_web.mp4";
import { Link } from "react-router-dom";
{/*}
import japan from "../../assets/japan.png";
import hanquoc from "../../assets/HQ_charater.png";
import vietnam from "../../assets/VN_character.png";
import trungquoc from "../../assets/TQ_chrater.png";
*/}
const text = "Trải nghiệm đa dạng các thể loại về Comic";
const words = text.split(" ");

const main_title = "Welcome to my website";
const title = main_title.split(" ");

const community = "Tham gia cộng đồng \"nghiện\" Comic tại đây";
const set_community = community.split(" ");

const aboutme = "Về chúng mình";
const set_aboutme = aboutme.split(" ");


const HomePage = () => {
  /// Điều khiển animation cho phần "Trải nghiệm đa dạng..."
  const controls1 = useAnimation();
  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView1) controls1.start("visible");
  }, [inView1, controls1]);

  // Điều khiển animation cho phần "Tham gia cộng đồng..."
  const controls2 = useAnimation();
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView2) controls2.start("visible");
  }, [inView2, controls2]);

    //const [shake, setShake] = useState(false);


    // Điều khiển animation xuất hiện khi cuộn đến
  const controls3 = useAnimation();
  const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView3) controls3.start("visible");
  }, [inView3, controls3]);

  const [activeIndex] = useState<number | null>(null);

  // Danh sách nội dung
  const aboutData = [
    { title: "Tâm huyết", description: "Thức khuya hơn cú đêm." },
    { title: "Kinh nghiệm", description: "Tay trái code, tay phải viết prompt." },
    { title: "Sáng tạo", description: "Cũng có nhưng không đáng kể." },
    { title: "Đam mê", description: "Làm là phải cháy hết mình." },
  ];

  const timelineData = [
    { date: '3 / 2025', title: 'Bước khởi đầu', description: 'Khởi động dự án với những ý tưởng đột phá.', image: kid },
    { date: '4 / 2025', title: 'Ra mắt các tính năng', description: 'Các sản phẩm độc đáo và đa dạng từ Happy Monkey sẽ được cung cấp tại website.', image: magazine },
    { date: '5 / 2025', title: 'Ra mắt tính năng advanced search', description: 'Tăng trải nghiệm người dùng, dễ dàng kiếm truyện.', image: homeMobile },
  ];

  return (
    <div className="min-h-screen  text-white" style={{
      backgroundImage: `url("${book}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      
      {/* --- PHẦN HEADER --- */}
      <div className="min-h-screen flex flex-col md:flex-row items-start justify-between px-6 pt-10">
        {/* Phần trái: Giới thiệu */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left space-y-6">
          <button className="relative inline-block overflow-hidden px-4 py-2 bg-gray-600 text-white font-semibold rounded">
            <span className="relative z-10">🔧 Không thể bỏ qua</span>
            <span
              className="absolute top-0 left-[-100%] w-full h-full bg-amber-100 opacity-20
                        transform skew-x-[-20deg] animate-shine pointer-events-none"
            />
          </button>


          <h1 className="text-4xl md:text-5xl font-bold text-white ">
            {title.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.9 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
   

          <p className="text-lg text-gray-300">
            Là món ăn tinh thần không thể bỏ lỡ !!!!
            <br />
            Nơi giải trí và khám phá thế giới Comic
          </p>
          <Link to="/avsearch" className="text-lg text-orange-500">
          <a href="#" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:opacity-80 transition">
            Tham gia ngay →
          </a>
          </Link>
        </div>

        {/* Phần phải: Mockups */}
        <div className="relative flex col items-center justify-center w-full max-w-[690px] md:mt-0 ml-auto">
            {/* iPad Mockup */}
            <div className="relative w-full max-w-[690px] aspect-[4/3] rounded-3xl border-6 border-gray-800 shadow-xl overflow-hidden mt-9 items-center flex justify-end">
              <div className="top-0 left-0 right-0 h-6 rounded-t-2xl"></div>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url("${kid}")` }}
              ></div>
            </div>

            {/* Mobile Mockup */}
            <div className="absolute w-[40%] max-w-[280px] aspect-[9/16] bg-gray-900 rounded-[40px] border-[5px] border-gray-800 shadow-xl overflow-hidden left-[-15%] top-[21%] scale-90 hover:scale-100 hover:shadow-2xl transition-transform flex items-center justify-center">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url("${homeMobile}")` }}
              ></div>
            </div>
          </div>

      </div>

      {/* --- PHẦN TRẢI NGHIỆM (KÉO XUỐNG MỚI HIỆN) --- */}
      <motion.div
      ref={ref1}
      initial="hidden"
      animate={controls1}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }}
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 pt-20 md:pt-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${kid})` }}
      >
      {/* Lớp overlay để tạo hiệu ứng mờ */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Nội dung chính */}
      <div className="relative z-10 max-w-5xl w-full px-4 sm:px-6 md:px-8">
        {/* Tiêu đề có hiệu ứng */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-snug sm:leading-tight">
          {words.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-1 sm:mr-2"
              initial="hidden"
              animate={controls1}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

              {/* Mô tả */}
              {/* Mô tả - Hiệu ứng slide-in từ trái */}
            <motion.p
              className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2"
              initial={{ opacity: 0, x: -50 }}
              animate={controls1}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            > Khám phá các thể loại phong phú, từ Kinh Dị, Trinh Thám đến những khoảnh khắc đời thường ấm áp.
            </motion.p>

            {/* Nút CTA - Hiệu ứng slide-up */}
            <motion.div
              className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center items-center"
              initial="hidden"
              animate={controls1}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="w-full max-w-[260px] bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 sm:px-6 py-3 rounded-md text-base sm:text-lg font-semibold shadow-lg hover:opacity-80 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/genre" className="flex items-center justify-center">
                  <span className="flex items-center justify-center">
                    <span className="text-white">Khám phá ngay</span>
                  </span>
                </Link>
              </motion.button>

              <motion.button
                className="w-full max-w-[260px] bg-gray-800 text-white px-4 sm:px-6 py-3 rounded-md text-base sm:text-lg font-semibold shadow-lg hover:bg-gray-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                const aboutSection = document.getElementById("about-us-section");
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              >
                Tìm hiểu thêm
              </motion.button>
            </motion.div>


            </div>
            <div className="relative w-full flex items-center justify-center pt-10 px-4 md:px-0">
                    <motion.div 
                        className="relative w-full max-w-[790px] aspect-video rounded-2xl md:rounded-[20px] border-[2px] md:border-[10px] border-gray-800 shadow-xl bg-black flex flex-col"
                        //animate={shake ? { rotate: [0, -5, 5, -5, 5, 0] } : {} }
                        transition={{ duration: 0.5 }}
                    >
                        {/* <div className="absolute top-0 left-0 right-0 h-[40px] bg-gray-900 flex items-center px-4 rounded-t-[30px]">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div> */}
                        <video 
                            className="w-full h-full object-cover"
                            src={video}
                            autoPlay 
                            loop 
                            muted={true}
                            controls={false} 
                            playsInline
                        />
                        { /*
                        <div className="absolute top-[-70px] left-[-150px] w-54 h-54 cursor-pointer z-[9999]" onClick={() => setShake(true)}>
                            <img src={vietnam} alt="icon" />
                        </div>
                        <div className="absolute top-[-50px] right-[-150px] w-50 h-52 cursor-pointer z-[9999]" onClick={() => setShake(true)}>
                            <img src={japan} alt="icon" />
                        </div>
                        <div className="absolute bottom-[-120px] left-[-150px] w-56 h-56 cursor-pointer z-[9999]" onClick={() => setShake(true)}>
                            <img src={hanquoc} alt="icon" />
                        </div>
                        <div className="absolute bottom-[-50px] right-[-130px] w-42 h-42 cursor-pointer z-[9999]" onClick={() => setShake(true)}>
                            <img src={trungquoc} alt="icon" />
                        </div>
                        */}
                    </motion.div>
                </div>

        </motion.div>

        <div className="flex justify-center items-center px-4 sm:px-6 md:px-8 pt-24 sm:pt-32 md:pt-40">
      {/* Khung bao bọc */}
      <motion.div
        ref={ref2}
        initial="hidden"
        animate={controls2}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
        className="relative w-full max-w-6xl p-[2px] sm:p-[3px] rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 shadow-2xl"
      >
        {/* Nội dung bên trong khung */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 py-10 sm:py-14 md:py-16 bg-black text-white rounded-2xl">
          {/* Nội dung bên trái */}
          <div className="md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {set_community.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-2"
                  initial="hidden"
                  animate={controls2}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <p className="text-base sm:text-lg text-gray-300">
              Với hàng nghìn thành viên và đa dạng nội dung về Comic, cùng chúng mình nhập hội nhé!
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center sm:items-start justify-center sm:justify-start">
              <motion.button
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 sm:px-6 py-3 rounded-md text-base sm:text-lg font-semibold shadow-lg hover:opacity-80 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/manga" className="flex items-center justify-center">
                  <span className="flex items-center justify-center">
                    <span className="text-white">Tham gia ngay</span>
                  </span>
                </Link>
              </motion.button>
              <motion.button
                className="bg-gray-800 text-white px-5 sm:px-6 py-3 rounded-md text-base sm:text-lg font-semibold shadow-lg hover:bg-gray-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                const aboutSection = document.getElementById("about-us-section");
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              >
                Tìm hiểu thêm
              </motion.button>
            </div>
          </div>

          {/* Hình ảnh bên phải */}
          <div className="md:w-1/2 flex justify-center mt-8 md:mt-0 px-4">
           <img 
              src={magazine}
              alt="Comic Community"
              className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] h-auto object-contain"
             ></img> 
           
          </div>
        </div>
      </motion.div>


    </div>

    <motion.div
      ref={ref3}
      initial="hidden"
      animate={controls3}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className="relative w-full flex flex-col items-center justify-center text-center px-6 bg-black py-20"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {set_aboutme.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-2"
              initial="hidden"
              id="about-us-section"
              animate={controls3}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: index * 0.2, duration: 0.3 }}
            >
              {word}
            </motion.span>
          ))}
      </h2>

      <motion.p
              className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 mt-6"
              initial={{ opacity: 0, x: -50 }}
              animate={controls3}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            > Luôn nỗ lực hết mình để có trang web hoàn hảo nhất cho các bạn.
            </motion.p>


      {/* Container chứa các ô nội dung */}
      <motion.div 
   className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 w-full max-w-6xl px-4 sm:px-6 md:px-8 pt-5"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0, y: 50 }, // Ẩn xuống dưới
    visible: { 
      opacity: 1, y: 0, 
      transition: { 
        duration: 0.5, // Thời gian xuất hiện của mỗi phần tử
       // 🌟 Ẩn lâu hơn trước khi hiện
        staggerChildren: 0.1 // 🌟 Các phần tử xuất hiện cách nhau lâu hơn
      } 
    }
  }}
>
  {aboutData.map((item, index) => (
    <motion.div
      key={index}
      className="relative flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-xl shadow-lg cursor-pointer overflow-hidden transition-all duration-300"
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} // Kế thừa từ cha
      whileHover={{ scale: 1.15 }}
    >
      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
      <motion.p
        className={`text-gray-300 mt-2 transition-all duration-300 ${
          activeIndex === index ? "text-lg" : "text-sm"
        }`}
      >
        {item.description}
      </motion.p>
    </motion.div>
  ))}
</motion.div>



    </motion.div>


          <div className="text-white min-h-screen px-4 sm:px-6 md:px-10 py-10 flex justify-center">
        <div className="w-full max-w-4xl relative">
          {/* Đường timeline */}
          <div className="absolute left-6 sm:left-10 top-0 h-full w-1 bg-gray-600 z-0" />

          {timelineData.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-start sm:items-center mb-16 relative"
            >
              {/* Chấm tròn và ngày tháng */}
              <div className="absolute left-6 sm:left-10 top-0 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="flex flex-col items-center">
                  <div className="bg-orange-500 p-2 rounded-full">
                    <FaCircle className="text-white" size={12} />
                  </div>
                  <div className="mt-2 text-sm sm:text-base font-bold text-orange-400 whitespace-nowrap">
                    {event.date}
                  </div>
                </div>
              </div>

              {/* Nội dung chính */}
              <div className="sm:ml-40 mt-10 sm:mt-0 pl-6 sm:pl-0 pr-2 w-full bg-white/30 rounded-lg shadow-lg text-black">
                <div className="p-4 sm:p-6">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                    {event.title}
                  </h3>
                  <p className="mb-4 text-sm sm:text-base">
                    {event.description}
                  </p>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full max-w-full rounded-lg ml-0 sm:ml-4"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>




    </div>


  );
};

export default HomePage;
