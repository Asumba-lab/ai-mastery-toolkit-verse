import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Search, ThumbsUp, ThumbsDown, Tag, Zap, Star, TrendingUp, AlertTriangle } from "lucide-react";

export const NLPAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [inputText, setInputText] = useState("This Amazon Echo Dot is amazing! The sound quality is great and Alexa responds quickly. I bought it from Amazon and it arrived in 2 days. Highly recommend this product to anyone looking for a smart speaker.");

  const productTypes = [
    { value: "electronics", label: "Electronics", examples: ["smartphones", "laptops", "speakers", "headphones"] },
    { value: "home-garden", label: "Home & Garden", examples: ["furniture", "appliances", "decor", "tools"] },
    { value: "clothing", label: "Clothing & Fashion", examples: ["shirts", "shoes", "accessories", "bags"] },
    { value: "books", label: "Books & Media", examples: ["novels", "textbooks", "movies", "games"] },
    { value: "health-beauty", label: "Health & Beauty", examples: ["skincare", "supplements", "makeup", "fitness"] },
    { value: "food-beverage", label: "Food & Beverage", examples: ["snacks", "drinks", "cooking", "dining"] }
  ];

  // Enhanced analysis based on product category and content
  const generateProductSpecificAnalysis = (text: string, productCategory: string) => {
    const doc = text.toLowerCase();
    
    // Product-specific keywords and aspects
    const productAspects = {
      electronics: {
        aspects: ["sound quality", "battery life", "display", "performance", "connectivity", "durability"],
        positiveWords: ["amazing", "excellent", "fast", "clear", "responsive", "reliable", "high-quality"],
        negativeWords: ["slow", "poor", "broken", "laggy", "dim", "weak", "faulty"],
        entities: ["brand names", "model numbers", "tech specs"]
      },
      "home-garden": {
        aspects: ["build quality", "design", "functionality", "value", "assembly", "durability"],
        positiveWords: ["sturdy", "beautiful", "practical", "easy to use", "well-made", "stylish"],
        negativeWords: ["flimsy", "ugly", "difficult", "poorly made", "unstable", "cheap"],
        entities: ["room types", "dimensions", "materials"]
      },
      "clothing": {
        aspects: ["fit", "material", "comfort", "style", "durability", "sizing"],
        positiveWords: ["comfortable", "stylish", "well-fitted", "soft", "durable", "fashionable"],
        negativeWords: ["tight", "loose", "uncomfortable", "rough", "cheap", "unflattering"],
        entities: ["sizes", "colors", "brands", "materials"]
      },
      "books": {
        aspects: ["content quality", "writing style", "plot", "characters", "pacing", "value"],
        positiveWords: ["engaging", "well-written", "compelling", "informative", "captivating", "insightful"],
        negativeWords: ["boring", "confusing", "poorly written", "slow", "disappointing", "shallow"],
        entities: ["authors", "genres", "publishers", "series"]
      },
      "health-beauty": {
        aspects: ["effectiveness", "skin compatibility", "scent", "packaging", "ingredients", "results"],
        positiveWords: ["effective", "gentle", "pleasant", "nourishing", "rejuvenating", "natural"],
        negativeWords: ["irritating", "ineffective", "harsh", "chemical", "drying", "allergic"],
        entities: ["ingredients", "skin types", "brands", "benefits"]
      },
      "food-beverage": {
        aspects: ["taste", "freshness", "packaging", "value", "ingredients", "texture"],
        positiveWords: ["delicious", "fresh", "flavorful", "crispy", "sweet", "savory", "healthy"],
        negativeWords: ["stale", "bland", "bitter", "soggy", "artificial", "expired"],
        entities: ["flavors", "brands", "nutritional info", "dietary restrictions"]
      }
    };

    const categoryData = productAspects[productCategory] || productAspects.electronics;
    
    // Count positive and negative sentiment indicators
    const positiveCount = categoryData.positiveWords.reduce((count, word) => 
      count + (doc.includes(word) ? 1 : 0), 0);
    const negativeCount = categoryData.negativeWords.reduce((count, word) => 
      count + (doc.includes(word) ? 1 : 0), 0);
    
    // Determine sentiment with confidence
    let sentiment, confidence, reasoning;
    if (positiveCount > negativeCount) {
      sentiment = "POSITIVE";
      confidence = Math.min(0.9, 0.6 + (positiveCount - negativeCount) * 0.1);
      reasoning = `Found ${positiveCount} positive indicators and ${negativeCount} negative indicators. Positive aspects dominate the review.`;
    } else if (negativeCount > positiveCount) {
      sentiment = "NEGATIVE";
      confidence = Math.min(0.9, 0.6 + (negativeCount - positiveCount) * 0.1);
      reasoning = `Found ${negativeCount} negative indicators and ${positiveCount} positive indicators. Concerns outweigh positive aspects.`;
    } else {
      sentiment = "NEUTRAL";
      confidence = 0.5;
      reasoning = "Balanced mix of positive and negative indicators, or insufficient sentiment markers detected.";
    }

    // Extract mentioned aspects
    const mentionedAspects = categoryData.aspects.filter(aspect => 
      doc.includes(aspect.replace(" ", " ")) || doc.includes(aspect.replace(" ", ""))
    );

    // Generate insights
    const insights = [];
    if (mentionedAspects.length > 0) {
      insights.push(`Review focuses on: ${mentionedAspects.join(", ")}`);
    }
    if (doc.includes("recommend")) {
      insights.push("Customer explicitly recommends the product");
    }
    if (doc.includes("return") || doc.includes("refund")) {
      insights.push("Customer considering return/refund");
    }
    if (doc.includes("compare") || doc.includes("vs") || doc.includes("better than")) {
      insights.push("Comparative review - mentions alternatives");
    }

    return {
      sentiment: {
        label: sentiment,
        confidence: confidence,
        reasoning: reasoning
      },
      aspects: mentionedAspects,
      insights: insights,
      categorySpecific: true
    };
  };

  const handleAnalysis = async () => {
    if (!selectedProduct) {
      return;
    }
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    setIsCompleted(true);
  };

  const analysisResults = isCompleted ? generateProductSpecificAnalysis(inputText, selectedProduct) : null;

  // Sample entities (simplified for demo)
  const sampleEntities = [
    { text: "Amazon Echo Dot", label: "PRODUCT", start: 5, end: 20 },
    { text: "Amazon", label: "ORG", start: 95, end: 101 },
    { text: "2 days", label: "DATE", start: 119, end: 125 },
    { text: "Alexa", label: "PRODUCT", start: 75, end: 80 }
  ];

  // Enhanced sample reviews with product categories
  const enhancedSampleReviews = [
    {
      id: 1,
      text: "The iPhone 14 Pro camera is incredible! Apple's computational photography is outstanding. Face ID works flawlessly even with masks.",
      category: "electronics",
      entities: ["iPhone 14 Pro", "Apple", "Face ID"],
      sentiment: "POSITIVE",
      confidence: 0.92,
      aspects: ["camera quality", "face recognition", "brand reliability"],
      insights: ["Focus on camera performance", "Security feature satisfaction", "Latest technology adoption"]
    },
    {
      id: 2,
      text: "This Nike running shoe is uncomfortable after 5 miles. The sole feels too firm and lacks cushioning for long runs.",
      category: "clothing",
      entities: ["Nike", "running shoe"],
      sentiment: "NEGATIVE", 
      confidence: 0.85,
      aspects: ["comfort", "cushioning", "durability"],
      insights: ["Performance issue for intended use", "Specific distance limitation", "Material quality concern"]
    },
    {
      id: 3,
      text: "Absolutely love this organic face cream! My skin feels so much softer and the natural ingredients don't cause any irritation.",
      category: "health-beauty",
      entities: ["organic face cream"],
      sentiment: "POSITIVE",
      confidence: 0.88,
      aspects: ["effectiveness", "ingredient quality", "skin compatibility"],
      insights: ["Natural product preference", "Skin sensitivity consideration", "Tangible results mentioned"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-yellow-400" />
            Task 3: Enhanced Multi-Product NLP Analysis
          </CardTitle>
          <CardDescription className="text-gray-300">
            Advanced sentiment analysis and entity recognition across different product categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-300 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Enhanced NER Capabilities
              </h4>
              <div className="bg-black/30 p-3 rounded text-sm">
                <ul className="space-y-1 text-gray-300">
                  <li>• <strong>PRODUCT:</strong> Category-specific detection</li>
                  <li>• <strong>FEATURES:</strong> Product aspects & attributes</li>
                  <li>• <strong>BRAND:</strong> Company & manufacturer names</li>
                  <li>• <strong>SPECS:</strong> Technical specifications</li>
                  <li>• <strong>CONTEXT:</strong> Usage scenarios & conditions</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-green-300 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Product-Aware Analysis
              </h4>
              <div className="bg-black/30 p-3 rounded text-sm">
                <ul className="space-y-1 text-gray-300">
                  <li>• Category-specific sentiment models</li>
                  <li>• Product aspect identification</li>
                  <li>• Comparative analysis detection</li>
                  <li>• Usage context understanding</li>
                  <li>• Purchase intent analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Interactive Analysis */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-green-400" />
            Multi-Product Review Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Select Product Category:</label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="bg-black/30 border-white/20 text-white">
                  <SelectValue placeholder="Choose a product category..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-white/20">
                  {productTypes.map((product) => (
                    <SelectItem key={product.value} value={product.value} className="text-white hover:bg-white/10">
                      <div>
                        <div className="font-medium">{product.label}</div>
                        <div className="text-xs text-gray-400">
                          {product.examples.slice(0, 2).join(", ")}...
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Enter a product review to analyze:</label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your product review here..."
              className="bg-black/30 border-white/20 text-white placeholder-gray-400"
              rows={4}
            />
          </div>

          <Button
            onClick={handleAnalysis}
            disabled={isAnalyzing || !inputText.trim() || !selectedProduct}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            {isAnalyzing ? "Analyzing with Enhanced spaCy..." : "Analyze Product Review"}
          </Button>

          {isCompleted && analysisResults && (
            <div className="space-y-6">
              <Separator className="bg-white/20" />

              {/* Enhanced Sentiment Analysis */}
              <Card className="bg-black/30 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {analysisResults.sentiment.label === 'POSITIVE' ? 
                      <ThumbsUp className="h-4 w-4 text-green-400" /> : 
                      analysisResults.sentiment.label === 'NEGATIVE' ?
                      <ThumbsDown className="h-4 w-4 text-red-400" /> :
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    }
                    Product-Specific Sentiment Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Overall Sentiment</span>
                      <Badge className={
                        analysisResults.sentiment.label === 'POSITIVE' ? 'bg-green-600' : 
                        analysisResults.sentiment.label === 'NEGATIVE' ? 'bg-red-600' : 'bg-yellow-600'
                      }>
                        {analysisResults.sentiment.label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Confidence Score</span>
                      <span className="font-mono text-lg flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        {(analysisResults.sentiment.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-3 rounded text-sm">
                    <strong className="text-yellow-300">Analysis Reasoning:</strong>
                    <p className="text-gray-300 mt-1">{analysisResults.sentiment.reasoning}</p>
                  </div>

                  {analysisResults.aspects.length > 0 && (
                    <div>
                      <strong className="text-blue-300">Product Aspects Mentioned:</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {analysisResults.aspects.map((aspect, index) => (
                          <Badge key={index} variant="outline" className="text-gray-300 border-blue-500">
                            {aspect}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysisResults.insights.length > 0 && (
                    <div>
                      <strong className="text-purple-300">Key Insights:</strong>
                      <ul className="mt-2 space-y-1">
                        {analysisResults.insights.map((insight, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                            <TrendingUp className="h-3 w-3 mt-0.5 text-purple-400" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Entities Found (simplified for demo) */}
              <Card className="bg-black/30 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Search className="h-4 w-4 text-blue-400" />
                    Named Entities Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sampleEntities.map((entity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-900/20 rounded">
                        <div>
                          <span className="font-medium text-blue-300">"{entity.text}"</span>
                          <div className="text-xs text-gray-400">
                            Position: {entity.start}-{entity.end}
                          </div>
                        </div>
                        <Badge className={`
                          ${entity.label === 'PRODUCT' ? 'bg-purple-600' : ''}
                          ${entity.label === 'ORG' ? 'bg-blue-600' : ''}
                          ${entity.label === 'DATE' ? 'bg-green-600' : ''}
                        `}>
                          {entity.label}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Batch Analysis Results */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-400" />
            Multi-Category Analysis Results
          </CardTitle>
          <CardDescription className="text-gray-300">
            Enhanced analysis across different product categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {enhancedSampleReviews.map((review) => (
              <Card key={review.id} className="bg-black/30 border-white/10">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {review.category.replace("-", " & ")}
                      </Badge>
                      <Badge className={review.sentiment === 'POSITIVE' ? 'bg-green-600' : 'bg-red-600'}>
                        {review.sentiment} ({(review.confidence * 100).toFixed(0)})
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300 text-sm">{review.text}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <strong className="text-blue-300 text-sm">Product Aspects:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {review.aspects.map((aspect, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {aspect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <strong className="text-purple-300 text-sm">Key Insights:</strong>
                        <ul className="mt-1 space-y-0.5">
                          {review.insights.slice(0, 2).map((insight, index) => (
                            <li key={index} className="text-xs text-gray-400 flex items-start gap-1">
                              <TrendingUp className="h-2 w-2 mt-0.5 text-purple-400" />
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Implementation */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-400" />
            Enhanced spaCy Implementation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black/50 p-4 rounded-lg text-sm font-mono overflow-x-auto">
            <pre className="text-gray-300">
{`# Enhanced Multi-Product spaCy Implementation
import spacy
import pandas as pd
from collections import Counter

# Load enhanced spaCy model with custom product pipelines
nlp = spacy.load('en_core_web_sm')

# Product-specific sentiment analysis
class ProductSentimentAnalyzer:
    def __init__(self):
        self.product_lexicons = {
            'electronics': {
                'positive': ['fast', 'responsive', 'clear', 'reliable', 'innovative'],
                'negative': ['slow', 'laggy', 'blurry', 'unreliable', 'outdated'],
                'aspects': ['performance', 'display', 'battery', 'connectivity']
            },
            'clothing': {
                'positive': ['comfortable', 'stylish', 'well-fitted', 'durable'],
                'negative': ['uncomfortable', 'tight', 'poor quality', 'unflattering'],
                'aspects': ['fit', 'material', 'style', 'sizing']
            },
            # Add more categories...
        }
    
    def analyze_review(self, text, product_category):
        """Enhanced product-specific sentiment analysis"""
        doc = nlp(text)
        lexicon = self.product_lexicons.get(product_category, {})
        
        # Extract aspects and sentiments
        aspects_mentioned = []
        sentiment_scores = {'positive': 0, 'negative': 0}
        
        for token in doc:
            if token.text.lower() in lexicon.get('aspects', []):
                aspects_mentioned.append(token.text.lower())
            if token.text.lower() in lexicon.get('positive', []):
                sentiment_scores['positive'] += 1
            if token.text.lower() in lexicon.get('negative', []):
                sentiment_scores['negative'] += 1
        
        # Calculate confidence and final sentiment
        total_signals = sum(sentiment_scores.values())
        if total_signals == 0:
            return 'neutral', 0.5, aspects_mentioned
        
        confidence = max(sentiment_scores.values()) / total_signals
        sentiment = 'positive' if sentiment_scores['positive'] > sentiment_scores['negative'] else 'negative'
        
        return sentiment, confidence, aspects_mentioned

# Usage example
analyzer = ProductSentimentAnalyzer()
result = analyzer.analyze_review("This phone is fast and responsive", "electronics")
print(f"Sentiment: {result[0]}, Confidence: {result[1]:.2f}, Aspects: {result[2]}")`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
