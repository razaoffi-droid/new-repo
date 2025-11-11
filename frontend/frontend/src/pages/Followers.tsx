// src/pages/Followers.tsx
import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosclient';
import { useParams } from 'react-router-dom';

export default function Followers() {
  const { id } = useParams<{ id: string }>();
  const [followers, setFollowers] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    axiosClient.get(`/follow/${id}/followers`)
      .then(r => setFollowers(r.data))
      .catch(err => {
        console.error(err);
        setFollowers([]);
      });
  }, [id]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Followers of user {id}</h2>
      {followers.length === 0 ? <div>No followers</div> : (
        <ul>
          {followers.map(f => <li key={f.id}>{f.email}</li>)}
        </ul>
      )}
    </div>
  );
}
