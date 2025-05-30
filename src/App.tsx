
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { FileText, ArrowRight, Upload } from 'lucide-react';

const queryClient = new QueryClient();

interface ComparisonResult {
  id: string;
  section: string;
  sourceContent: string;
  targetContent: string;
  status: 'match' | 'different' | 'missing' | 'added';
  similarity: number;
}

const FileUpload: React.FC<{
  onFileUpload: (file: File) => void;
  currentFile: File | null;
  label: string;
  accept: string;
}> = ({ onFileUpload, currentFile, label, accept }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id={`file-upload-${label}`}
      />
      <label
        htmlFor={`file-upload-${label}`}
        className="cursor-pointer flex flex-col items-center space-y-2"
      >
        <Upload className="h-8 w-8 text-gray-400" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {currentFile && (
          <span className="text-xs text-green-600">
            Selected: {currentFile.name}
          </span>
        )}
      </label>
    </div>
  );
};

const ComparisonTable: React.FC<{ results: ComparisonResult[] }> = ({ results }) => {
  return (
    <div className="w-full overflow-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-900 border-r">Field Name</TableHead>
            <TableHead className="font-semibold text-gray-900 border-r">Source File</TableHead>
            <TableHead className="font-semibold text-gray-900">Target File</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => (
            <TableRow key={result.id} className="border-b">
              <TableCell className="font-medium border-r bg-gray-50 align-top">
                {result.section}
              </TableCell>
              <TableCell className="border-r align-top p-3 max-w-md">
                <div className="text-sm text-gray-900 whitespace-pre-wrap break-words">
                  {result.sourceContent || '-'}
                </div>
              </TableCell>
              <TableCell className="align-top p-3 max-w-md">
                <div className="text-sm text-gray-900 whitespace-pre-wrap break-words">
                  {result.targetContent || '-'}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

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
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults: ComparisonResult[] = [
      {
        id: '1',
        section: 'Document ID',
        sourceContent: '172501642441',
        targetContent: '172501724587',
        status: 'different',
        similarity: 85
      },
      {
        id: '2',
        section: 'PID',
        sourceContent: 'QhupDmsci',
        targetContent: 'SgpLbZVi',
        status: 'different',
        similarity: 70
      },
      {
        id: '3',
        section: 'Net Asset Valuation Fee Description',
        sourceContent: 'The basis point tiering structure is applied to each sub fund\'s net assets subject to a sub fund level minimum fee. The base fee per sub fund is calculated as the greater of the minimum fee or ad valorem (bp) fee, detailed below, based upon the sub fund\'s month-end NAV.',
        targetContent: 'The basis point tiering structure is applied to the aggregated net assets of the funds. The resulting total basis point fee is then pro-rated to each sub-fund, as a proportion of the aggregate total net assets subject to a sub fund level minimum fee. The calculation is based on month-end NAVs.',
        status: 'different',
        similarity: 75
      },
      {
        id: '4',
        section: 'Ad Valorem Fee Table',
        sourceContent: 'From To BPS\n0 50,000 51\n50,000 100,000 11\n100,000 150,000 50',
        targetContent: 'From To BPS\n0 50,000 5',
        status: 'different',
        similarity: 60
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
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">PDF Compare Tool</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload two PDF files to compare their content side by side. Get detailed insights about differences, similarities, and changes between documents.
          </p>
        </div>

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PdfCompare />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
