const Leaderboard = () => {


    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#333" }}>Advanced Search.</h1>
            
        </div>
    );
};
export default Leaderboard;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface Post {
//   id: string;
//   title: string;
//   numLikes: number;
//   type: "novel" | "manga";
//   cover: string | null;
// }

// const Leaderboard: React.FC = () => {
//   const [topPosts, setTopPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get("/api/top-liked-posts")
//       .then(res => {
//         setTopPosts(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error fetching leaderboard:", err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <h1 className="text-3xl font-bold mb-6 text-center">🏆 Top 20 Truyện Được Yêu Thích Nhất</h1>
//       {loading ? (
//         <p className="text-center">Đang tải dữ liệu...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {topPosts.map((post, index) => (
//             <div key={post.id} className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
//               <div className="w-16 h-24 bg-gray-100 rounded overflow-hidden">
//                 {post.cover ? (
//                   <img src={post.cover} alt={post.title} className="object-cover w-full h-full" />
//                 ) : (
//                   <div className="text-gray-400 text-sm text-center">No image</div>
//                 )}
//               </div>
//               <div>
//                 <p className="text-lg font-semibold">{index + 1}. {post.title}</p>
//                 <p className="text-sm text-gray-600 capitalize">{post.type}</p>
//                 <p className="text-yellow-600 mt-1">❤️ {post.numLikes} lượt thích</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Leaderboard;
