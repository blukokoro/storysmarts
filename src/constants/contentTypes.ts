
import React from 'react';
import { Image, Video, FileText, Instagram, MessageSquare } from 'lucide-react';
import { ContentType, Platform } from '@/types/marketing';

// Content types with their complexity factors
export const contentTypes: ContentType[] = [
  { type: 'Static image posts', icon: <Image size={16} />, factor: 1, limit: 60 },
  { type: 'Video/reels', icon: <Video size={16} />, factor: 3, limit: 20 },
  { type: 'Written captions', icon: <FileText size={16} />, factor: 0.5, limit: 100 },
  { type: 'Stories', icon: <Instagram size={16} />, factor: 0.8, limit: 50 },
  { type: 'Engagement posts', icon: <MessageSquare size={16} />, factor: 0.7, limit: 30 }
];

// Platform allocation data
export const platformAllocation: Platform[] = [
  { name: 'Instagram', percentage: 40, color: '#E1306C' },
  { name: 'Facebook', percentage: 25, color: '#1877F2' },
  { name: 'TikTok', percentage: 20, color: '#000000' },
  { name: 'Twitter', percentage: 10, color: '#1DA1F2' },
  { name: 'LinkedIn', percentage: 5, color: '#0077B5' }
];
