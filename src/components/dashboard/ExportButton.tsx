
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ExportButton = () => {
  const { toast } = useToast();

  const handleExport = () => {
    // Simulate export functionality
    toast({
      title: "Export Started",
      description: "Your dashboard data is being exported to Excel format with ZAR formatting.",
    });
    
    // In a real implementation, this would call your Python backend API
    // Example: fetch('/api/export/excel', { method: 'POST' })
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Dashboard exported successfully. Download should start automatically.",
      });
    }, 2000);
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleExport}
      className="border-green-200 hover:bg-green-50 hover:border-green-300"
    >
      <Download className="w-4 h-4 mr-2" />
      Export to Excel
    </Button>
  );
};
