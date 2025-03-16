
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { GeneratedContent, ContentAnalysis, AIContentPlan, ModelType, LoraType } from '@/components/content-generator/types';

export const useContentGenerator = () => {
  const [activeTab, setActiveTab] = useState<string>('document-upload');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [documentText, setDocumentText] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [contentAnalysis, setContentAnalysis] = useState<ContentAnalysis | null>(null);
  const [contentPlan, setContentPlan] = useState<AIContentPlan | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  
  const [imagePrompt, setImagePrompt] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<ModelType>('comic-art');
  const [selectedLora, setSelectedLora] = useState<LoraType>('comic-book');
  const [imageSize, setImageSize] = useState<string>('1:1');
  const [imageCount, setImageCount] = useState<number>(1);
  const [samplingSteps, setSamplingSteps] = useState<number>(30);
  const [cfgScale, setCfgScale] = useState<number>(7.5);
  const [useAdvancedSettings, setUseAdvancedSettings] = useState<boolean>(false);
  const [autoGenerateContent, setAutoGenerateContent] = useState<boolean>(false);

  useEffect(() => {
    if (documentText) {
      setAnalysisProgress(0);
    }
  }, [documentText]);

  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        const mockExtractedText = `This is extracted text from the uploaded PDF.
        It contains several paragraphs of content that can be used to generate
        marketing materials, images, and quotes. The protagonist in this story
        battles against all odds to emerge victorious in the final confrontation.`;
        
        setDocumentText(mockExtractedText);
        toast.success("Document uploaded and text extracted successfully!");
        setIsLoading(false);
        
        if (autoGenerateContent) {
          handleAnalyzeDocument();
        }
      }, 2000);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error("Error uploading file. Please try again.");
      setIsLoading(false);
    }
  };

  const handleAnalyzeDocument = () => {
    if (!documentText.trim()) {
      toast.error("Please upload a document first");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 500);
    
    setTimeout(() => {
      clearInterval(interval);
      setAnalysisProgress(100);
      
      const mockAnalysis: ContentAnalysis = {
        keyThemes: ['perseverance', 'triumph', 'adversity', 'journey', 'transformation'],
        suggestedTopics: [
          'Overcoming challenges in life',
          'Finding inner strength',
          "The hero's journey",
          'Transformative experiences',
          'Victory against the odds'
        ],
        keyTerms: ['protagonist', 'battle', 'victory', 'odds', 'confrontation', 'emerge'],
        sentimentScore: 0.75,
        audienceMatch: [
          { demographic: 'Young Adults (18-24)', score: 0.85 },
          { demographic: 'Adults (25-34)', score: 0.78 },
          { demographic: 'Teens (13-17)', score: 0.62 }
        ]
      };
      
      const mockContentPlan: AIContentPlan = {
        contentTypes: [
          { 
            type: 'Image', 
            count: 12, 
            examples: ['Character portrait', 'Action scene', 'Emotional moment'] 
          },
          { 
            type: 'Quote', 
            count: 8, 
            examples: ['Inspirational line', 'Character dialogue', 'Pivotal moment'] 
          },
          { 
            type: 'Text', 
            count: 15, 
            examples: ['Social media post', 'Email newsletter', 'Ad copy'] 
          }
        ],
        schedule: [
          {
            week: 1,
            content: [
              { type: 'Image', description: 'Character introduction', platform: 'Instagram' },
              { type: 'Quote', description: 'Teaser quote', platform: 'Twitter' },
              { type: 'Text', description: 'Announcement post', platform: 'Facebook' }
            ]
          },
          {
            week: 2,
            content: [
              { type: 'Image', description: 'Key scene visual', platform: 'Instagram' },
              { type: 'Quote', description: 'Motivational quote', platform: 'Twitter' },
              { type: 'Text', description: 'Behind-the-scenes', platform: 'Facebook' }
            ]
          }
        ],
        keywords: ['hero', 'adventure', 'challenge', 'triumph', 'journey', 'victory'],
        hashtagSuggestions: ['#HeroJourney', '#OvercomingOdds', '#VictoryStory', '#Inspiration']
      };
      
      setContentAnalysis(mockAnalysis);
      setContentPlan(mockContentPlan);
      
      const initialQuotes = [
        "The protagonist battles against all odds to emerge victorious.",
        "In the final confrontation, the truth is revealed."
      ];
      
      const initialContent: GeneratedContent[] = initialQuotes.map(quote => ({
        type: 'quote',
        content: quote,
        category: 'Inspirational',
        score: 0.92,
        aiModel: 'GPT-4'
      }));
      
      setGeneratedContent(initialContent);
      setIsAnalyzing(false);
      toast.success("Document analysis complete!");
      
      setActiveTab('content-plan');
    }, 4000);
  };

  const handleGenerateImage = () => {
    if (!imagePrompt.trim()) {
      toast.error("Please enter an image prompt");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const mockGeneratedImageUrl = "/lovable-uploads/aba2b6fd-509a-45f5-9146-31ccf17ad0e7.png";
      
      const newContent: GeneratedContent = {
        type: 'image',
        content: mockGeneratedImageUrl,
        prompt: imagePrompt,
        aiModel: selectedModel,
        tags: ['generated', selectedModel, selectedLora]
      };
      
      setGeneratedContent([newContent, ...generatedContent]);
      toast.success("Image generated successfully!");
      setIsLoading(false);
    }, 3000);
  };

  const handleGenerateQuotes = () => {
    if (!documentText.trim()) {
      toast.error("Please upload a document first");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const mockQuotes = [
        "The protagonist battles against all odds to emerge victorious.",
        "In the final confrontation, the truth is revealed.",
        "This story contains several paragraphs of content that can be used for marketing."
      ];
      
      const newContent: GeneratedContent[] = mockQuotes.map(quote => ({
        type: 'quote',
        content: quote,
        source: 'Document Analysis',
        score: 0.85 + Math.random() * 0.1,
        aiModel: 'GPT-4'
      }));
      
      setGeneratedContent([...newContent, ...generatedContent]);
      toast.success("Quotes extracted successfully!");
      setIsLoading(false);
    }, 2000);
  };

  const handleGenerateMarketingText = () => {
    if (!documentText.trim()) {
      toast.error("Please upload a document first");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const mockMarketingTexts = [
        "Experience the epic journey of our hero as they face impossible challenges and emerge triumphant! #ComingSoon #MustRead",
        "The most thrilling adventure of the year is here! Dive into a world of excitement and mystery that will keep you on the edge of your seat.",
        "Unforgettable characters. Breathtaking action. A story that will stay with you long after the final page. Pre-order now and be the first to discover this year's most anticipated release!"
      ];
      
      const newContent: GeneratedContent[] = mockMarketingTexts.map(text => ({
        type: 'text',
        content: text,
        category: 'Social Media',
        aiModel: 'GPT-4'
      }));
      
      setGeneratedContent([...newContent, ...generatedContent]);
      toast.success("Marketing text generated successfully!");
      setIsLoading(false);
    }, 2500);
  };

  const handleRemoveContentItem = (index: number) => {
    const newContent = [...generatedContent];
    newContent.splice(index, 1);
    setGeneratedContent(newContent);
  };

  const handleGenerateFullContentPlan = () => {
    if (!contentAnalysis) {
      toast.error("Please analyze your document first");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const newImages: GeneratedContent[] = [
        {
          type: 'image',
          content: "/lovable-uploads/aba2b6fd-509a-45f5-9146-31ccf17ad0e7.png",
          prompt: "Hero character portrait in comic style",
          category: 'Character',
          aiModel: 'comic-art'
        }
      ];
      
      const newQuotes: GeneratedContent[] = contentAnalysis.keyThemes.slice(0, 2).map(theme => ({
        type: 'quote',
        content: `Inspiring quote about ${theme} and overcoming challenges.`,
        category: 'Theme',
        aiModel: 'GPT-4'
      }));
      
      const newTexts: GeneratedContent[] = contentAnalysis.suggestedTopics.slice(0, 2).map(topic => ({
        type: 'text',
        content: `Marketing copy about "${topic}" that resonates with the target audience.`,
        category: 'Marketing',
        aiModel: 'GPT-4'
      }));
      
      setGeneratedContent([...newImages, ...newQuotes, ...newTexts, ...generatedContent]);
      toast.success("Full content plan generated!");
      setIsLoading(false);
    }, 3000);
  };

  return {
    // State
    activeTab,
    isLoading,
    isAnalyzing,
    documentText,
    generatedContent,
    contentAnalysis,
    contentPlan,
    analysisProgress,
    imagePrompt,
    selectedModel,
    selectedLora,
    imageSize,
    imageCount,
    samplingSteps,
    cfgScale,
    useAdvancedSettings,
    autoGenerateContent,
    
    // Setters
    setActiveTab,
    setDocumentText,
    setGeneratedContent,
    setImagePrompt,
    setSelectedModel,
    setSelectedLora,
    setImageSize,
    setImageCount,
    setSamplingSteps,
    setCfgScale,
    setUseAdvancedSettings,
    setAutoGenerateContent,
    
    // Handlers
    handleFileUpload,
    handleAnalyzeDocument,
    handleGenerateImage,
    handleGenerateQuotes,
    handleGenerateMarketingText,
    handleRemoveContentItem,
    handleGenerateFullContentPlan
  };
};
