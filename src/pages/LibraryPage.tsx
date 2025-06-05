import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContentGridCard from "@/components/ContentGridCard";
import MusicTrackItem from "@/components/MusicTrackItem";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const placeholderPlaylists = Array.from({ length: 6 }, (_, i) => ({
  id: `playlist-lib-${i + 1}`,
  imageUrl: `https://source.unsplash.com/random/400x400?abstract,music&sig=${Math.random() * 1000 + i + 60}`,
  title: `My Playlist ${i + 1}`,
  subtitle: `${Math.floor(Math.random() * 20) + 5} songs`,
  imageAlt: `Playlist ${i + 1}`,
}));

const placeholderLikedSongs = Array.from({ length: 15 }, (_, i) => ({
  id: `liked-song-${i + 1}`,
  trackTitle: `Favorite Song ${i + 1}`,
  artistName: `Liked Artist ${i + 1}`,
  albumArtUrl: `https://source.unsplash.com/random/100x100?music,song&sig=${Math.random() * 1000 + i + 80}`,
  duration: `${Math.floor(Math.random() * 3) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  trackNumber: i + 1,
}));

const placeholderFollowedArtists = Array.from({ length: 4 }, (_, i) => ({
  id: `artist-lib-${i + 1}`,
  imageUrl: `https://source.unsplash.com/random/400x400?musician,band&sig=${Math.random() * 1000 + i + 100}`,
  title: `Followed Artist ${i + 1}`,
  subtitle: `Artist`,
  imageAlt: `Artist ${i + 1}`,
}));

const placeholderSavedAlbums = Array.from({ length: 8 }, (_, i) => ({
  id: `album-lib-${i + 1}`,
  imageUrl: `https://source.unsplash.com/random/400x400?album,art&sig=${Math.random() * 1000 + i + 120}`,
  title: `Saved Album ${i + 1}`,
  subtitle: `Album Artist ${i + 1}`,
  imageAlt: `Album ${i + 1}`,
}));


const LibraryPage: React.FC = () => {
  console.log('LibraryPage loaded');
  const [activeTab, setActiveTab] = useState("playlists");
  const navigate = useNavigate();

  const handleContentClick = (id: string | number) => {
    console.log('Navigating to content:', id);
    navigate(`/content/${id}`);
  };

  const handlePlayTrack = (id: string | number) => {
    console.log('Play track requested from library:', id);
    // Add to play queue, update player state, etc.
  };

  return (
    <div className="flex flex-col h-full p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" /> Create Playlist
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
        <TabsList className="mb-4 self-start">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="songs">Liked Songs</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-grow">
          <TabsContent value="playlists" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {placeholderPlaylists.map(item => (
                <ContentGridCard key={item.id} {...item} onClick={handleContentClick} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="songs" className="mt-0">
            <div className="space-y-1">
              {placeholderLikedSongs.map(track => (
                <MusicTrackItem key={track.id} {...track} onPlayClick={handlePlayTrack} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="artists" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {placeholderFollowedArtists.map(item => (
                <ContentGridCard key={item.id} {...item} onClick={() => navigate(`/artist/${item.id}`)} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="albums" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {placeholderSavedAlbums.map(item => (
                <ContentGridCard key={item.id} {...item} onClick={handleContentClick} />
              ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default LibraryPage;