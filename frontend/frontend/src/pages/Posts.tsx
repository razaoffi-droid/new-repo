// src/pages/Posts.tsx
import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../api/axiosclient';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

type PostItem = {
  id: number;
  title: string;
  content?: string;
  createdAt?: string;
};

export default function Posts() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function load() {
      try {
        // If you want posts of logged user:
        const res = await axiosClient.get('/posts/my-posts'); // protected: requires token
        setPosts(res.data);
      } catch (err) {
        // fallback: fetch all posts if my-posts fails
        try {
          const r2 = await axiosClient.get('/posts/all');
          setPosts(r2.data);
        } catch (e) {
          console.error(e);
        }
      }
    }
    load();
  }, [token]);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Posts</h2>
      {posts.length === 0 ? (
        <div>No posts yet</div>
      ) : (
        <ul>
          {posts.map(p => (
            <li key={p.id}>
              <Link to={`/posts/${p.id}`}><strong>{p.title}</strong></Link>
              <div>{p.content?.slice(0, 120)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
