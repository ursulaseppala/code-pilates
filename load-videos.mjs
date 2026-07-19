import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Your curated videos: link + your own judgment tags
const videos = [
  { url: 'https://www.youtube.com/watch?v=0TaHat1s_8Q', hasProps: true, hasReformer: false, difficulty: 'Advanced', focusArea: 'Lower body' },
  { url: 'https://www.youtube.com/watch?v=ZITKwyVETKQ', hasProps: true, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Upper body' },
  { url: 'https://www.youtube.com/watch?v=rcEdqb8xX2o', hasProps: true, hasReformer: false, difficulty: 'Advanced', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=pFhU0Jb9liE', hasProps: true, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=y-6UnCGMSJ0', hasProps: false, hasReformer: false, difficulty: 'Beginner', focusArea: 'Core' },
  { url: 'https://www.youtube.com/watch?v=RvR2XhlDBEo', hasProps: true, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=x1n1qVQ0UsU', hasProps: true, hasReformer: false, difficulty: 'Advanced', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=HvJRRZl9qQk', hasProps: true, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=_KU_4ZDb6mg', hasProps: true, hasReformer: false, difficulty: 'Advanced', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=AEiwAJAKH1U', hasProps: true, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Lower body' },
  { url: 'https://www.youtube.com/watch?v=cfuePZeBFgY', hasProps: false, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Core' },
  { url: 'https://www.youtube.com/watch?v=AuY9zhwaGvE', hasProps: true, hasReformer: false, difficulty: 'Beginner', focusArea: 'Lower body' },
  { url: 'https://www.youtube.com/watch?v=kBLpkhMi3mE', hasProps: true, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=NXtxjMjMs0Y', hasProps: false, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=u5QbMDvSK3w', hasProps: false, hasReformer: false, difficulty: 'Beginner', focusArea: 'Stretch & mobility' },
  { url: 'https://www.youtube.com/watch?v=M4dyK28GrE0', hasProps: false, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=6Iuh2_kk1d8', hasProps: false, hasReformer: false, difficulty: 'Beginner', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=dF2dXejdKHM', hasProps: false, hasReformer: false, difficulty: 'Beginner', focusArea: 'Core' },
  { url: 'https://www.youtube.com/watch?v=cTsZweJPois', hasProps: false, hasReformer: false, difficulty: 'Beginner', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=oiToJsf_SQ4', hasProps: false, hasReformer: false, difficulty: 'Beginner', focusArea: 'Upper body' },
  { url: 'https://www.youtube.com/watch?v=O1cubPjoB-E', hasProps: true, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Core' },
  { url: 'https://www.youtube.com/watch?v=98rmMgBwJXE', hasProps: false, hasReformer: false, difficulty: 'Beginner', focusArea: 'Stretch & mobility' },
  { url: 'https://www.youtube.com/watch?v=6Gg_dcIKrbs', hasProps: true, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=8k6ni-Za5vA', hasProps: true, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=XLNTbsch1vs', hasProps: false, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=DBQ54g5bw_8', hasProps: true, hasReformer: false, difficulty: 'Advanced', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=GqEh2sBeGWE', hasProps: false, hasReformer: false, difficulty: 'Beginner', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=BO3NJGIKdic', hasProps: false, hasReformer: true, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=QVGJ_i-V85E', hasProps: true, hasReformer: true, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=KqAMZgntSus', hasProps: true, hasReformer: true, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=Pn5wqCc7kfo', hasProps: true, hasReformer: true, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=sPQkfMJTVQo', hasProps: false, hasReformer: true, difficulty: 'Intermediate', focusArea: 'Full body' },
  { url: 'https://www.youtube.com/watch?v=K8OxLM33-A8', hasProps: true, hasReformer: false, difficulty: 'Intermediate', focusArea: 'Full body' },
];

function extractYoutubeId(url) {
  const match = url.match(/(?:v=|\/)([\w-]{11})(?:&|$|\/)/);
  return match ? match[1] : null;
}

function parseISODuration(iso) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

function bucketDuration(totalSeconds) {
  const minutes = totalSeconds / 60;
  if (minutes < 15) return 'Under 15 min';
  if (minutes <= 30) return '15-30 min';
  if (minutes <= 45) return '30-45 min';
  return '45+ min';
}

async function run() {
  for (const v of videos) {
    const id = extractYoutubeId(v.url);
    if (!id) {
      console.log('Could not read a valid ID from:', v.url);
      continue;
    }

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${id}&key=${YOUTUBE_API_KEY}`
    );
    const data = await res.json();
    const item = data.items?.[0];

    if (!item) {
      console.log('No YouTube data found for:', v.url);
      continue;
    }

    const title = item.snippet.title;
    const thumbnail = item.snippet.thumbnails.medium.url;
    const durationSeconds = parseISODuration(item.contentDetails.duration);
    const durationBucket = bucketDuration(durationSeconds);

    const { error } = await supabase.from('videos').insert({
      youtube_id: id,
      title,
      thumbnail_url: thumbnail,
      duration_bucket: durationBucket,
      difficulty: v.difficulty,
      has_reformer: v.hasReformer,
      has_props: v.hasProps,
      focus_area: v.focusArea,
    });

    if (error) console.log('Failed to insert:', title, '-', error.message);
    else console.log('Inserted:', title);
  }
}

run();
