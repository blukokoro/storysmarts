
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileHeaderProps {
  activeTab: 'stories' | 'storyboards' | 'analyses';
  setActiveTab: (tab: 'stories' | 'storyboards' | 'analyses') => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ activeTab, setActiveTab }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex ${isMobile ? 'flex-col gap-1' : ''} border-b border-white/10 mb-6`}>
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === 'stories'
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-400 hover:text-white'
        } ${isMobile ? 'text-left' : ''}`}
        onClick={() => setActiveTab('stories')}
      >
        Your Stories
      </button>
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === 'storyboards'
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-400 hover:text-white'
        } ${isMobile ? 'text-left' : ''}`}
        onClick={() => setActiveTab('storyboards')}
      >
        Your Storyboards
      </button>
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === 'analyses'
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-400 hover:text-white'
        } ${isMobile ? 'text-left' : ''}`}
        onClick={() => setActiveTab('analyses')}
      >
        My Analysis
      </button>
    </div>
  );
};

export default ProfileHeader;
