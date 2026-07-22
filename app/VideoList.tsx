'use client';

import { useState } from 'react';
import Link from 'next/link';

type Video = {
  id: number;
  youtube_id: string;
  title: string;
  thumbnail_url: string;
  duration_bucket: string;
  difficulty: string;
  has_reformer: boolean;
  has_props: boolean;
  focus_area: string;
};

export default function VideoList({ videos }: { videos: Video[] }) {
  const [duration, setDuration] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [machine, setMachine] = useState('All');
  const [propsFilter, setPropsFilter] = useState('All');
  const [focusArea, setFocusArea] = useState('All');

  const durations = ['All', 'Under 15 min', '15-30 min', '30-45 min', '45+ min'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const machines = ['All', 'Reformer', 'No machine'];
  const propsOptions = ['All', 'Uses small props', 'No props'];
  const focusAreas = ['All', 'Full body', 'Core', 'Lower body', 'Upper body', 'Stretch & mobility'];

  const filteredVideos = videos.filter((video) => {
    const matchesDuration = duration === 'All' || video.duration_bucket === duration;
    const matchesDifficulty = difficulty === 'All' || video.difficulty === difficulty;
    const matchesMachine =
      machine === 'All' ||
      (machine === 'Reformer' && video.has_reformer) ||
      (machine === 'No machine' && !video.has_reformer);
    const matchesProps =
      propsFilter === 'All' ||
      (propsFilter === 'Uses small props' && video.has_props) ||
      (propsFilter === 'No props' && !video.has_props);
    const matchesFocusArea = focusArea === 'All' || video.focus_area === focusArea;
    return matchesDuration && matchesDifficulty && matchesMachine && matchesProps && matchesFocusArea;
  });

  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-6 mb-8">
        <FilterGroup label="Duration" options={durations} selected={duration} onSelect={setDuration} />
        <FilterGroup label="Difficulty" options={difficulties} selected={difficulty} onSelect={setDifficulty} />
        <FilterGroup label="Machine" options={machines} selected={machine} onSelect={setMachine} />
        <FilterGroup label="Props" options={propsOptions} selected={propsFilter} onSelect={setPropsFilter} />
        <FilterGroup label="Focus area" options={focusAreas} selected={focusArea} onSelect={setFocusArea} />
      </div>

      <p className="text-sm text-gray-500 mb-4">{filteredVideos.length} videos</p>

      {filteredVideos.length === 0 ? (
  <p className="text-gray-500">No videos match these filters — try adjusting them.</p>
) : (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <Link key={video.id} href={`/video/${video.id}`} className="border rounded-lg overflow-hidden shadow-sm block">
            <img src={video.thumbnail_url} alt={video.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="font-semibold text-sm mb-2">{video.title}</h2>
              <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                <span>{video.duration_bucket}</span>
                <span>{video.difficulty}</span>
                <span>{video.focus_area}</span>
                {video.has_reformer && <span>Reformer</span>}
                {video.has_props && <span>Props</span>}
              </div>
            </div>
          </Link>
))}
    </div>)}
  </div>
);
}

function FilterGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`text-xs px-3 py-1 rounded-full border ${
              selected === option ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
