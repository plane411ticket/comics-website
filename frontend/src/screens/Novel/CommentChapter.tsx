import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // 
import { selectUser } from "../../types/user/userSlice";


type Comment = {
  id: number;
  username: string;
  avatar: string;
  level: number;
  content: string;
  time: string;
  likes: number;
  replies: Comment[];
};

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [visibleComments, setVisibleComments] = useState(5); 

  const navigate = useNavigate();
  const user = useSelector(selectUser);


  // Load comments từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("comments");
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, []);

  // Cập nhật localStorage mỗi khi comments thay đổi
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handlePostComment = () => {
    if (!user) {
      navigate("/auth/login/");
      return;
    }

    if (newComment.trim() === "") return;

    const comment: Comment = {
      id: Date.now(),
      username: user.name,
      avatar: user.avatar,
      level: user.level || 1,
      content: newComment.trim(),
      time: "Vừa xong",
      likes: 0,
      replies: [],
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handlePostReply = (parentId: number) => {
    if (!user) {
        navigate("/auth/login/");
      return;
    }

    const replyText = replyContent[parentId];
    if (!replyText || replyText.trim() === "") return;

    const reply: Comment = {
      id: Date.now(),
      username: user.name,
      avatar: user.avatar,
      level: user.level || 1,
      content: replyText.trim(),
      time: "Vừa xong",
      likes: 0,
      replies: [],
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    );
    setReplyingTo(null);
    setReplyContent((prev) => ({ ...prev, [parentId]: "" }));
  };

  const handleLike = (id: number, parentId?: number) => {
    if (parentId) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === parentId
            ? {
                ...c,
                replies: c.replies.map((r) =>
                  r.id === id ? { ...r, likes: r.likes + 1 } : r
                ),
              }
            : c
        )
      );
    } else {
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Bình luận</h2>

      {/* New Comment */}
      <div className="flex flex-col mb-6">
        <textarea
          className="w-full p-4 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Mời bạn để lại bình luận..."
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handlePostComment}
          className="self-end mt-3 bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition"
        >
          Gửi bình luận
        </button>
      </div>

      {/* Comment List */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col sm:flex-row gap-4">
            <img
              src={comment.avatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-blue-700">{comment.username}</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                  Cấp {comment.level}
                </span>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-800">{comment.content}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                <button
                  onClick={() => setReplyingTo(comment.id)}
                  className="hover:underline"
                >
                  💬 Trả lời
                </button>
                <button
                  onClick={() => handleLike(comment.id)}
                  className="hover:underline"
                >
                  👍 {comment.likes}
                </button>
                <span>• {comment.time}</span>
              </div>

              {/* Reply Section */}
              {replyingTo === comment.id && (
                <div className="mt-4 pl-8">
                  <textarea
                    className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Nhập phản hồi..."
                    rows={2}
                    value={replyContent[comment.id] || ""}
                    onChange={(e) =>
                      setReplyContent((prev) => ({
                        ...prev,
                        [comment.id]: e.target.value,
                      }))
                    }
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handlePostReply(comment.id)}
                      className="bg-orange-500 text-white py-1 px-4 rounded-lg hover:bg-orange-600 transition"
                    >
                      Gửi phản hồi
                    </button>
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="text-red-500 py-1 px-4 hover:underline"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}

              {/* Show replies */}
              {comment.replies.length > 0 && (
                <div className="mt-6 space-y-4 pl-8 border-l-2 border-gray-200">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex flex-col sm:flex-row gap-3">
                      <img
                        src={reply.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-blue-700">{reply.username}</span>
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                            Cấp {reply.level}
                          </span>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <p className="text-gray-700 text-sm">{reply.content}</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <button
                            onClick={() => setReplyingTo(comment.id)}
                            className="hover:underline"
                          >
                            💬 Trả lời
                          </button>
                          <button
                            onClick={() => handleLike(reply.id, comment.id)}
                            className="hover:underline"
                          >
                            👍 {reply.likes}
                          </button>
                          <span>• {reply.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

      {/* Nút Xem thêm */}
    {comments.length > visibleComments && !showMore && (
        <button
          onClick={handleLoadMore}
          className="w-full bg-gray-200 text-gray-700 py-2 mt-6 rounded-lg hover:bg-gray-300 transition"
        >
          Xem thêm bình luận ({comments.length - visibleComments} bình luận)
        </button>
     )}
    </div>
  );
}































// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// type Comment = {
//   id: number;
//   username: string;
//   avatar: string;
//   level: number;
//   content: string;
//   time: string;
//   likes: number;
//   replies: Comment[];
// };

// const generateFakeComments = (startId: number, count: number): Comment[] => {
//   return Array.from({ length: count }, (_, i) => ({
//     id: startId + i,
//     username: `User${startId + i}`,
//     avatar: `https://i.pravatar.cc/150?img=${(startId + i) % 70}`,
//     level: Math.floor(Math.random() * 5) + 1,
//     content: "Đây là bình luận mẫu. Nội dung bình luận rất hay!",
//     time: `${Math.floor(Math.random() * 59) + 1} phút trước`,
//     likes: Math.floor(Math.random() * 100),
//     replies: [],
//   }));
// };

// export default function CommentSection() {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
//   const [newComment, setNewComment] = useState("");
//   const [replyingTo, setReplyingTo] = useState<number | null>(null);
//   const [showMore, setShowMore] = useState(false);
//   const [visibleComments, setVisibleComments] = useState(5); 
//   const navigate = useNavigate();

//    // Load comments từ localStorage
//    useEffect(() => {
//     const saved = localStorage.getItem("comments");
//     if (saved) {
//       setComments(JSON.parse(saved));
//     }
//   }, []);
//   // Khởi tạo bình luận đầu tiên
//   useEffect(() => {
//     const initialComments = generateFakeComments(1, 1); // Chỉ lấy 1 bình luận ban đầu
//     setComments(initialComments);
//   }, []);

    

    

//   // Xử lý gửi bình luận mới
//   const handlePostComment = () => {
//     if (newComment.trim() === "") return;

//     const comment: Comment = {
//       id: comments.length + 1000,
//       username: "Bạn",
//       avatar: "https://i.pravatar.cc/150?img=1",
//       level: 1,
//       content: newComment.trim(),
//       time: "Vừa xong",
//       likes: 0,
//       replies: [],
//     };

//     setComments((prev) => [comment, ...prev]);
//     setNewComment("");
//     setReplyingTo(null);
//   };

//   // Xử lý thích bình luận
//   const handleLike = (id: number, parentId?: number) => {
//     if (parentId) {
//       setComments((prev) =>
//         prev.map((c) =>
//           c.id === parentId
//             ? {
//                 ...c,
//                 replies: c.replies.map((r) =>
//                   r.id === id ? { ...r, likes: r.likes + 1 } : r
//                 ),
//               }
//             : c
//         )
//       );
//     } else {
//       setComments((prev) =>
//         prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
//       );
//     }
//   };

//   // Xử lý load thêm bình luận
//   const handleLoadMore = () => {
//     // const newComments = generateFakeComments(comments.length + 1, 5);
//     // setComments((prev) => [...prev, ...newComments]);
//     // setShowMore(false); // Ẩn nút "Xem thêm" sau khi tải thêm
//     setVisibleComments(comments.length); 
//   };

//   return (
//     <div className="mt-16 max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
//       {/* Ghi chú */}
//       <p className="text-red-500 text-sm mb-4">
//         Bình luận không được tính để tăng cấp độ. Tài khoản không bình luận được là do: avatar nhạy cảm, spam link hoặc chưa đủ cấp độ.
//       </p>

//       {/* Ô nhập bình luận */}
//       <div className="flex flex-col mb-6">
//         {replyingTo && (
//           <div className="text-sm text-blue-600 mb-2">
//             Đang trả lời bình luận #{replyingTo}{" "}
//             <button
//               className="text-red-500 ml-2"
//               onClick={() => setReplyingTo(null)}
//             >
//               Hủy
//             </button>
//           </div>
//         )}
//         <textarea
//           className="w-full border border-gray-300 rounded-xl p-4 mb-2 text-gray-800 focus:outline-none focus:border-orange-500 resize-none"
//           rows={4}
//           placeholder="Mời bạn thảo luận, vui lòng không spam, share link kiếm tiền, thiếu lành mạnh,... để tránh bị khóa tài khoản"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <button
//           onClick={handlePostComment}
//           className="self-end bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
//         >
//           Gửi
//         </button>
//       </div>

//       {/* Danh sách bình luận */}
//       {comments.slice(0, visibleComments).map((comment) => (
//         <div key={comment.id} className="flex items-start gap-4 mb-6">
//           <img
//             src={comment.avatar}
//             alt="Avatar"
//             className="w-12 h-12 rounded-full object-cover"
//           />
//           <div className="flex-1">
//             <div className="flex items-center gap-2 mb-1">
//               <span className="font-semibold text-blue-700">{comment.username}</span>
//               <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
//                 Cấp {comment.level}
//               </span>
//             </div>
//             <div className="bg-gray-100 rounded-lg p-4">
//               <p className="text-gray-800 text-base">{comment.content}</p>
//             </div>
//             <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
//               <button
//                 className="flex items-center gap-1 hover:underline"
//                 onClick={() => setReplyingTo(comment.id)}
//               >
//                 💬 Trả lời
//               </button>
//               <button
//                 className="flex items-center gap-1 hover:underline"
//                 onClick={() => handleLike(comment.id)}
//               >
//                 👍 {comment.likes}
//               </button>
//               <span>• {comment.time}</span>
//             </div>

//             {/* Reply */}
//             {comment.replies.length > 0 && (
//               <div className="pl-8 mt-4 border-l-2 border-gray-200">
//                 <button
//                   onClick={() => setExpanded((prev) => ({ ...prev, [comment.id]: !prev[comment.id] }))}
//                   className="text-blue-500 text-sm mb-2 hover:underline"
//                 >
//                   {expanded[comment.id] ? "Ẩn trả lời" : `Xem ${comment.replies.length} trả lời`}
//                 </button>

//                 {expanded[comment.id] && comment.replies.map((reply) => (
//                   <div key={reply.id} className="flex items-start gap-4 mb-4">
//                     <img
//                       src={reply.avatar}
//                       alt="Avatar"
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <span className="font-semibold text-blue-700">{reply.username}</span>
//                         <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
//                           Cấp {reply.level}
//                         </span>
//                       </div>
//                       <div className="bg-gray-100 rounded-lg p-3">
//                         <p className="text-gray-800 text-sm">{reply.content}</p>
//                       </div>
//                       <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
//                         <button
//                           className="flex items-center gap-1 hover:underline"
//                           onClick={() => setReplyingTo(comment.id)}
//                         >
//                           💬 Trả lời
//                         </button>
//                         <button
//                           className="flex items-center gap-1 hover:underline"
//                           onClick={() => handleLike(reply.id, comment.id)}
//                         >
//                           👍 {reply.likes}
//                         </button>
//                         <span>• {reply.time}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       ))}

//       {/* Nút Xem thêm */}
//       {comments.length > visibleComments && !showMore && (
//         <button
//           onClick={handleLoadMore}
//           className="w-full bg-gray-200 text-gray-700 py-2 mt-6 rounded-lg hover:bg-gray-300 transition"
//         >
//           Xem thêm bình luận ({comments.length - visibleComments} bình luận)
//         </button>
//       )}

//       {/* Tải thêm bình luận */}
//       {/* {showMore && (
//         <div className="text-center py-8">
//           <button
//             onClick={handleLoadMore}
//             className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
//           >
//             Tải thêm bình luận
//           </button>
//         </div>
//       )} */}



//     </div>
//   );
// }






// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // dùng nếu bạn dùng React Router
// import { Link } from "react-router-dom";

// type Comment = {
//   id: number;
//   username: string;
//   avatar: string;
//   level: number;
//   content: string;
//   time: string;
//   likes: number;
//   replies: Comment[];
// };

// export default function CommentSection() {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState("");
//   const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});
//   const [replyingTo, setReplyingTo] = useState<number | null>(null);
//   const navigate = useNavigate();

//   // Load comments từ localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("comments");
//     if (saved) {
//       setComments(JSON.parse(saved));
//     }
//   }, []);

//   // Cập nhật localStorage mỗi khi comments thay đổi
//   useEffect(() => {
//     localStorage.setItem("comments", JSON.stringify(comments));
//   }, [comments]);

//   const getCurrentUser = () => {
//     const user = localStorage.getItem("user");
//     return user ? JSON.parse(user) : null;
//   };

//   const handlePostComment = () => {
//     const user = getCurrentUser();
//     if (!user) {
//         navigate("/auth/login/");
//       return;
//     }

//     if (newComment.trim() === "") return;

//     const comment: Comment = {
//       id: Date.now(),
//       username: user.username,
//       avatar: user.avatar,
//       level: user.level || 1,
//       content: newComment.trim(),
//       time: "Vừa xong",
//       likes: 0,
//       replies: [],
//     };

//     setComments([comment, ...comments]);
//     setNewComment("");
//   };

//   const handlePostReply = (parentId: number) => {
//     const user = getCurrentUser();
//     if (!user) {
//         navigate("/auth/login/");
//       return;
//     }

//     const replyText = replyContent[parentId];
//     if (!replyText || replyText.trim() === "") return;

//     const reply: Comment = {
//       id: Date.now(),
//       username: user.username,
//       avatar: user.avatar,
//       level: user.level || 1,
//       content: replyText.trim(),
//       time: "Vừa xong",
//       likes: 0,
//       replies: [],
//     };

//     setComments((prev) =>
//       prev.map((comment) =>
//         comment.id === parentId
//           ? { ...comment, replies: [...comment.replies, reply] }
//           : comment
//       )
//     );
//     setReplyingTo(null);
//     setReplyContent((prev) => ({ ...prev, [parentId]: "" }));
//   };

//   const handleLike = (id: number, parentId?: number) => {
//     if (parentId) {
//       setComments((prev) =>
//         prev.map((c) =>
//           c.id === parentId
//             ? {
//                 ...c,
//                 replies: c.replies.map((r) =>
//                   r.id === id ? { ...r, likes: r.likes + 1 } : r
//                 ),
//               }
//             : c
//         )
//       );
//     } else {
//       setComments((prev) =>
//         prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
//       );
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
//       {/* Header */}
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Bình luận</h2>

//       {/* New Comment */}
//       <div className="flex flex-col mb-6">
//         <textarea
//           className="w-full p-4 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
//           placeholder="Mời bạn để lại bình luận..."
//           rows={3}
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <button
//           onClick={handlePostComment}
//           className="self-end mt-3 bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition"
//         >
//           Gửi bình luận
//         </button>
//       </div>

//       {/* Comment List */}
//       <div className="space-y-8">
//         {comments.map((comment) => (
//           <div key={comment.id} className="flex gap-4">
//             <img
//               src={comment.avatar}
//               alt="Avatar"
//               className="w-12 h-12 rounded-full object-cover"
//             />
//             <div className="flex-1">
//               <div className="flex items-center gap-2 mb-1">
//                 <span className="font-semibold text-blue-700">{comment.username}</span>
//                 <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
//                   Cấp {comment.level}
//                 </span>
//               </div>
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <p className="text-gray-800">{comment.content}</p>
//               </div>
//               <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
//                 <button
//                   onClick={() => setReplyingTo(comment.id)}
//                   className="hover:underline"
//                 >
//                   💬 Trả lời
//                 </button>
//                 <button
//                   onClick={() => handleLike(comment.id)}
//                   className="hover:underline"
//                 >
//                   👍 {comment.likes}
//                 </button>
//                 <span>• {comment.time}</span>
//               </div>

//               {/* Reply Section */}
//               {replyingTo === comment.id && (
//                 <div className="mt-4 pl-8">
//                   <textarea
//                     className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
//                     placeholder="Nhập phản hồi..."
//                     rows={2}
//                     value={replyContent[comment.id] || ""}
//                     onChange={(e) =>
//                       setReplyContent((prev) => ({
//                         ...prev,
//                         [comment.id]: e.target.value,
//                       }))
//                     }
//                   />
//                   <div className="flex gap-2 mt-2">
//                     <button
//                       onClick={() => handlePostReply(comment.id)}
//                       className="bg-orange-500 text-white py-1 px-4 rounded-lg hover:bg-orange-600 transition"
//                     >
//                       Gửi phản hồi
//                     </button>
//                     <button
//                       onClick={() => setReplyingTo(null)}
//                       className="text-red-500 py-1 px-4 hover:underline"
//                     >
//                       Hủy
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Show replies */}
//               {comment.replies.length > 0 && (
//                 <div className="mt-6 space-y-4 pl-8 border-l-2 border-gray-200">
//                   {comment.replies.map((reply) => (
//                     <div key={reply.id} className="flex gap-3">
//                       <img
//                         src={reply.avatar}
//                         alt="Avatar"
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-1">
//                           <span className="font-semibold text-blue-700">{reply.username}</span>
//                           <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
//                             Cấp {reply.level}
//                           </span>
//                         </div>
//                         <div className="bg-gray-100 p-3 rounded-lg">
//                           <p className="text-gray-700 text-sm">{reply.content}</p>
//                         </div>
//                         <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
//                           <button
//                             onClick={() => setReplyingTo(comment.id)}
//                             className="hover:underline"
//                           >
//                             💬 Trả lời
//                           </button>
//                           <button
//                             onClick={() => handleLike(reply.id, comment.id)}
//                             className="hover:underline"
//                           >
//                             👍 {reply.likes}
//                           </button>
//                           <span>• {reply.time}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }










































































































































































































































