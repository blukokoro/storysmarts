
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileHeader from '@/components/profile/ProfileHeader';
import StoriesTab from '@/components/profile/StoriesTab';
import StoryboardsTab from '@/components/profile/StoryboardsTab';
import AnalysisTab from '@/components/profile/AnalysisTab';
import { StorySummary, Storyboard, Analysis } from '@/components/profile/types';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [stories, setStories] = useState<StorySummary[]>([]);
  const [storyboards, setStoryboards] = useState<Storyboard[]>([]);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [activeTab, setActiveTab] = useState<'stories' | 'storyboards' | 'analyses'>('stories');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to sign-in if not logged in
    if (!authLoading && !user) {
      navigate('/sign-in');
      return;
    }

    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Since we don't have the tables yet, we'll use mock data for now
        // In a real app, you would fetch these from Supabase tables
        
        /* The below code is commented out until the tables are created
        const { data: storiesData, error: storiesError } = await supabase
          .from('stories')
          .select('*')
          .eq('user_id', user.id);
          
        if (storiesError) throw storiesError;
        
        // Format stories data
        const formattedStories = storiesData?.map(story => ({
          id: story.id,
          title: story.title,
          date: story.created_at,
          wordCount: story.word_count || 0,
          type: story.type || 'comic'
        })) || [];
        
        setStories(formattedStories.length > 0 ? formattedStories : mockStories);
        */
        
        // Use mock data for now
        setStories(mockStories);
        setStoryboards(mockStoryboards);
        setAnalyses(mockAnalyses);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, authLoading, navigate]);

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <Skeleton className="h-[350px] w-full" />
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-[500px] w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
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

// Mock data for when the user doesn't have any content yet
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

export default Profile;
