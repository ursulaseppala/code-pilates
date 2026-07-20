import { supabase } from '@/supabaseClient';

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: video, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !video) {
    return <div className="p-8">Video not found.</div>;
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <a href="/" className="text-sm text-gray-500 mb-4 inline-block">&larr; Back to all videos</a>
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>

      <div className="aspect-video mb-6">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.youtube_id}`}
          title={video.title}
          allowFullScreen
        />
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
        <span>{video.duration_bucket}</span>
        <span>{video.difficulty}</span>
        <span>{video.focus_area}</span>
        {video.has_reformer && <span>Reformer</span>}
        {video.has_props && <span>Props</span>}
      </div>
    </main>
  );
}