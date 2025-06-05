import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Music2 } from 'lucide-react';

interface TrackInfo {
  id: string | number;
  title: string;
  artist: string;
  artworkUrl?: string;
  duration?: number; // in seconds
}

interface BottomPlayerBarProps {
  currentTrack: TrackInfo | null;
  isPlaying: boolean;
  progress: number; // 0-100
  volume: number; // 0-100
  isMuted: boolean;
  onPlayPauseClick: () => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  onSeek: (value: number[]) => void; // Slider returns an array
  onVolumeChange: (value: number[]) => void;
  onMuteToggle: () => void;
  onFullScreenToggle?: () => void; // Optional: if there's a full screen mode
}

const formatTime = (seconds: number = 0): string => {
  const flooredSeconds = Math.floor(seconds);
  const min = Math.floor(flooredSeconds / 60);
  const sec = flooredSeconds % 60;
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};

const BottomPlayerBar: React.FC<BottomPlayerBarProps> = ({
  currentTrack,
  isPlaying,
  progress,
  volume,
  isMuted,
  onPlayPauseClick,
  onNextClick,
  onPrevClick,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onFullScreenToggle,
}) => {
  console.log("Rendering BottomPlayerBar. Current track:", currentTrack?.title, "Progress:", progress);

  if (!currentTrack) {
    // Optionally render nothing or a placeholder if no track is active
    return null; 
  }

  const displayedVolume = isMuted ? 0 : volume;

  // Doraemon-inspired colors: blue for background, red for accents, yellow for progress/highlight
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-neutral-800 text-white p-3 shadow-lg z-50 flex items-center justify-between border-t border-neutral-700">
      {/* Track Info */}
      <div className="flex items-center w-1/3 min-w-0">
        <Avatar className="h-12 w-12 mr-3 rounded-md">
          <AvatarImage src={currentTrack.artworkUrl} alt={currentTrack.title} />
          <AvatarFallback className="bg-neutral-700 rounded-md"><Music2 size={24}/></AvatarFallback>
        </Avatar>
        <div className="truncate">
          <p className="text-sm font-semibold truncate">{currentTrack.title}</p>
          <p className="text-xs text-neutral-400 truncate">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Player Controls & Progress */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center space-x-2 mb-1">
          <Button variant="ghost" size="icon" onClick={onPrevClick} disabled={!onPrevClick} aria-label="Previous track" className="text-neutral-300 hover:text-white">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onPlayPauseClick} aria-label={isPlaying ? "Pause" : "Play"} className="bg-yellow-500 hover:bg-yellow-600 rounded-full h-10 w-10 text-black">
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onNextClick} disabled={!onNextClick} aria-label="Next track" className="text-neutral-300 hover:text-white">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center w-full max-w-xs">
          <span className="text-xs text-neutral-400 mr-2">{formatTime(currentTrack.duration ? (progress / 100) * currentTrack.duration : 0)}</span>
          <Slider
            value={[progress]}
            onValueChange={onSeek}
            max={100}
            step={1}
            className="flex-1 [&>span:first-child]:h-1 [&>span:first-child>span]:bg-yellow-500 [&>span:first-child_button]:bg-white [&>span:first-child_button]:border-0 [&>span:first-child_button]:scale-125 [&>span:first-child_button]:opacity-0 hover:[&>span:first-child_button]:opacity-100"
            aria-label="Song progress"
          />
          <span className="text-xs text-neutral-400 ml-2">{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      {/* Volume & Other Controls */}
      <div className="flex items-center justify-end w-1/3 space-x-2">
        <Button variant="ghost" size="icon" onClick={onMuteToggle} aria-label={isMuted ? "Unmute" : "Mute"} className="text-neutral-300 hover:text-white">
          {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <Slider
            value={[displayedVolume]}
            onValueChange={onVolumeChange}
            max={100}
            step={1}
            className="w-24 [&>span:first-child]:h-1 [&>span:first-child>span]:bg-neutral-500 [&>span:first-child_button]:bg-white [&>span:first-child_button]:border-0"
            aria-label="Volume"
        />
        {onFullScreenToggle && (
           <Button variant="ghost" size="icon" onClick={onFullScreenToggle} aria-label="Toggle full screen player" className="text-neutral-300 hover:text-white">
            <Maximize2 className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default BottomPlayerBar;