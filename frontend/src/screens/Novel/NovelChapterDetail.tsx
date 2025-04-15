// src/pages/ChapterDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { NovelChapter } from '../../types/novel/novelChapters';
import { fetchChapterDetail, fetchStoryChapters } from '../../actions/novelAction';

const ChapterDetailPage = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<NovelChapter | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!chapterId) return;
        console.log("chapterId:", chapterId);
        // Gọi API lấy chi tiết chương
        const currentChapter = await fetchChapterDetail(chapterId);
  
        // Gọi API lấy danh sách chương của truyện đó
        const chapterList = await fetchStoryChapters(currentChapter.novel);
        console.log("chapterList trả về từ API:", chapterList);
        if (!chapterList || !Array.isArray(chapterList)) {
          console.error("chapterList không hợp lệ:", chapterList);
          return;
        }
        
  
        // currentChapter là chương hiện tại bạn đã lấy từ API
      const currentNumber = currentChapter.chapter_number;
      console.log("currentNumber:", currentNumber);
      // Tìm chương trước
      const previousChapters = chapterList.filter((c:NovelChapter) => c.chapter_number === currentNumber - 1);
      const previous = previousChapters.sort((a:NovelChapter, b:NovelChapter) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )[0]?._id || null;

      // Tìm chương sau
      const nextChapters = chapterList.filter((c:NovelChapter) => c.chapter_number === currentNumber + 1);
      const next = nextChapters.sort((a:NovelChapter, b:NovelChapter) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )[0]?._id || null;

  
        // Gộp dữ liệu lại để set vào state
        setChapter({
          ...currentChapter,
          previousChapterId: previous,
          nextChapterId: next,
        });
      } catch (err) {
        console.error("Lỗi khi tải nội dung chương:", err);
      }
    };
  
    fetchData();
  }, [chapterId]);

  const goToPrevious = () => {
    if (chapter?.previousChapterId) {
      navigate(`/novel/chapter/${chapter.previousChapterId}`);
    }
  };

  const goToNext = () => {
    if (chapter?.nextChapterId) {
      navigate(`/novel/chapter/${chapter.nextChapterId}`);
    }
  };

  if (!chapter) return <p>Đang tải chương...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-7xl sm:text-4xl font-bold text-center text-orange-600 mb-6">
        Chương {chapter.chapter_number}: {chapter.title}
      </h1>


      <div className="prose prose-2xl text-3xl lg:prose-3xl max-w-5xl mx-auto text-justify leading-relaxed whitespace-pre-wrap bg-amber-50 text-gray-900 p-10 sm:p-14 rounded-3xl shadow-xl">
        {chapter.content}
      </div>



      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
      <button
        onClick={goToPrevious}
        disabled={!chapter.previousChapterId}
        className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
          chapter.previousChapterId
            ? "bg-orange-500 text-white hover:bg-orange-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        ⬅ Chương trước
      </button>

        <Link to={`/novel/${chapter._id}`}>
        <button className="px-6 py-3 rounded-full font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200">
          📚 Quay lại chi tiết
        </button>
        </Link>

        <button
        onClick={goToNext}
        disabled={!chapter.nextChapterId}
        className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
          chapter.nextChapterId
            ? "bg-orange-500 text-white hover:bg-orange-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Chương sau ➡
      </button>
      </div>
    </div>
  );
};

export default ChapterDetailPage;
