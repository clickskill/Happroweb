import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
];

interface LanguageDropdownProps {
  onLanguageChange?: (language: string) => void;
}

export function LanguageDropdown({ onLanguageChange }: LanguageDropdownProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [tempSelection, setTempSelection] = useState('en');
  const [open, setOpen] = useState(false);

  const handleApply = () => {
    setSelectedLanguage(tempSelection);
    onLanguageChange?.(tempSelection);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempSelection(selectedLanguage);
    setOpen(false);
  };

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{selectedLang?.native}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="space-y-4">
          <h4 className="font-medium">Select Language</h4>
          <div className="space-y-2">
            {languages.map((language) => (
              <label key={language.code} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="language"
                  value={language.code}
                  checked={tempSelection === language.code}
                  onChange={(e) => setTempSelection(e.target.value)}
                  className="text-primary"
                />
                <span className="text-sm">
                  {language.native} ({language.name})
                </span>
              </label>
            ))}
          </div>
          <div className="flex justify-end space-x-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}