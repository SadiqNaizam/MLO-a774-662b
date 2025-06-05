import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music2 } from 'lucide-react'; // Added Music2 as a placeholder icon
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MusicTrackItemProps {
  id: string | number;
  trackTitle: string;
  artistName: string;
  albumArtUrl?: string;
  duration?: string; // e.g., "3:45"
  isPlaying?: boolean;
  onPlayClick?: (id: string | number) => void;
  trackNumber?: number;
}

const MusicTrackItem: React.FC<MusicTrackItemProps> = ({
  id,
  trackTitle,
  artistName,
  albumArtUrl,
  duration,
  isPlaying = false,
  onPlayClick,
  trackNumber,
}) => {
  console.log("Rendering MusicTrackItem:", trackTitle, "isPlaying:", isPlaying);

  const handlePlay = () => {
    console.log("Play clicked for MusicTrackItem:", id);
    onPlayClick?.(id);
  };

  return (
    <div
      className={`flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors ${isPlaying ? 'bg-yellow-100 dark:bg-yellow-700/30' : ''}`}
      aria-current={isPlaying ? "true" : "false"}
    >
      {trackNumber && (
        <div className="w-8 text-sm text-muted-foreground text-center mr-2 hidden sm:block">
          {trackNumber}
        </div>
      )}
      {albumArtUrl && (
         <Avatar className="h-10 w-10 mr-3 hidden sm:flex">
            <AvatarImage src={albumArtUrl} alt={trackTitle} />
            <AvatarFallback><Music2 size={20} /></AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1 min-w-0">
        <p className={`font-medium truncate ${isPlaying ? 'text-yellow-600 dark:text-yellow-400' : ''}`}>{trackTitle}</p>
        <p className="text-xs text-muted-foreground truncate">{artistName}</p>
      </div>
      {duration && <span className="text-sm text-muted-foreground ml-4 hidden sm:inline">{duration}</span>}
      {onPlayClick && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePlay}
          className="ml-4"
          aria-label={isPlaying ? `Pause ${trackTitle}` : `Play ${trackTitle}`}
        >
          {isPlaying ? <Pause className="h-5 w-5 text-yellow-600" /> : <Play className="h-5 w-5" />}
        </Button>
      )}
    </div>
  );
};

export default MusicTrackItem;