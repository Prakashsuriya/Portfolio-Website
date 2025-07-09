import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 gradient-text">
          Prakash K - AI/ML Engineer Portfolio
        </h1>
        <Card className="p-6 max-w-2xl mx-auto">
          <p className="text-center text-muted-foreground mb-4">
            Portfolio is being migrated to Next.js for better Vercel deployment.
          </p>
          <div className="flex justify-center">
            <Button>Coming Soon</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
