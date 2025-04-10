// src/pages/StoryDetailPage.tsx

import { useEffect, useState } from 'react';
import {Link, useParams } from 'react-router-dom';
import {Novel} from '../../types/novel/novelDetails';
import {NovelChapter} from '../../types/novel/novelChapters';
import { fetchStoryDetails, fetchStoryChapters, updateNumberFavorite} from '../../actions/novelAction'; 

const StoryDetailPage = () => {
  const { storyId } = useParams(); // từ URL /story/:storyId
  const [story, setStory] = useState<Novel | null>(null);
  const [chapters, setChapters] = useState<NovelChapter[]>([]);
  const [numFavorites, setNumFavorites] = useState(null);
  const firstChapter = chapters[0];
  const lastChapter = chapters[chapters.length - 1];

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
        setChapters(chapterList);
      } catch (error) {
        console.error("Lỗi khi load chương:", error);
      }
    };
  
    fetchChapter();
  }, [storyId]);

  const handleFavoriteClick = async () => {
    try {
      const updated = await updateNumberFavorite(String(storyId));
      if (story) {
        setStory({ ...story, numFavorites: updated.numFavorites });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượt thích:", error);
    }
  };

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
              <p>👀   {story.numViews} ❤️   {story.numFavorites} 💬   {story.numComments}</p>
              <p><span className = "Emphasize font-bold">Tác giả: </span> {story.author}</p>

              <p>
                <span className="Emphasize font-bold">Thể loại: </span>
                {Array.isArray(story.genres) &&
                story.genres.map((genre, index) => (
                  <span key={genre._id}>
                    {genre.name}
                    {index < story.genres.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <p><span className = "Emphasize font-bold">Trạng thái:  </span> {story.status}</p>
              <p>
                <span className="Emphasize font-bold">Cập nhật: </span> 
                {new Date(story.updated_at).toLocaleDateString('vi-VN')}
              </p>
              
              <p><span className = "Emphasize font-bold"> Lượt favorites:  </span> {story.numFavorites}</p>
              <div className="justify-between mt-2">
                {firstChapter && (
                  <Link
                    to={`/novel/chapter/${firstChapter._id}`}
                  >
                    <button className="text-white bg-orange-500 hover:bg-yellow-400 px-2 mr-2 py-2 rounded">Đọc từ đầu</button>
                  </Link>
                )}
                {lastChapter && (
                  <Link
                    to={`/novel/chapter/${lastChapter._id}`}
                  >
                    <button className="text-white bg-orange-500 hover:bg-yellow-400 ml-2 px-2 py-2 rounded">Đọc mới nhất</button>
                  </Link>
                )}

                <button
                  className="text-white bg-orange-500 hover:bg-yellow-400 ml-2 px-2 py-2 rounded"
                  onClick={handleFavoriteClick}
                >
                  Thích ({story.numFavorites})
                </button>
              </div>
              
            </div>
          </div>

          {/* Div 2: Description */}
          <div className="flex flex-col" style={{ marginTop: '30px' }}>
            <div className="flex-1">
              <h2><span className = "Emphasize font-bold">Mô tả</span></h2>
              <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
                {story.description.split('\n').map((line, index) => (
                  <span key={index}>{line}<br /></span>
                ))}
              </p>
            </div>

            {/* Danh sách chương */}
            <div style={{ marginTop: '10px' }} className="flex-1">
              <h2><span className = "Emphasize font-bold">Danh sách chương:</span></h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 mt-2">
                {chapters.map((chapter) => (
                  <div className="col-span-1" key={chapter._id}>
                    <div className="p-1">
                      <p>
                        <Link to={`/novel/chapter/${chapter._id}`} className="text-neutral-700 hover:text-orange-500 dark:text-white">
                          Chương {chapter.chapter_number}
                        </Link>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Đang tải truyện...</p>
      )}
    </div>
  );
};


export default StoryDetailPage;
