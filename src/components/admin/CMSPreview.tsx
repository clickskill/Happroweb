import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Smartphone } from 'lucide-react';
import { CMSDashboardContent } from './cmsData';

interface CMSPreviewProps {
  customerContent: CMSDashboardContent;
  partnerContent: CMSDashboardContent;
}

export function CMSPreview({ customerContent, partnerContent }: CMSPreviewProps) {
  const activeCustomerCategories = customerContent.category.filter(c => c.isActive).slice(0, 6);
  const activeCustomerBanners = customerContent.banner.filter(b => b.isActive).slice(0, 1);
  const activeCustomerWishes = customerContent.festivalWish.filter(w => w.isActive).slice(0, 1);
  
  const activePartnerCategories = partnerContent.category.filter(c => c.isActive).slice(0, 6);
  const activePartnerBanners = partnerContent.banner.filter(b => b.isActive).slice(0, 1);
  const activePartnerWishes = partnerContent.festivalWish.filter(w => w.isActive).slice(0, 1);

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="size-5 text-primary" />
          <h3>Live Preview</h3>
        </div>

        <Tabs defaultValue="customer">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="partner">Partner</TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="space-y-4">
            <div className="border rounded-2xl overflow-hidden bg-background shadow-xl">
              {/* Mobile Phone Frame */}
              <div className="relative" style={{ aspectRatio: '9/19.5' }}>
                {/* Status Bar */}
                <div className="h-8 bg-background border-b flex items-center justify-between px-4">
                  <span className="text-xs">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="size-1 bg-foreground rounded-full"></div>
                    <div className="size-1 bg-foreground rounded-full"></div>
                    <div className="size-1 bg-foreground rounded-full"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto h-[calc(100%-2rem)] p-3 space-y-3">
                  {/* Festival Wishes Preview */}
                  {activeCustomerWishes.map((wish) => (
                    <div key={wish.id} className="border border-primary/20 rounded-lg p-3 bg-primary/5">
                      <p className="text-xs truncate">{wish.title}</p>
                    </div>
                  ))}
                  
                  {/* Banners Preview */}
                  {activeCustomerBanners.map((banner) => (
                    <div 
                      key={banner.id} 
                      className="rounded-lg p-3 border"
                      style={{ backgroundColor: banner.backgroundColor || '#F8FAFC' }}
                    >
                      <p className="text-xs truncate">{banner.title}</p>
                    </div>
                  ))}
                  
                  {/* Categories Preview */}
                  <div>
                    <p className="text-xs mb-2">Services</p>
                    <div className="grid grid-cols-2 gap-2">
                      {activeCustomerCategories.map((cat) => (
                        <div key={cat.id} className="border rounded-lg p-2 text-center">
                          <div className="text-xl mb-1">{cat.iconUrl}</div>
                          <p className="text-xs truncate">{cat.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="partner" className="space-y-4">
            <div className="border rounded-2xl overflow-hidden bg-background shadow-xl">
              {/* Mobile Phone Frame */}
              <div className="relative" style={{ aspectRatio: '9/19.5' }}>
                {/* Status Bar */}
                <div className="h-8 bg-background border-b flex items-center justify-between px-4">
                  <span className="text-xs">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="size-1 bg-foreground rounded-full"></div>
                    <div className="size-1 bg-foreground rounded-full"></div>
                    <div className="size-1 bg-foreground rounded-full"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto h-[calc(100%-2rem)] p-3 space-y-3">
                  {/* Festival Wishes Preview */}
                  {activePartnerWishes.map((wish) => (
                    <div key={wish.id} className="border border-primary/20 rounded-lg p-3 bg-primary/5">
                      <p className="text-xs truncate">{wish.title}</p>
                    </div>
                  ))}
                  
                  {/* Banners Preview */}
                  {activePartnerBanners.map((banner) => (
                    <div 
                      key={banner.id} 
                      className="rounded-lg p-3 border"
                      style={{ backgroundColor: banner.backgroundColor || '#F8FAFC' }}
                    >
                      <p className="text-xs truncate">{banner.title}</p>
                    </div>
                  ))}
                  
                  {/* Categories Preview */}
                  <div>
                    <p className="text-xs mb-2">Quick Actions</p>
                    <div className="grid grid-cols-2 gap-2">
                      {activePartnerCategories.map((cat) => (
                        <div key={cat.id} className="border rounded-lg p-2 text-center">
                          <div className="text-xl mb-1">{cat.iconUrl}</div>
                          <p className="text-xs truncate">{cat.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
