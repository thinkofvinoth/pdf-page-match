
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
