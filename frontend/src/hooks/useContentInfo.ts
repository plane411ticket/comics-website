import { useLocation, useParams } from "react-router-dom";

export const useContentInfo = () => {
  const location = useLocation();
  const { postId, chapterId } = useParams();

  const pathSegments = location.pathname.split("/").filter(Boolean); // lọc bỏ chuỗi rỗng

  let type = "";
  let objectId = postId || chapterId || "";

  if (pathSegments.includes("chapter")) {
    // Nếu có chapter trong path
    const parentType = pathSegments[0]; // ví dụ: 'novel' hoặc 'manga'
    type = `${parentType}chapter`; // ví dụ: 'novel_chapter'
  } else {
    type = pathSegments[0]; // ví dụ: 'novel' hoặc 'manga'
  }

  return { type, objectId };
};
