
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleVisitSite = () => {
    // Show loading indicator before redirecting
    setIsLoading(true);
    // Redirect to the HTML site
    window.location.href = "/index.html";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-8">
          <div className="text-center">
            {isLoading ? (
              <>
                <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
                <Skeleton className="h-6 w-5/6 mx-auto mb-8" />
                <Skeleton className="h-12 w-1/2 mx-auto" />
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold mb-6 text-gray-800">AARUMILA Restaurant</h1>
                <p className="text-xl text-gray-600 mb-8">
                  Experience delicious food from all over India
                </p>
                <Button 
                  onClick={handleVisitSite} 
                  className="bg-amber-600 hover:bg-amber-700 px-8 py-6 text-lg"
                >
                  Visit Restaurant Site
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
