import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import ContentGridCard from "@/components/ContentGridCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const placeholderMusicItems = (category: string, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${category.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
    imageUrl: `https://source.unsplash.com/random/400x400?music,${category}&sig=${Math.random() * 1000 + i}`,
    title: `${category} Title ${i + 1}`,
    subtitle: `Artist Name ${i + 1}`,
    imageAlt: `${category} ${i + 1}`,
  }));

const HomePage: React.FC = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();

  const handleContentClick = (id: string | number) => {
    console.log('Navigating to content:', id);
    navigate(`/content/${id}`);
  };

  const madeForYou = placeholderMusicItems("Made For You Playlist", 5);
  const newReleases = placeholderMusicItems("New Release Album", 8);
  const featuredPlaylists = placeholderMusicItems("Featured Playlist", 6);
  const recentlyPlayed = placeholderMusicItems("Recently Played Track", 4);

  return (
    <ScrollArea className="h-full px-2">
      <div className="container mx-auto py-8 space-y-12">
        {/* Made for You Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <Label htmlFor="made-for-you-heading" className="text-2xl font-bold">Made for You</Label>
            <Button variant="link" className="text-sm">Show All</Button>
          </div>
          <div id="made-for-you-heading" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {madeForYou.map(item => (
              <ContentGridCard key={item.id} {...item} onClick={handleContentClick} />
            ))}
          </div>
        </section>

        {/* New Releases Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <Label htmlFor="new-releases-heading" className="text-2xl font-bold">New Releases</Label>
            <Button variant="link" className="text-sm">Explore More</Button>
          </div>
          <div id="new-releases-heading" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {newReleases.map(item => (
              <ContentGridCard key={item.id} {...item} onClick={handleContentClick} />
            ))}
          </div>
        </section>

        {/* Featured Playlists Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <Label htmlFor="featured-playlists-heading" className="text-2xl font-bold">Featured Playlists</Label>
            <Button variant="link" className="text-sm">See All</Button>
          </div>
          <div id="featured-playlists-heading" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredPlaylists.map(item => (
              <ContentGridCard key={item.id} {...item} onClick={handleContentClick} />
            ))}
          </div>
        </section>

        {/* Recently Played Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <Label htmlFor="recently-played-heading" className="text-2xl font-bold">Recently Played</Label>
            <Button variant="link" className="text-sm">View History</Button>
          </div>
          <div id="recently-played-heading" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recentlyPlayed.map(item => (
              <ContentGridCard key={item.id} {...item} onClick={handleContentClick} />
            ))}
          </div>
        </section>
      </div>
    </ScrollArea>
  );
};

export default HomePage;