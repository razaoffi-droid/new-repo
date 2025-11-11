// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosclient';

export default function Profile() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // ✅ Fetch the currently logged-in user's info from backend (/users/me)
        const res = await axiosClient.get('/users/me');
        setUserData(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-6 text-gray-500">Loading profile...</div>;
  if (!userData) return <div className="p-6 text-red-500">Not logged in</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Profile</h2>

      <div className="space-y-3 text-gray-700">
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone:</strong> {userData.phone}</p>
        <p><strong>Date of Birth:</strong> {userData.dob}</p>
        <p><strong>Followers:</strong> {userData.followersCount || 0}</p>
        <p><strong>Following:</strong> {userData.followingCount || 0}</p>
        <p><strong>Posts:</strong> {userData.posts?.length || 0}</p>
      </div>
    </div>
  );
}
