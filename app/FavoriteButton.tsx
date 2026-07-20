'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';

export default function FavoriteButton({ videoId }: { videoId: number }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      setUserId(data.user.id);

      supabase
        .from('favorites')
        .select('id')
        .eq('user_id', data.user.id)
        .eq('video_id', videoId)
        .then(({ data: favData }) => {
          setIsFavorited(!!favData && favData.length > 0);
        });
    });
  }, [videoId]);

  async function toggleFavorite() {
    if (!userId) {
      alert('Log in to save favorites.');
      return;
    }

    if (isFavorited) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('video_id', videoId);
      setIsFavorited(false);
    } else {
      await supabase.from('favorites').insert({ user_id: userId, video_id: videoId });
      setIsFavorited(true);
    }
  }
  return (
    <button
      onClick={toggleFavorite}
      className="border px-4 py-2"
    >
      {isFavorited ? '♥ Favorited' : '♡ Add to Favorites'}
    </button>
  );
}