
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CustomSolutionCTA: React.FC = () => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-white/10 text-center">
      <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
      <p className="mb-6 text-gray-400 max-w-xl mx-auto">
        Contact our team for custom projects, longer productions, or special requirements.
      </p>
      <Button asChild variant="outline" className="bg-black/50">
        <Link to="/contact">Contact Us</Link>
      </Button>
    </div>
  );
};

export default CustomSolutionCTA;
