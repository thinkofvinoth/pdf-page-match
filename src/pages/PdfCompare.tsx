
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from '@/components/FileUpload';
import { ComparisonTable } from '@/components/ComparisonTable';
import { useToast } from '@/hooks/use-toast';
import { FileText, ArrowRight } from 'lucide-react';

interface ComparisonResult {
  id: string;
  section: string;
  sourceContent: string;
  targetContent: string;
  status: 'match' | 'different' | 'missing' | 'added';
  similarity: number;
}

const PdfCompare = () => {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [targetFile, setTargetFile] = useState<File | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);
  const [hasResults, setHasResults] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (file: File, type: 'source' | 'target') => {
    if (type === 'source') {
      setSourceFile(file);
    } else {
      setTargetFile(file);
    }
    
    toast({
      title: "File uploaded",
      description: `${type === 'source' ? 'Source' : 'Target'} PDF file has been selected successfully.`,
    });
  };

  const simulateComparison = async () => {
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults: ComparisonResult[] = [
      {
        id: '1',
        section: 'Title Page',
        sourceContent: 'Annual Report 2023',
        targetContent: 'Annual Report 2024',
        status: 'different',
        similarity: 85
      },
      {
        id: '2',
        section: 'Executive Summary',
        sourceContent: 'Revenue increased by 15% compared to previous year...',
        targetContent: 'Revenue increased by 15% compared to previous year...',
        status: 'match',
        similarity: 100
      },
      {
        id: '3',
        section: 'Financial Overview',
        sourceContent: 'Total assets: $2.5M, Liabilities: $800K',
        targetContent: 'Total assets: $3.2M, Liabilities: $900K',
        status: 'different',
        similarity: 70
      },
      {
        id: '4',
        section: 'Market Analysis',
        sourceContent: 'Market share increased in Q4...',
        targetContent: 'Market share increased in Q4...',
        status: 'match',
        similarity: 100
      },
      {
        id: '5',
        section: 'Future Projections',
        sourceContent: '',
        targetContent: 'Expected growth of 20% in the next fiscal year...',
        status: 'added',
        similarity: 0
      },
      {
        id: '6',
        section: 'Risk Assessment',
        sourceContent: 'Key risks include market volatility...',
        targetContent: '',
        status: 'missing',
        similarity: 0
      }
    ];
    
    return mockResults;
  };

  const handleCompare = async () => {
    if (!sourceFile || !targetFile) {
      toast({
        title: "Missing files",
        description: "Please upload both source and target PDF files before comparing.",
        variant: "destructive",
      });
      return;
    }

    setIsComparing(true);
    try {
      const results = await simulateComparison();
      setComparisonResults(results);
      setHasResults(true);
      
      toast({
        title: "Comparison completed",
        description: `Found ${results.length} sections to compare. Results are displayed below.`,
      });
    } catch (error) {
      toast({
        title: "Comparison failed",
        description: "An error occurred while comparing the PDF files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsComparing(false);
    }
  };

  const resetComparison = () => {
    setSourceFile(null);
    setTargetFile(null);
    setComparisonResults([]);
    setHasResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">PDF Compare Tool</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload two PDF files to compare their content side by side. Get detailed insights about differences, similarities, and changes between documents.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Upload PDF Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Source PDF</h3>
                <FileUpload
                  onFileUpload={(file) => handleFileUpload(file, 'source')}
                  currentFile={sourceFile}
                  label="Upload source PDF"
                  accept=".pdf"
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Target PDF</h3>
                <FileUpload
                  onFileUpload={(file) => handleFileUpload(file, 'target')}
                  currentFile={targetFile}
                  label="Upload target PDF"
                  accept=".pdf"
                />
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleCompare}
                  disabled={!sourceFile || !targetFile || isComparing}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  {isComparing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Comparing PDFs...
                    </>
                  ) : (
                    <>
                      Compare PDFs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                
                {hasResults && (
                  <Button
                    onClick={resetComparison}
                    variant="outline"
                    size="lg"
                    className="px-6 py-3"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {hasResults && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Comparison Results
                </span>
                <span className="text-sm font-normal text-gray-500">
                  {comparisonResults.length} sections analyzed
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ComparisonTable results={comparisonResults} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PdfCompare;
