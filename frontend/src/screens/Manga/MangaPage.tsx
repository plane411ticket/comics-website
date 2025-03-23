import { useState, useEffect } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// redux 
//import {store} from './store'
import { Provider } from "react-redux";


// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     {/* warp the app with the provider, now store is global state */}
//     <Provider store={store}> 
//     <RouterProvider router={router} />
//     </Provider>
//   </StrictMode>
// );


const slides = [
    "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/naruto.jpg",
    "https://images.fbox.fpt.vn/wordpress-blog/2023/10/phim-hoat-hinh-doraemon.jpg",
    "https://minhtuanmobile.com/uploads/blog/lich-chieu-shin-cau-be-but-chi-ban-movie-2024-240815120320.jpg",
    "https://genk.mediacdn.vn/2018/8/17/anh-1-15344831714111731747940.jpg",
    "https://kilala.vn/data/uploads/2023/141120231050-1699933810-kingom-vuot-moc-tram-trieu-ban.jpg",
    "https://static.lag.vn/upload/news/24/11/07/sword-art-online-pddb3chbaddm7bh3_QNFK.jpg?w=1200&h=800&crop=pad&scale=both&encoder=wic&subsampling=444"
];

const names = [
    "Naruto",
    "Doraemon",
    "Crayon Shin",
    "Dragon Ball",
    "Kingom",
    "Sword Art"
];

const description = [
    "Hành trình của Naruto Uzumaki, một cậu bé xa lánh nhưng luôn mơ ước trở thành Hokage để bảo vệ làng Lá.",
    "Mèo máy Doraemon từ tương lai giúp Nobita vượt qua những rắc rối bằng các bảo bối thần kỳ.",
    "Câu chuyện hài hước về cậu bé Shin-chan nghịch ngợm với những trò quậy phá bá đạo.",  
    "Hành trình của Goku từ nhỏ đến khi trở thành chiến binh mạnh nhất vũ trụ, bảo vệ Trái Đất khỏi kẻ xấu",
    "Câu chuyện về Tín, một cậu bé mồ côi, quyết tâm trở thành vị tướng vĩ đại trong thời kỳ Chiến Quốc Trung Hoa",
    "Một nhóm game thủ bị mắc kẹt trong thế giới thực tế ảo, nơi cái chết trong game đồng nghĩa với cái chết ngoài đời thực"
];

const mangaData = [
    {
      title: "The Namgung Clan’s Great Sage",
      chapter: "C.11",
      time: "14 phút trước",
      image: "https://mangadex.org/covers/d53f53b5-f97e-4121-b79e-60e07afe0d9b/f260c9ef-9a65-4573-9bd9-9765dd4003cc.jpg.512.jpg",
    },
    {
      title: "The Villain Wants to Live",
      chapter: "C.26",
      time: "9 ngày trước",
      image: "https://mangadex.org/covers/384308ae-cf17-490c-9a9e-8bb0db90c3e6/a4cb39ff-ce52-4a51-849e-ee3d0235ca26.jpg.512.jpg",
    },
    {
      title: "Falling in Love With My Ex-Fiance's Grandfather",
      chapter: "C.36",
      time: "14 giờ trước?",
      image: "https://uploads.namicomi.com/covers/73hLs8EN/2efdb6a0-1da7-467b-91bf-e9629b53a03c.jpg.512.jpg",
    },
    {
      title: "A Messy Fairy Tale",
      chapter: "C.13",
      time: "6 ngày trước",
      image: "https://uploads.namicomi.com/covers/jcUg9skF/03060399-3242-48bd-b549-48a0c7e7289f.jpg.512.jpg",
    },
    {
      title: "After School, We Wander in Space",
      chapter: "C.3",
      time: "6 ngày trước",
      image: "https://mangadex.org/covers/91a2e0c9-cd81-4bf7-b5f7-bb37434bf6b3/7a41b522-5383-422b-b6b4-fc2007f5c603.jpg.512.jpg",
    },
    {
        title: "The Return of the Corpse King",
        chapter: "C.2",
        time: "12 ngày trước",
        image: "https://mangadex.org/covers/d89cfcf7-dcb4-4af7-8c95-330c2c6167d0/aaa79460-a247-4d95-bbed-7f0883372fe2.png.512.jpg",
    },
    {
        title: "Kage no Jitsuryokusha ni Naritakute!",
        chapter: "C.71",
        time: "18 ngày trước",
        image: "https://mangadex.org/covers/77bee52c-d2d6-44ad-a33a-1734c1fe696a/3e07507b-3425-48ee-baf0-83603a098487.jpg.512.jpg",
      },
      {
        title: "Dragon Ball: Goku Shiden",
        chapter: "Oneshot",
        time: "Ngày hôm qua",
        image: "https://mangadex.org/covers/94b3b927-eacb-4264-87bd-0a4cf79bfef3/4a41d345-e33a-452b-b2e9-78659656f5ad.jpg.512.jpg",
      },
      {
        title: "Kuroko no Basket - Maison Ushi no Koku (Doujinshi)",
        chapter: "Oneshot",
        time: "2 ngày trước",
        image: "https://mangadex.org/covers/fb1ad36e-685e-4088-a8eb-bd5d76043cd0/f55900fe-33f6-4eb2-9d04-a6532f4ca909.png.512.jpg",
      },
      {
        title: "Eikoku Roman Giga: Forest Ivy",
        chapter: "C.0",
        time: "Chưa xác định",
        image: "https://mangadex.org/covers/2446b119-79d7-4b9d-921b-5cfb3580b6bd/834b5ee6-200f-4343-ab67-88c8797930e4.jpg.512.jpg",
      },
      {
        title: "Akuyaku Reijou Level 99: Watashi wa UraBoss desu ga Maou de wa Arimasen",
        chapter: "C.21",
        time: "4 tháng trước",
        image: "https://mangadex.org/covers/878634d2-ea39-4001-a4bf-31458020d16a/ab903f92-b3d9-4ce3-9332-d5cffa35cf67.jpg.512.jpg",
      },
      {
          title: "One Piece",
          chapter: "C.1142",
          time: "11 ngày trước",
          image: "https://mangadex.org/covers/a1c7c817-4e59-43b7-9365-09675a149a6f/249fa95b-2214-4ae3-a8f7-77338fe34542.png.512.jpg",
      },
  ];

  const newMangaData = [
    {
      title: "Spy x Family (FULL HD)",
      chapter: "C.113",
      time: "15 ngày trước",
      image: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/152/cover/processed-f7d09a1d2f13b6eb0677d9b811bf10df.jpg",
    },
    {
      title: "Cupid 13",
      chapter: "OneShot",
      time: "1 ngày trước",
      image: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/2877/cover/processed-e86000dd2e48db139cedaa3628456f7b.jpg",
    },
    {
      title: "Madame Petit",
      chapter: "C.45",
      time: "4 ngày trước?",
      image: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/2053/cover/processed-cd31eff57b150fb851e6420925b24833.jpg",
    },
    {
      title: "Fairy Tail: Nhiệm Vụ 100 năm",
      chapter: "C.63",
      time: "4 ngày trước",
      image: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/2841/cover/processed-c4175be221df21401a1b90c28d659df8.jpg",
    },
    {
      title: "Medalist",
      chapter: "C.14",
      time: "4 ngày trước",
      image: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/2295/cover/processed-12e251ca02907022d66def34edec94e2.jpg",
    },
    {
        title: "Dị giới thất cách",
        chapter: "C.29",
        time: "3 ngày trước",
        image: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/2436/cover/processed-38e9ad2cd1c25bb79cd111e9039c1ac1.jpg",
    },
    {
        title: "One-Punch Man",
        chapter: "C.244",
        time: "4 ngày trước",
        image: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1288/cover/processed-5921c6a53454ea2288cc076706b9d3e8.jpg",
      },
      {
        title: "Magic Kaito",
        chapter: "C.38",
        time: "20 ngày trước",
        image: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/2821/cover/processed-7ae4b006d0a5b4448c766e87f1c1d91d.jpg",
      },
      {
        title: "Cigarette and Cherry",
        chapter: "C.109",
        time: "4 ngày trước",
        image: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/379/cover/processed-2363e9db66c9002eb0ec61a0352357f4.jpg",
      },
      {
        title: "Radiation House",
        chapter: "C.113",
        time: "5 ngày trước",
        image: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/950/cover/processed-5f90d9c921bf3a110237a3edafb62b94.jpg",
      },
      {
        title: "Sakamoto Days (FULL HD)",
        chapter: "C.203",
        time: "11 ngày trước",
        image: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/106/cover/processed-75c4561a654bc5f172679365346a2cd0.jpg",
      },
      {
          title: "Diamond no Ace: Act II",
          chapter: "C.221",
          time: "14 ngày trước",
          image: "https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/2835/cover/processed-81c728e5a78773f28dea1a9c96184788.jpg",
      },
  ];




const MangaPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // Chuyển slide mỗi 3 giây

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="w-full max-w-screen-lg overflow-hidden relative flex justify-center mx-auto">
                {/* Wrapper chứa tất cả slides */}
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {slides.map((src, index) => (
                        <div 
                            key={index} 
                            className="relative min-w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] flex items-center justify-center rounded-2xl"
                        >
                            <img src={src} className="w-full h-full rounded-2xl" alt={`slide-${index}`} />
                        </div>
                    ))}
                </div>

                {/* Nút điều hướng */}
                <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                    onClick={() => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)}
                >
                    ❮
                </button>
                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                    onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
                >
                    ❯
                </button>
            </div>

            <div className="h-[50px]"></div>
            <div className="mx-auto justify-center w-full max-w-screen-lg">
                <h2 className="font-bold text-lg ">🌟 NỔI BẬT 🌟</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm">
                    {
                        mangaData.map((manga, index) => (
                            <div key={index} className="p-4 text-black">
                                <img src={manga.image} alt={manga.title} className="w-full object-cover" />
                                <div className="p-2">
                                    <h3 className="text-sm font-bold">{manga.title}</h3>
                                    <p className="text-xs text-gray-600">{manga.chapter}</p>
                                    <p className="text-xs text-gray-500">{manga.time}</p>
                                </div>
                            </div>
                        ))}
                </div>
                <a href="#" className="flex justify-end mt-2 mr-7">Xem tất cả</a>
                <div className="h-[20px]"></div>
            </div>
            <div className="mx-auto justify-center w-full max-w-screen-lg">
                <h2 className="font-bold text-lg ">🔥 MỚI CẬP NHẬT 🔥</h2>
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 text-sm">
                    {
                        newMangaData.map((manga, index) => (
                            <div key={index} className="p-4 text-black">
                                <img src={manga.image} alt={manga.title} className="w-full object-cover" />
                                <div className="p-2">
                                    <h3 className="text-sm font-bold">{manga.title}</h3>
                                    <p className="text-xs text-gray-600">{manga.chapter}</p>
                                    <p className="text-xs text-gray-500">{manga.time}</p>
                                </div>
                            </div>
                        ))}
                </div>
                <a href="#" className="flex justify-end mt-2 mr-7">Xem tất cả</a>
                <div className="h-[20px]"></div>
            </div>
            {/* <footer className="bg-black text-white text-center p-3" id="contact">
                <p>&copy; 2025 Music Event. All rights reserved.</p>
                <div>
                    <a className="text-white me-3">Chính sách bảo mật</a>
                    <a className="text-white me-3">Điều khoản dịch vụ</a>
                    <a className="text-white me-3">Liên hệ hỗ trợ</a>           
                </div>
            </footer> */}
        </div>
    );
};

export default MangaPage;
