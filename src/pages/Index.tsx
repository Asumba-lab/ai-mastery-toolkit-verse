import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Code, Shield, Zap, BookOpen, GitBranch } from "lucide-react";
import { TheorySection } from "@/components/TheorySection";
import { MLClassifier } from "@/components/MLClassifier";
import { DeepLearning } from "@/components/DeepLearning";
import { NLPAnalysis } from "@/components/NLPAnalysis";
import { EthicsOptimization } from "@/components/EthicsOptimization";
import { BonusDeployment } from "@/components/BonusDeployment";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-8 sm:py-12 lg:py-16">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Brain className="h-12 w-12 sm:h-16 sm:w-16 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              AI Mastery Toolkit
            </h1>
            <p className="text-lg sm:text-xl text-purple-100 mb-6 max-w-2xl mx-auto">
              A Comprehensive Journey Through Modern AI Tools & Applications
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-200">
                <Code className="w-4 h-4 mr-1" />
                TensorFlow
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-200">
                <Brain className="w-4 h-4 mr-1" />
                Scikit-learn
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-200">
                <Zap className="w-4 h-4 mr-1" />
                spaCy
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-200">
                <Shield className="w-4 h-4 mr-1" />
                Ethics
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mb-8 bg-white/10 backdrop-blur-sm gap-1 p-1">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600 hover:bg-white/20 transition-all duration-200">
              Overview
            </TabsTrigger>
            <TabsTrigger value="theory" className="text-white data-[state=active]:bg-purple-600 hover:bg-white/20 transition-all duration-200">
              Theory
            </TabsTrigger>
            <TabsTrigger value="ml" className="text-white data-[state=active]:bg-purple-600 hover:bg-white/20 transition-all duration-200">
              ML Task
            </TabsTrigger>
            <TabsTrigger value="dl" className="text-white data-[state=active]:bg-purple-600 hover:bg-white/20 transition-all duration-200">
              Deep Learning
            </TabsTrigger>
            <TabsTrigger value="nlp" className="text-white data-[state=active]:bg-purple-600 hover:bg-white/20 transition-all duration-200">
              NLP
            </TabsTrigger>
            <TabsTrigger value="ethics" className="text-white data-[state=active]:bg-purple-600 hover:bg-white/20 transition-all duration-200">
              Ethics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="h-5 w-5 text-purple-400" />
                    Theoretical Foundation
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-sm">
                    Deep dive into AI frameworks comparison and theoretical concepts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-400">
                    Covers TensorFlow vs PyTorch, Jupyter Notebooks applications, and spaCy advantages
                  </p>
                  <Button 
                    onClick={() => setActiveTab("theory")} 
                    className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-200"
                  >
                    Explore Theory
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Code className="h-5 w-5 text-blue-400" />
                    Practical Implementation
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-sm">
                    Three hands-on AI projects using different tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-400">
                    ML Classification, CNN for MNIST, and NLP sentiment analysis
                  </p>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => setActiveTab("ml")} 
                      variant="outline" 
                      className="w-full border-blue-400/50 text-blue-300 hover:bg-blue-400/20 transition-all duration-200"
                    >
                      ML Classifier
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("dl")} 
                      variant="outline" 
                      className="w-full border-green-400/50 text-green-300 hover:bg-green-400/20 transition-all duration-200"
                    >
                      Deep Learning
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("nlp")} 
                      variant="outline" 
                      className="w-full border-yellow-400/50 text-yellow-300 hover:bg-yellow-400/20 transition-all duration-200"
                    >
                      NLP Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl md:col-span-2 xl:col-span-1">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-red-400" />
                    Ethics & Optimization
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-sm">
                    Bias analysis and model optimization strategies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-400">
                    Identifying biases, debugging challenges, and fairness considerations
                  </p>
                  <Button 
                    onClick={() => setActiveTab("ethics")} 
                    className="w-full bg-red-600 hover:bg-red-700 transition-all duration-200"
                  >
                    Ethics Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Assignment Progress */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-purple-400" />
                  Assignment Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <span className="text-sm sm:text-base">Theoretical Understanding (30%)</span>
                    <Badge className="bg-green-600 hover:bg-green-700 transition-colors duration-200 w-fit">Complete</Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <span className="text-sm sm:text-base">Practical Implementation (40%)</span>
                    <Badge className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 w-fit">In Progress</Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <span className="text-sm sm:text-base">Ethics & Optimization (15%)</span>
                    <Badge className="bg-yellow-600 hover:bg-yellow-700 transition-colors duration-200 w-fit">Ready</Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <span className="text-sm sm:text-base">Bonus Deployment (10%)</span>
                    <Badge className="bg-purple-600 hover:bg-purple-700 transition-colors duration-200 w-fit">Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theory">
            <TheorySection />
          </TabsContent>

          <TabsContent value="ml">
            <MLClassifier />
          </TabsContent>

          <TabsContent value="dl">
            <DeepLearning />
          </TabsContent>

          <TabsContent value="nlp">
            <NLPAnalysis />
          </TabsContent>

          <TabsContent value="ethics">
            <EthicsOptimization />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
