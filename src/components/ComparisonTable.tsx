
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, Plus, Minus } from 'lucide-react';

interface ComparisonResult {
  id: string;
  section: string;
  sourceContent: string;
  targetContent: string;
  status: 'match' | 'different' | 'missing' | 'added';
  similarity: number;
}

interface ComparisonTableProps {
  results: ComparisonResult[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ results }) => {
  const getStatusBadge = (status: string, similarity: number) => {
    switch (status) {
      case 'match':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Match ({similarity}%)
          </Badge>
        );
      case 'different':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <XCircle className="h-3 w-3 mr-1" />
            Different ({similarity}%)
          </Badge>
        );
      case 'added':
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
            <Plus className="h-3 w-3 mr-1" />
            Added
          </Badge>
        );
      case 'missing':
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
            <Minus className="h-3 w-3 mr-1" />
            Missing
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'match':
        return 'border-l-green-400';
      case 'different':
        return 'border-l-yellow-400';
      case 'added':
        return 'border-l-blue-400';
      case 'missing':
        return 'border-l-red-400';
      default:
        return 'border-l-gray-400';
    }
  };

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No comparison results to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-t-lg border-b">
            <div className="font-semibold text-gray-700">Section</div>
            <div className="font-semibold text-gray-700">Source Content</div>
            <div className="font-semibold text-gray-700">Target Content</div>
            <div className="font-semibold text-gray-700">Status</div>
          </div>
          
          {/* Results */}
          <div className="divide-y">
            {results.map((result) => (
              <Card key={result.id} className={`border-l-4 ${getStatusColor(result.status)} shadow-none border-t-0 border-r-0 border-b-0 rounded-none`}>
                <CardContent className="p-0">
                  <div className="grid grid-cols-4 gap-4 p-4">
                    {/* Section */}
                    <div className="font-medium text-gray-900">
                      {result.section}
                    </div>
                    
                    {/* Source Content */}
                    <div className="text-sm text-gray-700">
                      {result.sourceContent ? (
                        <div className="p-3 bg-gray-50 rounded border">
                          {result.sourceContent.length > 100 
                            ? `${result.sourceContent.substring(0, 100)}...` 
                            : result.sourceContent
                          }
                        </div>
                      ) : (
                        <div className="p-3 bg-red-50 rounded border border-red-200 text-red-600 italic">
                          No content
                        </div>
                      )}
                    </div>
                    
                    {/* Target Content */}
                    <div className="text-sm text-gray-700">
                      {result.targetContent ? (
                        <div className="p-3 bg-gray-50 rounded border">
                          {result.targetContent.length > 100 
                            ? `${result.targetContent.substring(0, 100)}...` 
                            : result.targetContent
                          }
                        </div>
                      ) : (
                        <div className="p-3 bg-red-50 rounded border border-red-200 text-red-600 italic">
                          No content
                        </div>
                      )}
                    </div>
                    
                    {/* Status */}
                    <div className="flex items-start">
                      {getStatusBadge(result.status, result.similarity)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-green-700">Matches: </span>
              <span>{results.filter(r => r.status === 'match').length}</span>
            </div>
            <div>
              <span className="font-medium text-yellow-700">Different: </span>
              <span>{results.filter(r => r.status === 'different').length}</span>
            </div>
            <div>
              <span className="font-medium text-blue-700">Added: </span>
              <span>{results.filter(r => r.status === 'added').length}</span>
            </div>
            <div>
              <span className="font-medium text-red-700">Missing: </span>
              <span>{results.filter(r => r.status === 'missing').length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
