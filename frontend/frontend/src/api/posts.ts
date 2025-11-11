import axiosClient from "./axiosclient";

// Like a post
export const likePost = (postId: number) =>
  axiosClient.post(`/posts/${postId}/like`);

// Add a comment
export const addComment = (postId: number, text: string) =>
  axiosClient.post(`/posts/${postId}/comments`, { text });

// Get comments for a post
export const getComments = (postId: number) =>
  axiosClient.get(`/posts/${postId}/comments`);



