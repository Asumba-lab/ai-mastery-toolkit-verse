import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Search, ThumbsUp, ThumbsDown, Tag, Zap, Star, TrendingUp, AlertTriangle } from "lucide-react";

interface ReviewEntity {
  text: string;
  label: string;
  start: number;
  end: number;
}

interface ReviewAnalysisResult {
  review: string;
  sentiment: {
    label: string;
    confidence: number;
    reasoning: string;
  };
  aspects: string[];
  insights: string[];
  categorySpecific: boolean;
  entities: ReviewEntity[];
  category: string;
}

export const NLPAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [inputText, setInputText] = useState("");
  const [batchInput, setBatchInput] = useState("");
  const [batchResults, setBatchResults] = useState<ReviewAnalysisResult[]>([]);
  const [analysisMode, setAnalysisMode] = useState<'single' | 'batch'>("single");

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

  // --- Entity Extraction (simple, creative) ---
  function extractEntities(text: string, category: string) {
    // Simple regex for brands/products (capitalized words, numbers, known brands)
    const brandList = [
      "Apple", "Nike", "Samsung", "Sony", "Amazon", "Adidas", "Microsoft", "Google", "Dell", "HP", "Lenovo", "LG", "Panasonic", "Philips", "Canon", "Bose", "JBL", "Asus", "Acer", "Xiaomi", "Huawei", "Nestle", "Coca-Cola", "Pepsi", "Unilever", "Loreal", "Nivea", "Olay", "Maybelline", "Revlon", "Puma", "Under Armour", "Zara", "H&M", "Uniqlo", "Levi's", "Gucci", "Prada", "Chanel", "Rolex", "Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes", "Audi", "Volkswagen"
    ];
    const entities: ReviewEntity[] = [];
    // Brands
    brandList.forEach((brand) => {
      const idx = text.indexOf(brand);
      if (idx !== -1) {
        entities.push({ text: brand, label: "BRAND", start: idx, end: idx + brand.length });
      }
    });
    // Product (first capitalized phrase)
    const productMatch = text.match(/([A-Z][a-zA-Z0-9]+( [A-Z][a-zA-Z0-9]+){0,2})/);
    if (productMatch) {
      entities.push({ text: productMatch[0], label: "PRODUCT", start: productMatch.index || 0, end: (productMatch.index || 0) + productMatch[0].length });
    }
    // Dates (simple)
    const dateMatch = text.match(/\b(\d{1,2} (days?|weeks?|months?|years?)|today|yesterday|tomorrow)\b/i);
    if (dateMatch) {
      entities.push({ text: dateMatch[0], label: "DATE", start: dateMatch.index || 0, end: (dateMatch.index || 0) + dateMatch[0].length });
    }
    return entities;
  }

  // --- Batch Analysis ---
  const handleBatchAnalysis = async () => {
    if (!selectedProduct && analysisMode === 'single') return;
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    if (analysisMode === 'batch') {
      const reviews = batchInput.split(/\n+/).map((r) => r.trim()).filter(Boolean);
      const results: ReviewAnalysisResult[] = reviews.map((review) => {
        // Try to auto-detect category if not selected
        let category = selectedProduct;
        if (!category) {
          // Guess category by keywords
          if (/shoe|shirt|dress|jean|fashion|wear|clothing|nike|adidas|puma/i.test(review)) category = "clothing";
          else if (/book|novel|author|read|story|textbook/i.test(review)) category = "books";
          else if (/cream|skin|makeup|beauty|health|supplement|lotion/i.test(review)) category = "health-beauty";
          else if (/snack|drink|food|taste|beverage|dining|cooking/i.test(review)) category = "food-beverage";
          else if (/furniture|appliance|garden|tool|decor/i.test(review)) category = "home-garden";
          else category = "electronics";
        }
        const analysis = generateProductSpecificAnalysis(review, category);
        const entities = extractEntities(review, category);
        return { review, ...analysis, entities, category };
      });
      setBatchResults(results);
    }
    setIsAnalyzing(false);
    setIsCompleted(true);
  };

  // --- Summary for Batch ---
  const batchSummary = useMemo(() => {
    if (!batchResults.length) return null;
    const sentimentCounts = { POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0 };
    const aspectFreq: Record<string, number> = {};
    batchResults.forEach((r) => {
      sentimentCounts[r.sentiment.label]++;
      r.aspects.forEach((a: string) => { aspectFreq[a] = (aspectFreq[a] || 0) + 1; });
    });
    return { sentimentCounts, aspectFreq };
  }, [batchResults]);

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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2 mb-2">
              <Button variant={analysisMode === 'single' ? 'default' : 'outline'} onClick={() => setAnalysisMode('single')}>Single Review</Button>
              <Button variant={analysisMode === 'batch' ? 'default' : 'outline'} onClick={() => setAnalysisMode('batch')}>Batch Reviews</Button>
            </div>
            <div className="flex-1" />
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-green-400" />
            {analysisMode === 'single' ? 'Single Review Analysis' : 'Batch Review Analysis'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Select Product Category (optional):</label>
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

          {analysisMode === 'single' ? (
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
          ) : (
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Paste multiple product reviews (one per line):</label>
              <Textarea
                value={batchInput}
                onChange={(e) => setBatchInput(e.target.value)}
                placeholder="Paste or type multiple reviews, each on a new line."
                className="bg-black/30 border-white/20 text-white placeholder-gray-400"
                rows={6}
              />
            </div>
          )}

          <Button
            onClick={analysisMode === 'single' ? async () => {
              setIsAnalyzing(true);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              setIsAnalyzing(false);
              setIsCompleted(true);
            } : handleBatchAnalysis}
            disabled={isAnalyzing || (analysisMode === 'single' ? !inputText.trim() : !batchInput.trim())}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            {isAnalyzing ? "Analyzing..." : analysisMode === 'single' ? "Analyze Product Review" : "Analyze Batch Reviews"}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {isCompleted && analysisMode === 'single' && inputText.trim() && (
        (() => {
          const analysisResults = generateProductSpecificAnalysis(inputText, selectedProduct);
          const entities = extractEntities(inputText, selectedProduct);
          return (
            <div className="space-y-6">
              <Separator className="bg-white/20" />
              <Card className="bg-black/30 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {analysisResults.sentiment.label === 'POSITIVE' ? <ThumbsUp className="h-4 w-4 text-green-400" /> : analysisResults.sentiment.label === 'NEGATIVE' ? <ThumbsDown className="h-4 w-4 text-red-400" /> : <AlertTriangle className="h-4 w-4 text-yellow-400" />}
                    Product-Specific Sentiment Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Overall Sentiment</span>
                      <Badge className={analysisResults.sentiment.label === 'POSITIVE' ? 'bg-green-600' : analysisResults.sentiment.label === 'NEGATIVE' ? 'bg-red-600' : 'bg-yellow-600'}>
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
                          <Badge key={index} variant="outline" className="text-gray-300 border-blue-500">{aspect}</Badge>
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
              <Card className="bg-black/30 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Search className="h-4 w-4 text-blue-400" />
                    Named Entities Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {entities.length === 0 && <div className="text-gray-400">No entities detected.</div>}
                    {entities.map((entity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-900/20 rounded">
                        <div>
                          <span className="font-medium text-blue-300">"{entity.text}"</span>
                          <div className="text-xs text-gray-400">Position: {entity.start}-{entity.end}</div>
                        </div>
                        <Badge className={
                          entity.label === 'PRODUCT' ? 'bg-purple-600' :
                          entity.label === 'BRAND' ? 'bg-blue-600' :
                          entity.label === 'DATE' ? 'bg-green-600' : ''
                        }>
                          {entity.label}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })()
      )}

      {/* Batch Results Section */}
      {isCompleted && analysisMode === 'batch' && batchResults.length > 0 && (
        <div className="space-y-6">
          <Separator className="bg-white/20" />
          {/* Summary */}
          <Card className="bg-black/30 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                Batch Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-6">
                <div>
                  <div className="text-gray-300 font-semibold mb-1">Sentiment Distribution</div>
                  <div className="flex gap-2">
                    <Badge className="bg-green-600">Positive: {batchSummary?.sentimentCounts.POSITIVE}</Badge>
                    <Badge className="bg-red-600">Negative: {batchSummary?.sentimentCounts.NEGATIVE}</Badge>
                    <Badge className="bg-yellow-600">Neutral: {batchSummary?.sentimentCounts.NEUTRAL}</Badge>
                  </div>
                </div>
                <div>
                  <div className="text-gray-300 font-semibold mb-1">Top Aspects</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(batchSummary?.aspectFreq || {})
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([aspect, count]) => (
                        <Badge key={aspect} variant="outline" className="text-gray-300 border-blue-500">{aspect} ({count})</Badge>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Individual Review Results */}
          <div className="space-y-4">
            {batchResults.map((result, idx) => (
              <Card key={idx} className="bg-black/30 border-white/10">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs capitalize">{result.category.replace("-", " & ")}</Badge>
                      <Badge className={result.sentiment.label === 'POSITIVE' ? 'bg-green-600' : result.sentiment.label === 'NEGATIVE' ? 'bg-red-600' : 'bg-yellow-600'}>
                        {result.sentiment.label} ({(result.sentiment.confidence * 100).toFixed(0)}%)
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">{result.review}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <strong className="text-blue-300 text-sm">Product Aspects:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {result.aspects.map((aspect: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">{aspect}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <strong className="text-purple-300 text-sm">Key Insights:</strong>
                        <ul className="mt-1 space-y-0.5">
                          {result.insights.slice(0, 2).map((insight: string, index: number) => (
                            <li key={index} className="text-xs text-gray-400 flex items-start gap-1">
                              <TrendingUp className="h-2 w-2 mt-0.5 text-purple-400" />
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Entities */}
                    <div className="mt-2">
                      <strong className="text-blue-300 text-sm">Entities:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {result.entities.length === 0 && <span className="text-gray-400 text-xs">No entities detected.</span>}
                        {result.entities.map((entity: ReviewEntity, index: number) => (
                          <Badge key={index} className={
                            entity.label === 'PRODUCT' ? 'bg-purple-600' :
                            entity.label === 'BRAND' ? 'bg-blue-600' :
                            entity.label === 'DATE' ? 'bg-green-600' : ''
                          }>
                            {entity.text} ({entity.label})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
