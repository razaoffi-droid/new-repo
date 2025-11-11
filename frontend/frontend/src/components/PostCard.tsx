// import React, { useState } from "react";
// import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

// interface PostCardProps {
//   id: number;
//   userEmail: string;
//   content: string;
//   imageUrl?: string;
//   likesCount?: number;
//   comments?: { userEmail: string; text: string }[];
//   onLike?: (postId: number) => void;
//   onComment?: (postId: number, text: string) => void;
// }

// const PostCard: React.FC<PostCardProps> = ({
//   id,
//   userEmail,
//   content,
//   imageUrl,
//   likesCount = 0,
//   comments = [],
//   onLike,
//   onComment,
// }) => {
//   const [liked, setLiked] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [commentText, setCommentText] = useState("");

//   const handleLike = () => {
//     setLiked(!liked);
//     if (onLike) onLike(id);
//   };

//   const handleCommentSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (commentText.trim() && onComment) {
//       onComment(id, commentText);
//       setCommentText("");
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-2xl p-5 mb-6 border border-gray-200 max-w-xl mx-auto">
//       {/* User Info */}
//       <div className="flex items-center mb-3">
//         <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//           {userEmail.charAt(0).toUpperCase()}
//         </div>
//         <p className="ml-3 font-semibold text-gray-800">{userEmail}</p>
//       </div>

//       {/* Post Content */}
//       <p className="text-gray-700 mb-3">{content}</p>
//       {imageUrl && (
//         <img
//           src={imageUrl}
//           alt="Post"
//           className="w-full rounded-xl mb-3 object-cover"
//         />
//       )}

//       {/* Actions */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <button onClick={handleLike} className="flex items-center text-gray-600 hover:text-red-500 transition">
//             {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
//             <span className="ml-1 text-sm">{liked ? likesCount + 1 : likesCount}</span>
//           </button>

//           <button
//             onClick={() => setShowComments(!showComments)}
//             className="flex items-center text-gray-600 hover:text-blue-500 transition"
//           >
//             <FaComment />
//             <span className="ml-1 text-sm">{comments.length}</span>
//           </button>
//         </div>
//       </div>

//       {/* Comments */}
//       {showComments && (
//         <div className="mt-4 border-t border-gray-200 pt-3">
//           <form onSubmit={handleCommentSubmit} className="flex items-center mb-3">
//             <input
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="Write a comment..."
//             />
//             <button
//               type="submit"
//               className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
//             >
//               Post
//             </button>
//           </form>

//           {comments.length === 0 ? (
//             <p className="text-sm text-gray-500">No comments yet.</p>
//           ) : (
//             comments.map((c, idx) => (
//               <div key={idx} className="flex items-start mb-2">
//                 <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700">
//                   {c.userEmail.charAt(0).toUpperCase()}
//                 </div>
//                 <div className="ml-3 bg-gray-100 p-2 rounded-xl w-full">
//                   <p className="text-xs font-semibold text-gray-700">{c.userEmail}</p>
//                   <p className="text-sm text-gray-600">{c.text}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;

// import React, { useState, useEffect } from "react";
// import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
// import { addComment, getComments, likePost } from "../api/posts";
// // import { likePost, addComment, getComments } from "../api/posts";

// interface PostComment {
//   userEmail: string;
//   text: string;
// }


// const PostCard: React.FC<PostCardProps> = ({
//   id,
//   userEmail,
//   content,
//   imageUrl,
//   likesCount = 0,
// }) => {
//   const [liked, setLiked] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [comments, setComments] = useState<PostComment[]>([]);

//   const [comments, setComments] = useState<{ userEmail: string; text: string }[]>([]);
//   const [likeCount, setLikeCount] = useState(likesCount);

//   // Fetch comments when user toggles comments
//   useEffect(() => {
//     if (showComments) {
//     getComments(id).then((res: { data: PostComment[] }) => setComments(res.data));


//     }
//   }, [showComments, id]);

//   // Handle Like button
//   const handleLike = async () => {
//     try {
//       await likePost(id);
//       setLiked(!liked);
//       setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
//     } catch (error) {
//       console.error("Error liking post", error);
//     }
//   };

//   // Handle Comment Submit
//   const handleCommentSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!commentText.trim()) return;
//     try {
//       await addComment(id, commentText);
//       setCommentText("");
//       const res = await getComments(id);
//       setComments(res.data);
//     } catch (error) {
//       console.error("Error adding comment", error);
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-2xl p-5 mb-6 border border-gray-200 max-w-xl mx-auto">
//       {/* User Info */}
//       <div className="flex items-center mb-3">
//         <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//           {userEmail.charAt(0).toUpperCase()}
//         </div>
//         <p className="ml-3 font-semibold text-gray-800">{userEmail}</p>
//       </div>

//       {/* Post Content */}
//       <p className="text-gray-700 mb-3">{content}</p>
//       {imageUrl && (
//         <img
//           src={imageUrl}
//           alt="Post"
//           className="w-full rounded-xl mb-3 object-cover"
//         />
//       )}

//       {/* Actions */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <button
//             onClick={handleLike}
//             className="flex items-center text-gray-600 hover:text-red-500 transition"
//           >
//             {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
//             <span className="ml-1 text-sm">{likeCount}</span>
//           </button>

//           <button
//             onClick={() => setShowComments(!showComments)}
//             className="flex items-center text-gray-600 hover:text-blue-500 transition"
//           >
//             <FaComment />
//             <span className="ml-1 text-sm">{comments.length}</span>
//           </button>
//         </div>
//       </div>

//       {/* Comments Section */}
//       {showComments && (
//         <div className="mt-4 border-t border-gray-200 pt-3">
//           <form onSubmit={handleCommentSubmit} className="flex items-center mb-3">
//             <input
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
//               placeholder="Write a comment..."
//             />
//             <button
//               type="submit"
//               className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
//             >
//               Post
//             </button>
//           </form>

//           {comments.length === 0 ? (
//             <p className="text-sm text-gray-500">No comments yet.</p>
//           ) : (
//             comments.map((c, idx) => (
//               <div key={idx} className="flex items-start mb-2">
//                 <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700">
//                   {c.userEmail.charAt(0).toUpperCase()}
//                 </div>
//                 <div className="ml-3 bg-gray-100 p-2 rounded-xl w-full">
//                   <p className="text-xs font-semibold text-gray-700">{c.userEmail}</p>
//                   <p className="text-sm text-gray-600">{c.text}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;



import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { likePost, addComment, getComments } from "../api/posts";

// Custom interface to avoid DOM Comment conflict
interface PostComment {
  userEmail: string;
  text: string;
}

interface PostCardProps {
  id: number;
  userEmail: string;
  content: string;
  imageUrl?: string;
  likesCount?: number;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  userEmail,
  content,
  imageUrl,
  likesCount = 0,
}) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<PostComment[]>([]);
  const [likeCount, setLikeCount] = useState(likesCount);

  // Fetch comments when user toggles comments
  useEffect(() => {
    if (showComments) {
      getComments(id).then((res) => {
        setComments(res.data as PostComment[]);
      });
    }
  }, [showComments, id]);

  // Handle Like button
  const handleLike = async () => {
    try {
      await likePost(id);
      setLiked(!liked);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  // Handle Comment Submit
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await addComment(id, commentText);
      setCommentText("");
      const res = await getComments(id);
      setComments(res.data as PostComment[]);
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 mb-6 border border-gray-200 max-w-xl mx-auto">
      {/* User Info */}
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {userEmail.charAt(0).toUpperCase()}
        </div>
        <p className="ml-3 font-semibold text-gray-800">{userEmail}</p>
      </div>

      {/* Post Content */}
      <p className="text-gray-700 mb-3">{content}</p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Post"
          className="w-full rounded-xl mb-3 object-cover"
        />
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleLike}
            className="flex items-center text-gray-600 hover:text-red-500 transition"
          >
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            <span className="ml-1 text-sm">{likeCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center text-gray-600 hover:text-blue-500 transition"
          >
            <FaComment />
            <span className="ml-1 text-sm">{comments.length}</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 border-t border-gray-200 pt-3">
          <form onSubmit={handleCommentSubmit} className="flex items-center mb-3">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Write a comment..."
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              Post
            </button>
          </form>

          {comments.length === 0 ? (
            <p className="text-sm text-gray-500">No comments yet.</p>
          ) : (
            comments.map((c, idx) => (
              <div key={idx} className="flex items-start mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700">
                  {c.userEmail.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3 bg-gray-100 p-2 rounded-xl w-full">
                  <p className="text-xs font-semibold text-gray-700">
                    {c.userEmail}
                  </p>
                  <p className="text-sm text-gray-600">{c.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;

