import React, { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"; // For shadcn toast (used in UserProfilePage)

// Layout Components
import LeftSidebar from "@/components/layout/LeftSidebar";
import BottomPlayerBar from "@/components/layout/BottomPlayerBar";
import type { TrackInfo as PlayerTrackInfo } from "@/components/layout/BottomPlayerBar"; // Assuming BottomPlayerBar exports this type

// Page Components
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import LibraryPage from "./pages/LibraryPage";
import ContentDetailPage from "./pages/ContentDetailPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

// Icons for Sidebar Navigation (example)
import { Home, Search, Library as LibraryIcon, UserCircle } from 'lucide-react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";


const queryClient = new QueryClient();

interface AppState {
  currentTrack: PlayerTrackInfo | null;
  isPlaying: boolean;
  progress: number; // 0-100
  volume: number; // 0-100
  isMuted: boolean;
}

const App = () => {
  console.log('App loaded');
  const [playerState, setPlayerState] = useState<AppState>({
    currentTrack: { // Placeholder initial track
      id: "initial-placeholder-track",
      title: "Welcome to MusicApp",
      artist: "Your Friendly AI DJ",
      artworkUrl: "https://source.unsplash.com/random/100x100?music,abstract&sig=player",
      duration: 180, // 3 minutes
    },
    isPlaying: false,
    progress: 0,
    volume: 70,
    isMuted: false,
  });

  // Dummy player control handlers
  const handlePlayPauseClick = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const handleSeek = useCallback((value: number[]) => {
    setPlayerState(prev => ({ ...prev, progress: value[0] }));
  }, []);

  const handleVolumeChange = useCallback((value: number[]) => {
    setPlayerState(prev => ({ ...prev, volume: value[0], isMuted: value[0] === 0 ? true : prev.isMuted }));
  }, []);
  
  const handleMuteToggle = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  // Minimal handlers for next/prev
  const handleNextClick = useCallback(() => {
    console.log("Next track clicked (placeholder)");
    // In a real app, update currentTrack to the next one
  }, []);

  const handlePrevClick = useCallback(() => {
    console.log("Previous track clicked (placeholder)");
    // In a real app, update currentTrack to the previous one
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex h-screen bg-neutral-900 text-neutral-100">
            <LeftSidebar className="border-r border-neutral-800">
              {/* Custom navigation content for LeftSidebar */}
              <NavigationMenu orientation="vertical" className="w-full">
                <NavigationMenuList className="flex-col space-y-1 items-stretch">
                  <NavigationMenuItem className="w-full">
                    <Link to="/" className="w-full">
                      <NavigationMenuLink className={navigationMenuTriggerStyle() + " w-full justify-start hover:bg-neutral-700"}>
                        <Home className="mr-2 h-4 w-4" /> Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <Link to="/search" className="w-full">
                      <NavigationMenuLink className={navigationMenuTriggerStyle() + " w-full justify-start hover:bg-neutral-700"}>
                        <Search className="mr-2 h-4 w-4" /> Search
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <Link to="/library" className="w-full">
                      <NavigationMenuLink className={navigationMenuTriggerStyle() + " w-full justify-start hover:bg-neutral-700"}>
                        <LibraryIcon className="mr-2 h-4 w-4" /> Your Library
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                   <NavigationMenuItem className="w-full mt-auto pt-4 border-t border-neutral-700">
                     <Link to="/profile" className="w-full">
                       <NavigationMenuLink className={navigationMenuTriggerStyle() + " w-full justify-start hover:bg-neutral-700"}>
                         <UserCircle className="mr-2 h-4 w-4" /> Profile
                       </NavigationMenuLink>
                     </Link>
                   </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </LeftSidebar>

            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Main content area: Make this scrollable, not the individual pages, unless pages have specific scroll needs */}
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/library" element={<LibraryPage />} />
                  <Route path="/content/:contentId" element={<ContentDetailPage />} />
                  <Route path="/profile" element={<UserProfilePage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              {playerState.currentTrack && (
                 <BottomPlayerBar
                  currentTrack={playerState.currentTrack}
                  isPlaying={playerState.isPlaying}
                  progress={playerState.progress}
                  volume={playerState.volume}
                  isMuted={playerState.isMuted}
                  onPlayPauseClick={handlePlayPauseClick}
                  onSeek={handleSeek}
                  onVolumeChange={handleVolumeChange}
                  onMuteToggle={handleMuteToggle}
                  onNextClick={handleNextClick}
                  onPrevClick={handlePrevClick}
                />
              )}
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;