import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import MusicTrackItem from "@/components/MusicTrackItem";
import ContentGridCard from "@/components/ContentGridCard";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const placeholderTracks = Array.from({ length: 10 }, (_, i) => ({
  id: `track-${i + 1}`,
  trackTitle: `Found Song Title ${i + 1}`,
  artistName: `Artist ${i + 1}`,
  albumArtUrl: `https://source.unsplash.com/random/100x100?music,album&sig=${Math.random() * 1000 + i}`,
  duration: `${Math.floor(Math.random() * 3) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  trackNumber: i + 1,
}));

const placeholderAlbums = Array.from({ length: 8 }, (_, i) => ({
  id: `album-search-${i + 1}`,
  imageUrl: `https://source.unsplash.com/random/400x400?music,cover&sig=${Math.random() * 1000 + i + 20}`,
  title: `Searched Album ${i + 1}`,
  subtitle: `Album Artist ${i + 1}`,
  imageAlt: `Album ${i + 1}`,
}));

const placeholderArtists = Array.from({ length: 6 }, (_, i) => ({
  id: `artist-search-${i + 1}`,
  imageUrl: `https://source.unsplash.com/random/400x400?musician,portrait&sig=${Math.random() * 1000 + i + 40}`,
  title: `Searched Artist ${i + 1}`,
  subtitle: `Artist Profile`,
  imageAlt: `Artist ${i + 1}`,
}));


const SearchPage: React.FC = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("tracks");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Actual search logic would go here
  };

  const handleContentClick = (id: string | number) => {
    console.log('Navigating to content:', id);
    navigate(`/content/${id}`);
  };
  
  const handlePlayTrack = (id: string | number) => {
    console.log('Play track requested:', id);
    // Add to play queue, update player state, etc.
  };

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-6">
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for songs, artists, albums..."
          className="pl-10 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2" size="sm">Search</Button>
      </form>

      {searchTerm && ( // Only show tabs if there's a search term or results
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
          <TabsList className="mb-4 self-start">
            <TabsTrigger value="tracks">Tracks</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-grow">
            <TabsContent value="tracks" className="mt-0">
              <div className="space-y-2">
                {placeholderTracks.map(track => (
                  <MusicTrackItem key={track.id} {...track} onPlayClick={handlePlayTrack} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {placeholderAlbums.map(album => (
                  <ContentGridCard key={album.id} {...album} onClick={handleContentClick} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="artists" className="mt-0">
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {placeholderArtists.map(artist => (
                  <ContentGridCard key={artist.id} {...artist} onClick={() => navigate(`/artist/${artist.id}`)} /> // Assuming an artist page route
                ))}
              </div>
            </TabsContent>
            <TabsContent value="playlists" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {placeholderAlbums.map(playlist => ( // Reusing album layout for playlists
                  <ContentGridCard key={playlist.id} {...playlist} title={`Playlist: ${playlist.title}`} onClick={handleContentClick} />
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      )}
      {!searchTerm && (
        <div className="flex-grow flex flex-col items-center justify-center text-muted-foreground">
            <SearchIcon size={64} className="mb-4" />
            <p className="text-xl">Find your favorite music.</p>
            <p>Search for songs, artists, albums, or playlists.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;