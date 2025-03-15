
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIService } from '@/utils/aiService';
import { toast } from 'sonner';
import { Key } from 'lucide-react';

interface ApiKeyInputProps {
  onSaved: () => void;
  initialApiKey: string;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSaved, initialApiKey }) => {
  const [apiKey, setApiKey] = useState(initialApiKey);

  const handleApiKeySave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    AIService.setApiKey(apiKey);
    onSaved();
    toast.success("API key saved and will be remembered for future sessions");
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xl font-medium mb-4 text-white">Connect to AI API</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="api-key" className="block text-sm font-medium text-gray-300 mb-1">
              API Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-4 w-4 text-gray-500" />
              </div>
              <input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="glass-input w-full pl-10 pr-4 py-2 rounded-md text-white placeholder:text-gray-500"
              />
            </div>
          </div>
          <Button 
            onClick={handleApiKeySave}
            className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300"
          >
            Save API Key
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
