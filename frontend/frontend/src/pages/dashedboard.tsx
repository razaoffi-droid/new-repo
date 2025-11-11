// 

// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosclient";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

interface Comment {
  userEmail: string;
  text: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  likesCount: number;
  comments: Comment[];
  likedByUser?: boolean;
}

interface User {
  id: number;
  email: string;
  followersCount: number;
  followingCount: number;
  posts: Post[];
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});

  const fetchUserData = async () => {
    try {
      const res = await axiosClient.get("/users/me");
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLike = async (postId: number) => {
    try {
      await axiosClient.post(`/posts/${postId}/like`);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              posts: prev.posts.map((p) =>
                p.id === postId
                  ? {
                      ...p,
                      likedByUser: !p.likedByUser,
                      likesCount: p.likedByUser ? p.likesCount - 1 : p.likesCount + 1,
                    }
                  : p
              ),
            }
          : null
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId: number) => {
    const text = commentText[postId]?.trim();
    if (!text) return;
    try {
      await axiosClient.post(`/posts/${postId}/comments`, { text });
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      fetchUserData(); // refresh posts with comments
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-600">Loading dashboard...</div>;
  if (!user) return <div className="text-center mt-20 text-red-500">User data not found.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl border border-gray-200">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.email}</h2>
        <div className="flex justify-center gap-6 mt-3 text-gray-600">
          <span>Followers: <strong>{user.followersCount}</strong></span>
          <span>Following: <strong>{user.followingCount}</strong></span>
          <span>Posts: <strong>{user.posts.length}</strong></span>
        </div>
      </div>

      {/* Posts */}
      {user.posts.length === 0 ? (
        <p className="text-gray-500 text-center">You haven’t posted anything yet.</p>
      ) : (
        <div className="space-y-6">
          {user.posts.map((post) => (
            <div
              key={post.id}
              className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-700 mt-2 mb-3">{post.content}</p>

              {/* Like & Comment Buttons */}
              <div className="flex items-center space-x-4 mb-3">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center text-gray-600 hover:text-red-500 transition"
                >
                  {post.likedByUser ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                  <span className="ml-1 text-sm">{post.likesCount}</span>
                </button>

                <div className="flex items-center text-gray-600">
                  <FaComment />
                  <span className="ml-1 text-sm">{post.comments.length}</span>
                </div>
              </div>

              {/* Comments */}
              <div className="mt-3 space-y-2">
                {post.comments.length > 0 ? (
                  post.comments.map((c, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-100 p-2 rounded-xl text-sm text-gray-700"
                    >
                      <strong>{c.userEmail}</strong>: {c.text}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No comments yet.</p>
                )}
              </div>

              {/* Add Comment */}
              <div className="mt-3 flex items-center">
                <input
                  type="text"
                  value={commentText[post.id] || ""}
                  onChange={(e) =>
                    setCommentText((prev) => ({ ...prev, [post.id]: e.target.value }))
                  }
                  placeholder="Write a comment..."
                  className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <button
                  onClick={() => handleComment(post.id)}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-sm"
                >
                  Post
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
