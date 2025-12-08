import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CMSSection } from '../admin/cmsData';

interface CMSRendererProps {
  sections: CMSSection[];
  onAction?: (section: CMSSection) => void;
}

export function CMSCategoryGrid({ sections, onAction }: CMSRendererProps) {
  const activeCategories = React.useMemo(() => {
    return sections.filter(s => s.isActive);
  }, [sections]);

  if (activeCategories.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {activeCategories.map((category) => (
        <Card
          key={category.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onAction?.(category)}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            {category.iconUrl && (
              <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                {category.iconUrl}
              </div>
            )}
            <div>
              <h4>{category.title}</h4>
              {category.description && (
                <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
              )}
            </div>
            {category.actionLabel && (
              <Button size="sm" className="mt-2 w-full">
                {category.actionLabel}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function CMSBannerCarousel({ sections, onAction }: CMSRendererProps) {
  const activeBanners = React.useMemo(() => {
    return sections.filter(s => {
      if (!s.isActive) return false;
      if (s.validUntil && new Date(s.validUntil) < new Date()) return false;
      return true;
    });
  }, [sections]);

  if (activeBanners.length === 0) return null;

  return (
    <div className="space-y-4">
      {activeBanners.map((banner) => (
        <Card
          key={banner.id}
          className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          style={{ backgroundColor: banner.backgroundColor || '#F8FAFC' }}
          onClick={() => onAction?.(banner)}
        >
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {banner.imageUrl && (
                <div className="w-full md:w-1/3 h-48 md:h-auto">
                  <ImageWithFallback
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 p-6 flex flex-col justify-center">
                <h3 className="mb-2">{banner.title}</h3>
                {banner.description && (
                  <p className="text-muted-foreground mb-4">{banner.description}</p>
                )}
                {banner.validUntil && (
                  <Badge variant="outline" className="w-fit mb-4">
                    Valid till {new Date(banner.validUntil).toLocaleDateString('en-IN')}
                  </Badge>
                )}
                {banner.actionLabel && (
                  <Button className="w-fit">
                    {banner.actionLabel}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function CMSFestivalWishes({ sections }: CMSRendererProps) {
  const activeWishes = React.useMemo(() => {
    return sections.filter(s => {
      if (!s.isActive) return false;
      if (s.validUntil && new Date(s.validUntil) < new Date()) return false;
      return true;
    });
  }, [sections]);

  if (activeWishes.length === 0) return null;

  return (
    <div className="space-y-4">
      {activeWishes.map((wish) => (
        <Card key={wish.id} className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {wish.imageUrl && (
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={wish.imageUrl}
                    alt={wish.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="mb-1">{wish.title}</h3>
                {wish.description && (
                  <p className="text-muted-foreground">{wish.description}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function CMSCustomSections({ sections, onAction }: CMSRendererProps) {
  const activeSections = React.useMemo(() => {
    return sections.filter(s => s.isActive);
  }, [sections]);

  if (activeSections.length === 0) return null;

  return (
    <div className="space-y-4">
      {activeSections.map((section) => (
        <Card
          key={section.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onAction?.(section)}
        >
          <CardContent className="p-6 flex items-center gap-4">
            {section.iconUrl && (
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                {section.iconUrl}
              </div>
            )}
            <div className="flex-1">
              <h4>{section.title}</h4>
              {section.description && (
                <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
              )}
            </div>
            {section.actionLabel && (
              <Button variant="outline">
                {section.actionLabel}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
