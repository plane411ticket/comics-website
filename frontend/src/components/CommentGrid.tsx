import React from 'react'
import { useState } from "react";
import { Comment, CommentFormProps, CommentItemProps, CommentListProps } from "../types/user/User";
import { fetchComments, postComment } from '../actions/userAction';
import { useEffect } from 'react';
export const CommentForm: React.FC<CommentFormProps> = ({
    onSubmit = () => {},
    initialText = "",
    submitLabel = "Post",
}) => {
  const [text, setText] = useState(initialText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
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

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  addReply,
  depth = 0,
}) => {
  const [isReplying, setIsReplying] = useState(false);

   return (
    <div className={`my-2 ${depth === 1 ? "ml-6" : ""}`}>
      <div className="flex items-center gap-2 mb-1">
        {comment.user.cover && (
          <img
            src={comment.user.cover}
            alt={`${comment.user.first_name}'s avatar`}
            className="w-6 h-6 rounded-full"
          />
        )}
        <span className="text-sm font-semibold">{comment.user.first_name}</span>
        <span className="text-xs text-gray-500 ml-2">{new Date(comment.created_at).toLocaleString()}</span>
      </div>

      <div className="bg-gray-100 p-2 rounded">
        <p>{comment.content}</p>
        {depth === 0 && (
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="text-sm text-blue-500 mt-1"
          >
            Reply
          </button>
        )}
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

export const CommentList: React.FC<CommentListProps> = ({type, post_id }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const fetchedComments = await fetchComments({object_id: post_id, content_type:type});
        setComments(fetchedComments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  
  }, []);
  const addComment = async (content: string, parent: number | null = null) => {
    const info = await postComment(
        post_id,
        content,
        type,
        parent
      );
    console.log("Comment info:", info);
    const newComment: Comment = {
      id: info.id,
      parent,
      user: info.user,
      target_model: type,
      target_object_id: post_id,
      content,
      created_at: info.created_at || new Date(),
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const calculateDepth = (comment: Comment, comments: Comment[]): number => {
  let depth = 0;
  let current = comment;
  while (current.parent !== null) {
    const parentComment = comments.find((c) => c.id === current.parent);
    if (!parentComment) break;
    current = parentComment;
    depth += 1;
  }
  return depth;
};
  if (loading && !Array.isArray(comments)) return <p>Loading comments...</p>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <CommentForm onSubmit={(text) => addComment(text)} />
      <div className="mt-4">
        {comments.map((comment) => {
          const depth = calculateDepth(comment, comments);
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              depth={depth > 1 ? 1 : depth} // depth 2+ gán bằng 1 (chỉ 2 cấp)
              addReply={addComment}
            />
          );
        })}
    </div>

    </div>
  );
};