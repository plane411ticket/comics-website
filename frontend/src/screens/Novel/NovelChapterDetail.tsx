// src/pages/ChapterDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NovelChapter } from '../../types/novel/novelChapters';
import { fetchChapterDetail } from '../../actions/novelAction'; // Hàm API lấy nội dung chương

const ChapterDetailPage = () => {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState<NovelChapter | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChapterDetail(String(chapterId));
        setChapter(data);
      } catch (err) {
        console.error("Lỗi khi tải nội dung chương:", err);
      }
    };

    fetchData();
  }, [chapterId]);

  if (!chapter) return <p>Đang tải chương...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Chương {chapter.chapter_number}: {chapter.title}</h1>
      <div style={{ marginTop: '20px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
        {chapter.content}
      </div>
    </div>
  );
};

export default ChapterDetailPage;
