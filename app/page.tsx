import { supabase } from '@/supabaseClient';
import VideoList from '@/app/VideoList';

export default async function Home() {
  const { data: videos, error } = await supabase.from('videos').select('*');

  if (error) {
    return <div>Error loading videos: {error.message}</div>;
  }

  return (
    <main>
      <h1 className="text-2xl font-bold p-8 pb-0">Code Pilates</h1>
      <VideoList videos={videos ?? []} />
    </main>
  );
 }
 

