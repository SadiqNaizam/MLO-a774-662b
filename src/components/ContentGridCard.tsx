import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ContentGridCardProps {
  id: string | number;
  imageUrl: string;
  title: string;
  subtitle?: string;
  onClick?: (id: string | number) => void;
  imageAlt?: string;
}

const ContentGridCard: React.FC<ContentGridCardProps> = ({
  id,
  imageUrl,
  title,
  subtitle,
  onClick,
  imageAlt = 'Content image',
}) => {
  console.log("Rendering ContentGridCard:", title);

  const handleClick = () => {
    console.log("ContentGridCard clicked:", id);
    onClick?.(id);
  };

  // Doraemon-inspired yellow accent on hover/focus
  const hoverFocusStyles = "hover:shadow-xl focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2";

  return (
    <Card
      className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${onClick ? 'cursor-pointer ' + hoverFocusStyles : ''}`}
      onClick={onClick ? handleClick : undefined}
      onKeyPress={onClick ? (e) => e.key === 'Enter' && handleClick() : undefined}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? "button" : undefined}
      aria-label={`View details for ${title}`}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={imageAlt || title}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-md font-semibold line-clamp-1">{title}</CardTitle>
        {subtitle && <CardDescription className="text-sm line-clamp-1 mt-1">{subtitle}</CardDescription>}
      </CardContent>
    </Card>
  );
};

export default ContentGridCard;