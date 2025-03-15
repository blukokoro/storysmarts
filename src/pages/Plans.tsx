
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  type: 'comic' | 'storyboard' | 'pitch' | 'film';
  price: number;
  features: string[];
  active: boolean;
  dateActivated: string;
  nextBillingDate?: string;
}

const mockActivePlans: Plan[] = [
  {
    id: '1',
    name: 'Comic Book Premium',
    type: 'comic',
    price: 399,
    features: ['20 pages included', 'Character design', 'Full color illustrations', 'PDF & print-ready files', '2 rounds of revisions'],
    active: true,
    dateActivated: '2023-05-15',
    nextBillingDate: '2023-06-15'
  },
  {
    id: '2',
    name: 'AI Short Film Basic',
    type: 'film',
    price: 899,
    features: ['5 minutes runtime', 'Voice acting', 'Custom soundtrack', 'Special effects', 'Distribution package'],
    active: true,
    dateActivated: '2023-06-22',
    nextBillingDate: '2023-07-22'
  }
];

const Plans = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name?: string, email: string } | null>(null);
  const [activePlans, setActivePlans] = useState<Plan[]>(mockActivePlans);

  useEffect(() => {
    // Check if user is logged in
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

  const handleDeactivatePlan = (planId: string) => {
    setActivePlans(activePlans.filter(plan => plan.id !== planId));
    toast.success('Plan deactivated successfully');
  };

  if (!user) return null;

  const getPlanIcon = (type: string) => {
    switch (type) {
      case 'comic':
        return <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>;
      case 'storyboard':
        return <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>;
      case 'pitch':
        return <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>;
      case 'film':
        return <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>;
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Plans</h1>
          <Button onClick={() => navigate('/pricing')}>Browse Plans</Button>
        </div>

        {activePlans.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {activePlans.map((plan) => (
              <Card key={plan.id} className="bg-black/30 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getPlanIcon(plan.type)}
                      <CardTitle>{plan.name}</CardTitle>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      Active
                    </span>
                  </div>
                  <CardDescription>€{plan.price}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400">Activated on: {new Date(plan.dateActivated).toLocaleDateString()}</div>
                    {plan.nextBillingDate && (
                      <div className="text-xs text-gray-400">Next billing: {new Date(plan.nextBillingDate).toLocaleDateString()}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Features:</h4>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeactivatePlan(plan.id)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Deactivate Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-black/30 backdrop-blur-sm border-white/10">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center space-y-3 py-8">
                <AlertCircle className="h-10 w-10 text-gray-400" />
                <h3 className="text-lg font-medium">No Active Plans</h3>
                <p className="text-gray-400 max-w-md">
                  You don't have any active plans. Visit our pricing page to explore available options for your storytelling needs.
                </p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate('/pricing')}
                >
                  Browse Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Plans;
