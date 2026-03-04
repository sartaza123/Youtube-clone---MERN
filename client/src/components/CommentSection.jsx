import { useEffect, useState } from "react";
import api from "../services/api";

function CommentSection({ videoId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  /* ================= FETCH COMMENTS ================= */
  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${videoId}`);
      setComments(res.data);
    } catch (error) {
      console.log("Error loading comments");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  /* ================= ADD COMMENT ================= */
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await api.post("/comments", {
        text: newComment,
        videoId: videoId,
      });

      setNewComment("");
      fetchComments();
    } catch (error) {
      console.log("Login required");
    }
  };

  /* ================= UPDATE COMMENT ================= */
  const handleUpdate = async (id) => {
    try {
      await api.put(`/comments/${id}`, {
        text: editText,
      });

      setEditingId(null);
      fetchComments();
    } catch (error) {
      console.log("Update failed");
    }
  };

  /* ================= DELETE COMMENT ================= */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/comments/${id}`);
      fetchComments();
    } catch (error) {
      console.log("Delete failed");
    }
  };

  return (
    <div className="mt-8">
      {/* Comment Count */}
      <h2 className="text-lg font-semibold mb-6">{comments.length} Comments</h2>

      {/* Add Comment */}
      {currentUser && (
        <div className="flex gap-4 mb-8">
          <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-semibold">
            {currentUser.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
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

      {/* Comment List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-4">
            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-semibold">
              {comment.user.username.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">{comment.user.username}</span>
              </div>

              {editingId === comment._id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full border-b border-gray-300 outline-none py-1 mt-1"
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

              {/* Edit/Delete Only for Owner */}
              {currentUser && comment.user.username === currentUser && (
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
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
