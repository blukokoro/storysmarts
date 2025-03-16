
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { BrainCircuit, ArrowLeft, Sparkles, ImagePlus, WandSparkles } from "lucide-react";

const AIRefinement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [refinementNotes, setRefinementNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  // This would come from the actual storyboard in a real implementation
  const storyboardData = location.state?.storyboardData || null;
  
  const handleSubmitRefinement = () => {
    setIsSubmitting(true);
    
    // Simulate API call to process refinement
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessDialog(true);
      toast.success("Refinement request submitted successfully");
    }, 1500);
  };
  
  const handleReturnToStoryboard = () => {
    navigate('/storyboard');
  };
  
  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    navigate('/storyboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <div className="relative py-12 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-indigo-950/80" />
        <div className="relative max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={handleReturnToStoryboard} 
            className="mb-6 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Storyboard
          </Button>
          
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-gradient mb-2">AI Refinement Service</h1>
            <p className="text-gray-400 max-w-3xl">Let our professional artists and AI enhance your storyboard frames with expert adjustments and visual improvements.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BrainCircuit className="mr-2 h-5 w-5 text-primary" />
                  How AI Refinement Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-white">1. Submit Your Storyboard</h3>
                  <p className="text-sm text-gray-400">Upload your existing storyboard frames and provide notes on what you'd like to improve.</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-white">2. AI Processing</h3>
                  <p className="text-sm text-gray-400">Our advanced AI analyzes your frames and applies professional-grade enhancements based on cinematic principles.</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-white">3. Expert Review</h3>
                  <p className="text-sm text-gray-400">Professional artists review and adjust the AI output to ensure quality and adherence to your vision.</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-white">4. Delivery</h3>
                  <p className="text-sm text-gray-400">Receive your enhanced storyboard within 48 hours, ready for production or presentation.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-primary" />
                  Refinement Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <ImagePlus className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white">Visual Enhancement</h3>
                    <p className="text-sm text-gray-400">Improve composition, lighting, and visual clarity of your frames.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <WandSparkles className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white">Style Refinement</h3>
                    <p className="text-sm text-gray-400">Adjust artistic style to match your project's aesthetic requirements.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <BrainCircuit className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white">Technical Correction</h3>
                    <p className="text-sm text-gray-400">Fix perspective, proportions, and cinematic accuracy.</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-sm text-yellow-300">
                    <strong>Premium Service:</strong> AI refinement is included with Premium plan subscriptions. 
                    One-time service available for €299 per storyboard.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle>Request Refinement</CardTitle>
              <CardDescription>
                Describe what aspects of your storyboard you'd like our AI and experts to refine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., Improve lighting in all night scenes, make character expressions more dramatic, adjust camera angles to be more dynamic..."
                className="min-h-32 bg-black/20 border-white/10"
                value={refinementNotes}
                onChange={(e) => setRefinementNotes(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button 
                variant="outline" 
                onClick={handleReturnToStoryboard}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitRefinement} 
                className="bg-primary hover:bg-primary/90"
                disabled={isSubmitting || !refinementNotes.trim()}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> 
                    Submit Refinement Request
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-background border border-white/10">
          <DialogHeader>
            <DialogTitle>Refinement Request Submitted</DialogTitle>
            <DialogDescription>
              Thank you for submitting your AI refinement request. Our team will process your storyboard and deliver the enhanced version within 48 hours.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleSuccessDialogClose}>
              Return to Storyboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIRefinement;
