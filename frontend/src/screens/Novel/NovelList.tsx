// src/pages/StoryDetailPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Novel} from '../../types/novel/novelDetails';
import {NovelChapter} from '../../types/novel/novelChapters';
import { Genre } from '../../types/genre/genreDetails';
import { fetchStoryDetails, fetchStoryChapters } from '../../actions/novelAction'; // Giả sử bạn đã định nghĩa các hàm này trong novelActions.js

const StoryDetailPage = () => {
  const { storyId } = useParams(); // từ URL /story/:storyId
  const [story, setStory] = useState<Novel | null>(null);
  const [chapters, setChapters] = useState<NovelChapter[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detail = await fetchStoryDetails(String(storyId));

        setStory(detail);
      } catch (error) {
        console.error("Lỗi khi load dữ liệu:", error);
      }
    };

    fetchData();
  }, [storyId]);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const chapterList = await fetchStoryChapters(String(storyId));
        setChapters(chapterList); // ✅ sửa lại chỗ này
      } catch (error) {
        console.error("Lỗi khi load chương:", error);
      }
    };
  
    fetchChapter();
  }, [storyId]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      {story ? (
        <>
          {/* Div 1: Ảnh + Thông tin */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            {/* Ảnh bìa bên trái */}
            <div style={{ minWidth: '250px' }}>
              <img
                src={story.cover_image}
                alt="Ảnh bìa"
                style={{
                  width: '180px',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
            </div>

            {/* Thông tin bên phải */}
            <div style={{ flex: 1 }}>
              <h1 style={{ marginBottom: '10px' }}>{story.title}</h1>
              <p><strong>Tác giả:</strong> {story.author}</p>
              <p><strong>Thể loại:</strong> {story.genres?.map((g) => g.name).join(', ')}</p>
              <p><strong>Trạng thái:</strong> {story.status}</p>
              <p><strong>Cập nhật:</strong> {story.updated_at}</p>
              <p><strong>Lượt views:</strong> {story.numViews}</p>
              <p><strong>Lượt favorites:</strong> {story.numFavorites}</p>
              <p><strong>Số lượng chương:</strong> {story.numChapters}</p>
            </div>
          </div>

          {/* Div 2: Description */}
          <div style={{ marginTop: '30px' }}>
            <h2><strong>Mô tả</strong></h2>
            <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>{story.description}</p>
          </div>

          {/* Danh sách chương */}
          <div style={{ marginTop: '30px' }}>
            <h2>Danh sách chương:</h2>
            <ul>
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <a href={`/story/${storyId}/chapter/${chapter.id}`}>{chapter.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Đang tải truyện...</p>
      )}
    </div>
  );
};


export default StoryDetailPage;
