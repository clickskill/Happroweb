import React, { useState } from 'react';
import { Plus, Edit, Trash2, GripVertical, Layout, Sparkles, Image as ImageIcon, Gift } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';

type CMSContentType = 'category' | 'banner' | 'festivalWish' | 'customSection';

interface CMSSection {
  id: string;
  type: CMSContentType;
  title: string;
  description?: string;
  iconUrl?: string;
  imageUrl?: string;
  actionLabel?: string;
  actionUrl?: string;
  isActive: boolean;
  order: number;
  validUntil?: string;
  backgroundColor?: string;
}

const initialCategories: CMSSection[] = [
  {
    id: 'cat_1',
    type: 'category',
    title: 'AC Repair & Service',
    description: 'Installation, repair, and maintenance',
    iconUrl: '❄️',
    actionLabel: 'Book Now',
    actionUrl: '/services/ac-repair',
    isActive: true,
    order: 1,
  },
  {
    id: 'cat_2',
    type: 'category',
    title: 'Plumbing',
    description: 'Leak fixes, pipe installation',
    iconUrl: '🔧',
    actionLabel: 'Book Now',
    actionUrl: '/services/plumbing',
    isActive: true,
    order: 2,
  },
];

const initialBanners: CMSSection[] = [
  {
    id: 'banner_1',
    type: 'banner',
    title: 'Diwali Special - 25% Off',
    description: 'Get 25% off on all home cleaning services',
    imageUrl: 'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=800',
    actionLabel: 'Claim Offer',
    actionUrl: '/offers/diwali',
    isActive: true,
    order: 1,
    validUntil: '2025-11-15',
    backgroundColor: '#FFF4E6',
  },
];

export function CMSScreen() {
  const [activeTab, setActiveTab] = useState<'customer' | 'partner'>('customer');
  const [categories, setCategories] = useState<CMSSection[]>(initialCategories);
  const [banners, setBanners] = useState<CMSSection[]>(initialBanners);
  const [festivalWishes, setFestivalWishes] = useState<CMSSection[]>([]);
  const [customSections, setCustomSections] = useState<CMSSection[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [contentType, setContentType] = useState<CMSContentType>('category');
  const [editingItem, setEditingItem] = useState<CMSSection | null>(null);
  const [formData, setFormData] = useState<Partial<CMSSection>>({
    title: '',
    description: '',
    iconUrl: '',
    imageUrl: '',
    actionLabel: '',
    actionUrl: '',
    isActive: true,
    validUntil: '',
    backgroundColor: '#F8FAFC',
  });

  const handleAddContent = () => {
    const newContent: CMSSection = {
      id: `cms_${Date.now()}`,
      type: contentType,
      title: formData.title || 'Untitled',
      description: formData.description,
      iconUrl: formData.iconUrl,
      imageUrl: formData.imageUrl,
      actionLabel: formData.actionLabel,
      actionUrl: formData.actionUrl,
      isActive: formData.isActive ?? true,
      order: 0,
      validUntil: formData.validUntil,
      backgroundColor: formData.backgroundColor,
    };

    if (contentType === 'category') {
      setCategories([...categories, newContent]);
    } else if (contentType === 'banner') {
      setBanners([...banners, newContent]);
    } else if (contentType === 'festivalWish') {
      setFestivalWishes([...festivalWishes, newContent]);
    } else if (contentType === 'customSection') {
      setCustomSections([...customSections, newContent]);
    }

    setIsAddDialogOpen(false);
    setFormData({
      title: '',
      description: '',
      iconUrl: '',
      imageUrl: '',
      actionLabel: '',
      actionUrl: '',
      isActive: true,
      validUntil: '',
      backgroundColor: '#F8FAFC',
    });
  };

  const handleDelete = (type: CMSContentType, id: string) => {
    if (type === 'category') {
      setCategories(categories.filter(c => c.id !== id));
    } else if (type === 'banner') {
      setBanners(banners.filter(b => b.id !== id));
    } else if (type === 'festivalWish') {
      setFestivalWishes(festivalWishes.filter(f => f.id !== id));
    } else if (type === 'customSection') {
      setCustomSections(customSections.filter(s => s.id !== id));
    }
  };

  const handleToggle = (type: CMSContentType, id: string) => {
    if (type === 'category') {
      setCategories(categories.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
    } else if (type === 'banner') {
      setBanners(banners.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b));
    } else if (type === 'festivalWish') {
      setFestivalWishes(festivalWishes.map(f => f.id === id ? { ...f, isActive: !f.isActive } : f));
    } else if (type === 'customSection') {
      setCustomSections(customSections.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">CMS & Layout Management</h1>
        <p className="text-muted-foreground">
          Manage categories, promotions, banners, and custom sections for customer and partner dashboards
        </p>
      </div>

      {/* Tabs for Customer/Partner */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'customer' | 'partner')}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="customer">Customer Dashboard</TabsTrigger>
          <TabsTrigger value="partner">Partner Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6 mt-6">
          {/* Categories Section */}
          <ContentSection
            title="Service Categories"
            description="Manage service categories displayed on the dashboard"
            icon={<Layout className="size-5" />}
            items={categories}
            onAdd={() => {
              setContentType('category');
              setIsAddDialogOpen(true);
            }}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />

          {/* Promotional Banners Section */}
          <ContentSection
            title="Promotional Banners"
            description="Manage promotional banners and special offers"
            icon={<ImageIcon className="size-5" />}
            items={banners}
            onAdd={() => {
              setContentType('banner');
              setIsAddDialogOpen(true);
            }}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />

          {/* Festival/Holiday Wishes Section */}
          <ContentSection
            title="Festival & Holiday Wishes"
            description="Add festive greetings and special occasion messages"
            icon={<Gift className="size-5" />}
            items={festivalWishes}
            onAdd={() => {
              setContentType('festivalWish');
              setIsAddDialogOpen(true);
            }}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />

          {/* Custom Sections */}
          <ContentSection
            title="Custom Sections"
            description="Add custom content sections with rich content"
            icon={<Sparkles className="size-5" />}
            items={customSections}
            onAdd={() => {
              setContentType('customSection');
              setIsAddDialogOpen(true);
            }}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </TabsContent>
      </Tabs>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add {contentType === 'category' ? 'Category' : contentType === 'banner' ? 'Banner' : contentType === 'festivalWish' ? 'Festival Wish' : 'Custom Section'}</DialogTitle>
            <DialogDescription>
              Create new content for the {activeTab} dashboard
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., AC Repair"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add a brief description..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Icon */}
            {(contentType === 'category' || contentType === 'customSection') && (
              <div className="space-y-2">
                <Label htmlFor="icon">Icon Emoji</Label>
                <Input
                  id="icon"
                  placeholder="e.g., 🔧 or ❄️"
                  value={formData.iconUrl}
                  onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
                />
              </div>
            )}

            {/* Action Button */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="actionLabel">Action Button Label</Label>
                <Input
                  id="actionLabel"
                  placeholder="e.g., Book Now"
                  value={formData.actionLabel}
                  onChange={(e) => setFormData({ ...formData, actionLabel: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actionUrl">Action URL</Label>
                <Input
                  id="actionUrl"
                  placeholder="e.g., /services"
                  value={formData.actionUrl}
                  onChange={(e) => setFormData({ ...formData, actionUrl: e.target.value })}
                />
              </div>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label>Visible on Dashboard</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle to show/hide this content
                </p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddContent} disabled={!formData.title}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ContentSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: CMSSection[];
  onAdd: () => void;
  onDelete: (type: CMSContentType, id: string) => void;
  onToggle: (type: CMSContentType, id: string) => void;
}

function ContentSection({ title, description, icon, items, onAdd, onDelete, onToggle }: ContentSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary mt-1">
              {icon}
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <Button onClick={onAdd} size="sm">
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No items yet. Click "Add New" to create one.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <GripVertical className="size-5 text-muted-foreground cursor-move" />
                
                {item.iconUrl && (
                  <div className="size-10 rounded-lg bg-accent flex items-center justify-center overflow-hidden">
                    <span className="text-xl">{item.iconUrl}</span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="truncate">{item.title}</h4>
                    {!item.isActive && (
                      <Badge variant="outline" className="text-xs">Hidden</Badge>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={item.isActive}
                    onCheckedChange={() => onToggle(item.type, item.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(item.type, item.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
