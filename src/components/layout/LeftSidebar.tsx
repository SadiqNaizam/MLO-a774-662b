import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
// Example: import NavigationMenu if it's always part of this sidebar
// import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
// import { Link } from "react-router-dom"; // If using react-router

interface LeftSidebarProps {
  children: React.ReactNode;
  className?: string;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ children, className }) => {
  console.log("Rendering LeftSidebar");

  // Doraemon-inspired blue as a potential main color
  return (
    <aside className={`hidden md:flex flex-col w-64 h-screen bg-neutral-900 text-neutral-100 border-r border-neutral-800 ${className || ''}`}>
      <div className="p-4 border-b border-neutral-800">
        {/* Placeholder for Logo or App Name */}
        <h1 className="text-xl font-bold text-yellow-400">MusicApp</h1>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-2">
          {children}
          {/* Example of how NavigationMenu might be used if not passed as children:
          <NavigationMenu orientation="vertical" className="w-full">
            <NavigationMenuList className="flex-col space-y-1 items-stretch">
              <NavigationMenuItem className="w-full">
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle() + " w-full justify-start hover:bg-neutral-700"}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                 <Link to="/search">
                  <NavigationMenuLink className={navigationMenuTriggerStyle() + " w-full justify-start hover:bg-neutral-700"}>
                    Search
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                 <Link to="/library">
                  <NavigationMenuLink className={navigationMenuTriggerStyle() + " w-full justify-start hover:bg-neutral-700"}>
                    Your Library
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          */}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-neutral-800 mt-auto">
        {/* Placeholder for user profile or settings link */}
        <p className="text-xs text-neutral-500">© MyApp {new Date().getFullYear()}</p>
      </div>
    </aside>
  );
};

export default LeftSidebar;