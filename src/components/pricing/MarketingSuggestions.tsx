
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MarketingSuggestions: React.FC = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-center">Marketing Suggestions</h2>
      
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-white">Social Media Strategy</AccordionTrigger>
            <AccordionContent className="text-gray-400">
              <ul className="list-disc list-inside space-y-2">
                <li>Begin teaser campaign 2-3 weeks before release</li>
                <li>Create platform-specific content (TikTok shorts, Instagram carousels)</li>
                <li>Partner with relevant content creators for wider reach</li>
                <li>Schedule regular posts during the first month after release</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-white">Festival & Competition Submissions</AccordionTrigger>
            <AccordionContent className="text-gray-400">
              <ul className="list-disc list-inside space-y-2">
                <li>Submit AI short films to digital film festivals</li>
                <li>Enter comic books in relevant industry awards</li>
                <li>Plan submission timeline 3 months in advance of major festivals</li>
                <li>Prepare press kit and promotional materials specifically for competitions</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-white">Online Platform Distribution</AccordionTrigger>
            <AccordionContent className="text-gray-400">
              <ul className="list-disc list-inside space-y-2">
                <li>Upload short films to YouTube, Vimeo, and social platforms simultaneously</li>
                <li>Distribute comic books through digital comics platforms and your own website</li>
                <li>Implement SEO strategy for discoverability</li>
                <li>Consider paid promotion for first week of release</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-white">Launch Event Ideas</AccordionTrigger>
            <AccordionContent className="text-gray-400">
              <ul className="list-disc list-inside space-y-2">
                <li>Host virtual premiere with creator Q&A session</li>
                <li>Create exclusive behind-the-scenes content for attendees</li>
                <li>Partner with related brands or communities for co-promotion</li>
                <li>Schedule release during relevant seasonal or industry events</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default MarketingSuggestions;
