import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Building, Mail, Phone, MapPin, Globe, Clock, Save, Upload } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';

export function BusinessProfileScreen() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Business Profile</h2>
          <p className="text-muted-foreground">Manage your business information and settings</p>
        </div>
        <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Basic details about your business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="company-name">Company Name</Label>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <Input 
                  id="company-name" 
                  defaultValue="Happro Services Pvt Ltd"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company-description">Company Description</Label>
              <Textarea 
                id="company-description" 
                defaultValue="India's leading home services marketplace connecting customers with trusted service professionals"
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company-email">Contact Email</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="company-email" 
                    type="email"
                    defaultValue="contact@happro.com"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="company-phone">Contact Phone</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="company-phone" 
                    defaultValue="+91 1800-123-4567"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company-address">Business Address</Label>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-2.5 text-muted-foreground" />
                <Textarea 
                  id="company-address" 
                  defaultValue="123 Business Park, Sector 18, Mumbai, Maharashtra 400001, India"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company-website">Website URL</Label>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <Input 
                  id="company-website" 
                  defaultValue="https://happro.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Legal Information</CardTitle>
            <CardDescription>Registration and compliance details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="gst-number">GST Number</Label>
                <Input 
                  id="gst-number" 
                  defaultValue="27AABCU9603R1ZM"
                  placeholder="GST Number"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pan-number">PAN Number</Label>
                <Input 
                  id="pan-number" 
                  defaultValue="AABCU9603R"
                  placeholder="PAN Number"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cin-number">CIN Number</Label>
                <Input 
                  id="cin-number" 
                  defaultValue="U74999MH2024PTC123456"
                  placeholder="CIN Number"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tan-number">TAN Number</Label>
                <Input 
                  id="tan-number" 
                  defaultValue="MUMH12345E"
                  placeholder="TAN Number"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Hours</CardTitle>
            <CardDescription>Operating hours for customer support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="weekday-hours">Weekdays (Mon-Fri)</Label>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="weekday-hours" 
                    defaultValue="9:00 AM - 8:00 PM"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="weekend-hours">Weekends (Sat-Sun)</Label>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="weekend-hours" 
                    defaultValue="10:00 AM - 6:00 PM"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="holidays-enabled">Holiday Support</Label>
                <p className="text-sm text-muted-foreground">Enable services on public holidays</p>
              </div>
              <Switch id="holidays-enabled" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>Logo and brand assets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Company Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted">
                  <Building className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                  <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Logo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Recommended: PNG or SVG, 512x512px minimum
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-2">
              <Label htmlFor="brand-color">Primary Brand Color</Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="brand-color" 
                  type="color"
                  defaultValue="#22F458"
                  className="w-20 h-10"
                />
                <Input 
                  defaultValue="#22F458"
                  className="flex-1 font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission & Fees</CardTitle>
            <CardDescription>Platform commission structure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="platform-commission">Platform Commission (%)</Label>
                <Input 
                  id="platform-commission" 
                  type="number"
                  defaultValue="15"
                  placeholder="15"
                />
                <p className="text-xs text-muted-foreground">
                  Commission charged on each booking
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="service-fee">Customer Service Fee (₹)</Label>
                <Input 
                  id="service-fee" 
                  type="number"
                  defaultValue="50"
                  placeholder="50"
                />
                <p className="text-xs text-muted-foreground">
                  Additional fee per booking
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
              <div>
                <Label>Tips Policy</Label>
                <p className="text-sm text-muted-foreground">
                  100% of tips go directly to technicians
                </p>
              </div>
              <div className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                No Platform Cut
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>Connect your social media profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input 
                id="facebook" 
                defaultValue="https://facebook.com/happro"
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="twitter">Twitter (X)</Label>
              <Input 
                id="twitter" 
                defaultValue="https://twitter.com/happro"
                placeholder="https://twitter.com/yourhandle"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input 
                id="instagram" 
                defaultValue="https://instagram.com/happro"
                placeholder="https://instagram.com/yourpage"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input 
                id="linkedin" 
                defaultValue="https://linkedin.com/company/happro"
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
