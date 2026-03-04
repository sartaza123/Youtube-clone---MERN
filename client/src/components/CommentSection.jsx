import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function CommentSection({ videoId }) {
  const { authUser, userId } = useAuth();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${videoId}`);
      setComments(res.data || []);
    } catch {
      console.log("Error loading comments");
    }
  };

  useEffect(() => {
    if (videoId) fetchComments();
  }, [videoId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await API.post("/comments", {
        text: newComment,
        video: videoId,
      });

      setNewComment("");
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    if (!editText.trim()) return;

    try {
      await API.put(`/comments/${id}`, { text: editText });

      setEditingId(null);
      setEditText("");
      fetchComments();
    } catch {
      console.log("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/comments/${id}`);
      fetchComments();
    } catch {
      console.log("Delete failed");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-6">{comments.length} Comments</h2>

      {/* ADD COMMENT */}
      {authUser && (
        <div className="flex gap-4 mb-8">
          <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-semibold">
            {authUser.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border-b border-gray-300 outline-none py-2"
            />

            <div className="flex justify-end gap-4 mt-2">
              <button
                onClick={() => setNewComment("")}
                className="px-4 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-black text-white rounded-full text-sm"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {!authUser && <p className="text-sm text-gray-500">Login to comment</p>}

      {/* COMMENTS */}
      <div className="space-y-6">
        {comments.map((comment) => {
          const username = comment.user?.username || "User";
          const isOwner = comment.user?._id === userId;

          return (
            <div key={comment._id} className="flex gap-4">
              <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-semibold">
                {username.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <span className="font-semibold text-sm">{username}</span>

                {editingId === comment._id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full border-b outline-none py-1 mt-1"
                    />

                    <div className="flex gap-4 mt-2 text-sm">
                      <button onClick={() => setEditingId(null)}>Cancel</button>

                      <button
                        onClick={() => handleUpdate(comment._id)}
                        className="bg-black text-white px-4 py-1 rounded-full"
                      >
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm mt-1">{comment.text}</p>
                )}

                {isOwner && editingId !== comment._id && (
                  <div className="flex gap-4 mt-2 text-xs text-gray-600">
                    <button
                      onClick={() => {
                        setEditingId(comment._id);
                        setEditText(comment.text);
                      }}
                    >
                      Edit
                    </button>

                    <button onClick={() => handleDelete(comment._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CommentSection;
