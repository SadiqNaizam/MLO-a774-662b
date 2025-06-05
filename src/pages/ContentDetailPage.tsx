import React from 'react';
import { useParams } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MusicTrackItem from "@/components/MusicTrackItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentGridCard from "@/components/ContentGridCard";
import { PlayCircle, Heart, MoreHorizontal, ListMusic } from "lucide-react";

const placeholderAlbum = {
  id: 'album-doraemon-hits',
  title: 'Doraemon\'s Greatest Hits',
  artist: 'The Gadgets Band',
  artistId: 'artist-gadgets',
  releaseYear: 2024,
  coverArtUrl: 'https://source.unsplash.com/random/600x600?music,robot&sig=doraemon',
  description: 'A collection of the most iconic songs inspired by Doraemon and his adventures. Perfect for fans of all ages!',
  tracks: Array.from({ length: 12 }, (_, i) => ({
    id: `track-dora-${i + 1}`,
    trackNumber: i + 1,
    trackTitle: `Adventure Song ${i + 1}`,
    artistName: 'The Gadgets Band',
    duration: `${Math.floor(Math.random() * 2) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    albumArtUrl: `https://source.unsplash.com/random/100x100?music,abstract&sig=${i + 200}`,
  })),
};

const relatedContent = Array.from({ length: 5 }, (_, i) => ({
  id: `related-${i + 1}`,
  imageUrl: `https://source.unsplash.com/random/400x400?music,anime&sig=${Math.random() * 1000 + i + 140}`,
  title: `Related Album/Playlist ${i + 1}`,
  subtitle: `Artist Name ${i + 1}`,
}));

const ContentDetailPage: React.FC = () => {
  const { contentId } = useParams<{ contentId: string }>();
  console.log('ContentDetailPage loaded for ID:', contentId);
  // In a real app, fetch content details based on contentId

  const album = placeholderAlbum; // Using placeholder

  const handlePlayAlbum = () => {
    console.log('Playing album:', album.title);
    // Logic to play all tracks
  };

  const handlePlayTrack = (trackId: string | number) => {
    console.log('Playing track:', trackId);
    // Logic to play specific track
  };

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto py-8">
        {/* Header Section: Album Art, Title, Artist, Actions */}
        <header className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 mb-8 p-4 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-lg shadow-xl">
          <img
            src={album.coverArtUrl}
            alt={`${album.title} cover art`}
            className="w-48 h-48 md:w-64 md:h-64 rounded-md object-cover shadow-lg"
          />
          <div className="flex-1 text-center md:text-left">
            <Label htmlFor="album-title" className="text-xs uppercase text-neutral-400">Album</Label>
            <h1 id="album-title" className="text-4xl md:text-6xl font-bold text-white break-words">{album.title}</h1>
            <div className="mt-2 flex items-center justify-center md:justify-start space-x-2 text-neutral-300">
              <Avatar className="h-6 w-6">
                <AvatarImage src={`https://source.unsplash.com/random/100x100?musician&sig=${album.artistId}`} alt={album.artist} />
                <AvatarFallback>{album.artist.substring(0,1)}</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{album.artist}</span>
              <span>•</span>
              <span>{album.releaseYear}</span>
              <span>•</span>
              <span>{album.tracks.length} songs</span>
            </div>
            <p className="mt-3 text-sm text-neutral-400 line-clamp-3">{album.description}</p>
            <div className="mt-6 flex items-center justify-center md:justify-start space-x-3">
              <Button size="lg" onClick={handlePlayAlbum} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <PlayCircle className="mr-2 h-6 w-6" /> Play
              </Button>
              <Button variant="outline" size="icon" aria-label="Like album">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="More options">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content: Tabs for Tracklist, Related, etc. */}
        <Tabs defaultValue="tracklist" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="tracklist"><ListMusic className="mr-2 h-4 w-4"/>Tracklist</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
            {/* <TabsTrigger value="artist">About Artist</TabsTrigger> */}
          </TabsList>

          <TabsContent value="tracklist">
            <div className="space-y-1">
              {album.tracks.map((track, index) => (
                <MusicTrackItem
                  key={track.id}
                  {...track}
                  trackNumber={index + 1}
                  onPlayClick={handlePlayTrack}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="related">
            <h2 className="text-xl font-semibold mb-4">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {relatedContent.map(item => (
                <ContentGridCard key={item.id} {...item} onClick={(id) => console.log('Clicked related:', id)} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default ContentDetailPage;