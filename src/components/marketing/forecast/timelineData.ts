
// Timeline data representing marketing activities week by week
export const campaignTimelineData = [
  {
    phase: 'Pre-Launch',
    weeks: 3,
    activities: [
      { name: 'Teaser campaigns', platforms: ['Instagram', 'TikTok'], isKey: true },
      { name: 'Email list warmup', platforms: ['Email'], isKey: false },
      { name: 'Influencer outreach', platforms: ['Various'], isKey: true },
      { name: 'Content preparation', platforms: ['All'], isKey: false },
    ],
    advancedActivities: [
      { name: 'AI-generated content templates', platforms: ['All'], requiresActivation: true },
      { name: 'Competitor analysis', platforms: ['Research'], requiresActivation: false },
    ]
  },
  {
    phase: 'Launch Week',
    weeks: 1,
    activities: [
      { name: 'Full platform push', platforms: ['All'], isKey: true },
      { name: 'Daily content releases', platforms: ['All'], isKey: false },
      { name: 'Limited-time incentives', platforms: ['Website', 'Email'], isKey: true },
      { name: 'Live Q&A sessions', platforms: ['Instagram', 'TikTok'], isKey: false },
    ],
    advancedActivities: [
      { name: 'Automated response system', platforms: ['Social'], requiresActivation: true },
      { name: 'Real-time analytics dashboard', platforms: ['Internal'], requiresActivation: false },
    ]
  },
  {
    phase: 'Week 2-3',
    weeks: 2,
    activities: [
      { name: 'Targeted retargeting', platforms: ['Facebook', 'Instagram'], isKey: true },
      { name: 'Early adopter engagement', platforms: ['Email', 'Community'], isKey: false },
      { name: 'Secondary content wave', platforms: ['All'], isKey: true },
      { name: 'Performance optimization', platforms: ['Ad Platforms'], isKey: false },
    ],
    advancedActivities: [
      { name: 'AI-powered audience segmentation', platforms: ['Ad Platforms'], requiresActivation: true },
      { name: 'A/B testing optimization', platforms: ['Email', 'Ads'], requiresActivation: false },
    ]
  },
  {
    phase: 'Week 4-5',
    weeks: 2,
    activities: [
      { name: 'Review highlighting', platforms: ['All'], isKey: true },
      { name: 'Community engagement', platforms: ['Community'], isKey: false },
      { name: 'Final push promotions', platforms: ['All'], isKey: true },
      { name: 'Results analysis', platforms: ['Internal'], isKey: false },
    ],
    advancedActivities: [
      { name: 'Sentiment analysis of reviews', platforms: ['Social', 'Reviews'], requiresActivation: true },
      { name: 'Automated report generation', platforms: ['Internal'], requiresActivation: false },
    ]
  },
];

// Calculate total campaign duration
export const totalCampaignWeeks = campaignTimelineData.reduce((total, phase) => total + phase.weeks, 0);

export type TimelinePhase = typeof campaignTimelineData[0];
export type Activity = TimelinePhase['activities'][0];
export type AdvancedActivity = TimelinePhase['advancedActivities'][0];
