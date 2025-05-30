
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <FileText className="h-16 w-16 text-blue-600 mr-4" />
            <h1 className="text-5xl font-bold text-gray-900">PDF Compare Tool</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Advanced PDF comparison tool that helps you identify differences, similarities, and changes 
            between documents with precision and ease.
          </p>
          <Link to="/pdf-compare">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Start Comparing PDFs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-600 mr-3" />
                Fast Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Compare PDF documents in seconds with our advanced algorithm that quickly identifies 
                content differences and similarities.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                Detailed Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get comprehensive comparison results in an easy-to-read table format with 
                similarity percentages and change indicators.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600 mr-3" />
                Secure & Private
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your documents are processed securely and never stored on our servers. 
                Complete privacy and confidentiality guaranteed.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
                <p className="text-gray-600">Upload your source and target PDF files using our simple drag-and-drop interface.</p>
              </div>
              <div>
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Compare</h3>
                <p className="text-gray-600">Our advanced algorithm analyzes both documents and identifies all differences and similarities.</p>
              </div>
              <div>
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Review Results</h3>
                <p className="text-gray-600">View detailed comparison results in a comprehensive table with status indicators and similarity scores.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
