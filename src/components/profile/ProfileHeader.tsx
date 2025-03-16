
import React from 'react';

interface ProfileHeaderProps {
  activeTab: 'stories' | 'storyboards' | 'analyses';
  setActiveTab: (tab: 'stories' | 'storyboards' | 'analyses') => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-white/10 mb-6">
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === 'stories'
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setActiveTab('stories')}
      >
        Your Stories
      </button>
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === 'storyboards'
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setActiveTab('storyboards')}
      >
        Your Storyboards
      </button>
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === 'analyses'
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setActiveTab('analyses')}
      >
        My Analysis
      </button>
    </div>
  );
};

export default ProfileHeader;
