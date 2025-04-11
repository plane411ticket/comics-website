import { useEffect, useState } from "react";
import {Novel} from "../../types/manga/mangaDetail";  // Import API function
import {fetchNovel} from "../../actions/novelActions"; // Import API function
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCommentDots, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const NovelList = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadNovels = async () => {
      setIsLoading(true);
      const data = await fetchNovel(page);
      setNovels(data);
      setIsLoading(false);
    };
    loadNovels();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if(novels.length!==0)setPage(page + 1);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">📚 Danh sách truyện ({novels.length})</h2>

      {isLoading ? (
        <p>Đang tải...</p>
      ) : novels.length === 0 ? (
        <p className="text-gray-500">Không có truyện nào để hiển thị.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
  {novels.map((novel) => (
    <div
    key={novel._id}
    className="bg-white shadow-md p-3 rounded-lg flex flex-col justify-between min-h-[360px]"
  >
    <Link to={`/novel/${novel._id}`} className="flex flex-col h-full">
      {/* Ảnh bìa */}
      <div className="w-full aspect-[5/7] overflow-hidden rounded">
        <img
          src={novel.cover_image}
          alt={novel.title}
          className="w-full h-full object-cover rounded"
        />
      </div>
  
      {/* Nội dung */}
      <div className="flex-1 flex flex-col justify-between mt-2">
        <div>
          <h3
            className="font-bold text-base text-gray-900 line-clamp-2 text-center hover:whitespace-normal hover:line-clamp-none"
            title={novel.title}
          >
            {novel.title}
          </h3>
  
          <p className="text-sm text-gray-700 text-center font-semibold">
            {novel.author}
          </p>
  
          <p className="text-sm text-gray-600 italic text-center">
            {novel.genres[0]?.name || "Đang cập nhật"}
          </p>
  
          <p className="text-sm text-gray-600 text-center">{novel.status}</p>
        </div>
  
        {/* Stats */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 mt-3">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faEye} className="w-3.5 h-3.5" />
            {novel.numViews || 0}
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCommentDots} className="w-3.5 h-3.5" />
            {novel.numComments || 0}
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faHeart} className="w-3.5 h-3.5 text-red-400" />
            {novel.numLikes || 0}
          </span>
        </div>
      </div>
    </Link>
  </div>
  
  ))}
</div>

      )}

      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <span>←</span> Trang trước
        </button>

        <span className="text-base font-semibold text-gray-700">
          <span className="text-blue-600">Trang {page}</span>
        </span>

        <button
          onClick={handleNextPage}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm text-gray-700 hover:bg-gray-100 transition"
        >
          Trang sau <span>→</span>
        </button>
      </div>

    </div>
  );
};

export default NovelList;

