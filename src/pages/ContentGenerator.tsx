
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Brain, Wand } from 'lucide-react';
import { useContentGenerator } from '@/hooks/useContentGenerator';
import HeaderSection from '@/components/content-generator/HeaderSection';
import DocumentAnalysisSection from '@/components/content-generator/DocumentAnalysisSection';
import ContentPlanSection from '@/components/content-generator/ContentPlanSection';
import ContentGenerationSection from '@/components/content-generator/ContentGenerationSection';

const ContentGenerator = () => {
  const {
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
  } = useContentGenerator();

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <HeaderSection />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 gap-1 bg-black/30 backdrop-blur-md border border-white/10 mb-6">
            <TabsTrigger value="document-upload" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <FileText className="h-4 w-4 mr-2" />
              1. Upload Document
            </TabsTrigger>
            <TabsTrigger value="content-plan" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" disabled={!documentText}>
              <Brain className="h-4 w-4 mr-2" />
              2. Content Plan
            </TabsTrigger>
            <TabsTrigger value="content-generation" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" disabled={!documentText}>
              <Wand className="h-4 w-4 mr-2" />
              3. Generate Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="document-upload">
            <DocumentAnalysisSection
              documentText={documentText}
              setDocumentText={setDocumentText}
              isLoading={isLoading}
              isAnalyzing={isAnalyzing}
              analysisProgress={analysisProgress}
              contentAnalysis={contentAnalysis}
              autoGenerateContent={autoGenerateContent}
              setAutoGenerateContent={setAutoGenerateContent}
              onFileUpload={handleFileUpload}
              onAnalyzeDocument={handleAnalyzeDocument}
              onViewContentPlan={() => setActiveTab('content-plan')}
            />
          </TabsContent>

          <TabsContent value="content-plan">
            <ContentPlanSection
              contentAnalysis={contentAnalysis}
              contentPlan={contentPlan}
              isLoading={isLoading}
              onGenerateFullContentPlan={handleGenerateFullContentPlan}
              onContinueToContentGeneration={() => setActiveTab('content-generation')}
            />
          </TabsContent>

          <TabsContent value="content-generation">
            <ContentGenerationSection
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              selectedLora={selectedLora}
              setSelectedLora={setSelectedLora}
              imageSize={imageSize}
              setImageSize={setImageSize}
              imageCount={imageCount}
              setImageCount={setImageCount}
              samplingSteps={samplingSteps}
              setSamplingSteps={setSamplingSteps}
              cfgScale={cfgScale}
              setCfgScale={setCfgScale}
              useAdvancedSettings={useAdvancedSettings}
              setUseAdvancedSettings={setUseAdvancedSettings}
              documentText={documentText}
              isLoading={isLoading}
              generatedContent={generatedContent}
              setGeneratedContent={setGeneratedContent}
              onGenerateImage={handleGenerateImage}
              onGenerateQuotes={handleGenerateQuotes}
              onGenerateMarketingText={handleGenerateMarketingText}
              onRemoveContentItem={handleRemoveContentItem}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentGenerator;
