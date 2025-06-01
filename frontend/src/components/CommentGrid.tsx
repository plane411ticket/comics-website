import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Comment, CommentFormProps, CommentItemProps} from '../types/user/User';
import { fetchComments, postComment } from '../actions/userAction';
import { useContentInfo } from '../hooks/useContentInfo';
// CommentForm component (giữ nguyên)
export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit = () => {},
  initialText = '',
  submitLabel = 'Post',
}) => {
  const [text, setText] = useState(initialText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-x-2">
      <textarea
        className="border p-2 w-full rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
        {submitLabel}
      </button>
    </form>
  );
};

// CommentItem component
export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  addReply,
  isNested = false, // Thay depth bằng isNested để xác định có thụt đầu dòng hay không
}) => {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className={`my-2 ${isNested ? 'ml-6' : ''}`}>
      <div className="flex items-center gap-2 mb-1">
        {comment.user.cover && (
          <img
            src={comment.user.cover}
            alt={`${comment.user.first_name}'s avatar`}
            className="w-6 h-6 rounded-full"
          />
        )}
        <Link to = {`/profiles/${comment.user.username}`} className="text-sm font-semibold">{comment.user.username}</Link>
        <span className="text-xs text-gray-500 ml-2">{new Date(comment.created_at).toLocaleString()}</span>
      </div>

      <div className="bg-gray-100 p-2 rounded">
        <p>{comment.content}</p>
        <button
          onClick={() => setIsReplying(!isReplying)}
          className="text-sm text-blue-500 mt-1"
        >
          Reply
        </button>
      </div>

      {isReplying && (
        <div className="mt-2">
          <CommentForm
            initialText=""
            onSubmit={(text) => {
              addReply(text, comment.id);
              setIsReplying(false);
            }}
            submitLabel="Reply"
          />
        </div>
      )}
    </div>
  );
};

export const CommentList: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { type, objectId } = useContentInfo();

  
  const fetchData = async () => {
    try {
      const fetchedComments = await fetchComments({ object_id: objectId, content_type: type });
      setComments(fetchedComments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addComment = async (content: string, parent: number | null = null) => {
    try {
      if (!objectId || !type) return;
      const info = await postComment(objectId, content, type, parent);
      // Tạo comment mới từ dữ liệu trả về
      const newComment: Comment = {
        id: info.id,
        parent,
        user: info.user,
        target_model: type,
        target_object_id: objectId,
        content,
        created_at: info.created_at || new Date(),
      };
      // Cập nhật trạng thái comments bằng cách thêm comment mới
      setComments((prev) => [newComment, ...prev]);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  // Hàm xây dựng cấu trúc cây comment
  const buildCommentTree = (comments: Comment[]): CommentTree[] => {
    const commentMap: { [key: number]: CommentTree } = {};
    const tree: CommentTree[] = [];

    // Khởi tạo map cho tất cả các comment
    comments.forEach((comment) => {
      commentMap[comment.id] = { ...comment, children: [] };
    });

    // Xây dựng cây
    comments.forEach((comment) => {
      if (comment.parent === null) {
        tree.push(commentMap[comment.id]); // Comment gốc (root)
      } else {
        // Comment con, thêm vào danh sách con của comment cha
        if (comment.parent && commentMap[comment.parent]) {
          commentMap[comment.parent].children.push(commentMap[comment.id]);
        }
      }
    });

    return tree;
  };

  // Giao diện cho CommentTree để thêm thuộc tính children
  interface CommentTree extends Comment {
    children: CommentTree[];
  }

  // Hàm render comment phẳng
  const renderComments = (commentTree: CommentTree[], isNested: boolean = false) => {
    return commentTree.map((comment) => (
      <div key={comment.id}>
        <CommentItem
          comment={comment}
          addReply={addComment}
          isNested={isNested}
        />
        {/* Render tất cả comment con (bao gồm cháu, chắt) như comment con trực tiếp */}
        {comment.children.length > 0 && (
          <div>{renderComments(comment.children, true)}</div>
        )}
      </div>
    ));
  };

  if (loading && !Array.isArray(comments)) return <p>Loading comments...</p>;

  // Xây dựng cây comment
  const commentTree = buildCommentTree(comments);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <CommentForm onSubmit={(text) => addComment(text)} />
      <div className="mt-4">{renderComments(commentTree)}</div>
    </div>
  );
};