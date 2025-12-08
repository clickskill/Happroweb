import React from 'react';
import { Card } from './card';
import { Badge } from './badge';
import { Clock, Star } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
  validTill: string;
  image?: string;
  featured?: boolean;
}

interface DealsBannerProps {
  deals: Deal[];
  className?: string;
}

export function DealsBanner({ deals, className }: DealsBannerProps) {
  if (!deals || deals.length === 0) return null;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <div className="flex gap-4 pb-2">
        {deals.map((deal) => (
          <Card key={deal.id} className="min-w-80 p-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            <div className="relative">
              {deal.image && (
                <ImageWithFallback
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-32 object-cover"
                />
              )}
              {deal.featured && (
                <Badge className="absolute top-2 left-2 bg-primary">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              <Badge variant="destructive" className="absolute top-2 right-2">
                {deal.discount}
              </Badge>
            </div>
            <div className="p-4">
              <h4 className="font-medium mb-1">{deal.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{deal.description}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                Valid till {deal.validTill}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}