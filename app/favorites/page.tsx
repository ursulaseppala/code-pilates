'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';
import Link from 'next/link';

export default function FavoritesPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadFavorites() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setLoading(false);
        return;
      }

      const { data: favRows } = await supabase
        .from('favorites')
        .select('video_id')
        .eq('user_id', userData.user.id);

      const videoIds = (favRows ?? []).map((row) => row.video_id);

      if (videoIds.length === 0) {
        setVideos([]);
        setLoading(false);
        return;
      }

      const { data: videoRows } = await supabase
        .from('videos')
        .select('*')
        .in('id', videoIds);

      setVideos(videoRows ?? []);
      setLoading(false);
    }

    loadFavorites();
  }, []);
  if (loading) {
    return <div className="p-8">Loading your favorites...</div>;
  }

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
      {videos.length === 0 ? (
        <p>No favorites yet — go save some videos!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link key={video.id} href={`/video/${video.id}`}>
              <img src={video.thumbnail_url} className="w-full h-48 object-cover" />
              <h2 className="font-semibold mt-2">{video.title}</h2>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}