
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileHeader from '@/components/profile/ProfileHeader';
import StoriesTab from '@/components/profile/StoriesTab';
import StoryboardsTab from '@/components/profile/StoryboardsTab';
import AnalysisTab from '@/components/profile/AnalysisTab';
import { StorySummary, Storyboard, Analysis } from '@/components/profile/types';

const mockStories: StorySummary[] = [
  {
    id: '1',
    title: 'The Lost City',
    date: '2023-05-15',
    wordCount: 2500,
    type: 'comic'
  },
  {
    id: '2',
    title: 'Beyond the Stars',
    date: '2023-06-22',
    wordCount: 1800,
    type: 'storyboard'
  },
  {
    id: '3',
    title: 'The Last Guardian',
    date: '2023-07-10',
    wordCount: 3200,
    type: 'pitch'
  }
];

const mockStoryboards: Storyboard[] = [
  {
    id: '1',
    title: 'Mountain Home Exploration',
    date: '2023-09-05',
    frames: 4,
    hasImages: true
  },
  {
    id: '2',
    title: 'City Chase Sequence',
    date: '2023-10-12',
    frames: 6,
    hasImages: true
  },
  {
    id: '3',
    title: 'Desert Encounter',
    date: '2023-11-20',
    frames: 5,
    hasImages: false
  }
];

const mockAnalyses: Analysis[] = [
  {
    id: '1',
    title: 'The Lost City',
    date: '2023-05-20',
    type: 'Comic Analysis',
    insights: {
      audienceSize: '25,000 - 35,000',
      primaryGender: '65% Male, 35% Female',
      potentialRevenue: '€10,500 - €15,000',
      marketingBudget: '€2,800',
      breakEvenPoint: '1,400 sales'
    }
  },
  {
    id: '2',
    title: 'Beyond the Stars',
    date: '2023-07-12',
    type: 'Film Analysis',
    insights: {
      audienceSize: '15,000 - 20,000',
      primaryGender: '55% Female, 45% Male',
      potentialRevenue: '€23,000 - €30,000',
      marketingBudget: '€5,500',
      breakEvenPoint: '3,800 views'
    }
  },
  {
    id: '3',
    title: 'The Last Guardian',
    date: '2023-09-05',
    type: 'Comic Analysis',
    insights: {
      audienceSize: '18,000 - 22,000',
      primaryGender: '60% Male, 40% Female',
      potentialRevenue: '€8,200 - €12,500',
      marketingBudget: '€2,200',
      breakEvenPoint: '1,100 sales'
    }
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name?: string, email: string } | null>(null);
  const [stories, setStories] = useState<StorySummary[]>(mockStories);
  const [storyboards, setStoryboards] = useState<Storyboard[]>(mockStoryboards);
  const [analyses, setAnalyses] = useState<Analysis[]>(mockAnalyses);
  const [activeTab, setActiveTab] = useState<'stories' | 'storyboards' | 'analyses'>('stories');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/sign-in');
      return;
    }
    
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      localStorage.removeItem('user');
      navigate('/sign-in');
    }
  }, [navigate]);

  if (!user) return null;

  const hasStoryboardsWithImages = storyboards.some(sb => sb.hasImages);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <ProfileSidebar user={user} hasStoryboardsWithImages={hasStoryboardsWithImages} />

          <div className="w-full md:w-2/3 lg:w-3/4">
            <ProfileHeader activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === 'stories' && <StoriesTab stories={stories} />}
            {activeTab === 'storyboards' && <StoryboardsTab storyboards={storyboards} />}
            {activeTab === 'analyses' && <AnalysisTab analyses={analyses} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
