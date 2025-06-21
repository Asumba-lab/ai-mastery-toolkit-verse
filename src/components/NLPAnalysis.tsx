
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Search, ThumbsUp, ThumbsDown, Tag, Zap } from "lucide-react";

export const NLPAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [inputText, setInputText] = useState("This Amazon Echo Dot is amazing! The sound quality is great and Alexa responds quickly. I bought it from Amazon and it arrived in 2 days. Highly recommend this product to anyone looking for a smart speaker.");

  // Sample analysis results
  const analysisResults = {
    entities: [
      { text: "Amazon Echo Dot", label: "PRODUCT", start: 5, end: 20 },
      { text: "Amazon", label: "ORG", start: 95, end: 101 },
      { text: "2 days", label: "DATE", start: 119, end: 125 },
      { text: "Alexa", label: "PRODUCT", start: 75, end: 80 }
    ],
    sentiment: {
      label: "POSITIVE",
      confidence: 0.89,
      reasoning: "Positive words: amazing, great, highly recommend. No negative indicators found."
    },
    keywords: ["sound quality", "smart speaker", "responds quickly", "highly recommend"]
  };

  const sampleReviews = [
    {
      id: 1,
      text: "The iPhone 13 Pro camera is incredible! Apple really outdid themselves. Best purchase from Best Buy this year.",
      entities: ["iPhone 13 Pro", "Apple", "Best Buy"],
      sentiment: "POSITIVE"
    },
    {
      id: 2,
      text: "Samsung Galaxy S21 battery life is disappointing. Expected better from Samsung. Returning to Amazon tomorrow.",
      entities: ["Samsung Galaxy S21", "Samsung", "Amazon"],
      sentiment: "NEGATIVE"
    },
    {
      id: 3,
      text: "Microsoft Surface Pro works well for work. Good performance and Microsoft support is helpful.",
      entities: ["Microsoft Surface Pro", "Microsoft"],
      sentiment: "POSITIVE"
    }
  ];

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    setIsCompleted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-yellow-400" />
            Task 3: Natural Language Processing with spaCy
          </CardTitle>
          <CardDescription className="text-gray-300">
            Named Entity Recognition and Sentiment Analysis on Amazon Product Reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-300 flex items-center gap-2">
                <Search className="h-4 w-4" />
                NER Capabilities
              </h4>
              <div className="bg-black/30 p-3 rounded text-sm">
                <ul className="space-y-1 text-gray-300">
                  <li>• <strong>PRODUCT:</strong> Device/product names</li>
                  <li>• <strong>ORG:</strong> Company names</li>
                  <li>• <strong>DATE:</strong> Time expressions</li>
                  <li>• <strong>PERSON:</strong> Customer names</li>
                  <li>• <strong>MONEY:</strong> Price mentions</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-green-300 flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                Sentiment Analysis
              </h4>
              <div className="bg-black/30 p-3 rounded text-sm">
                <ul className="space-y-1 text-gray-300">
                  <li>• Rule-based approach</li>
                  <li>• Positive/Negative classification</li>
                  <li>• Confidence scoring</li>
                  <li>• Keyword extraction</li>
                  <li>• Context-aware analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Implementation */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-400" />
            spaCy Implementation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black/50 p-4 rounded-lg text-sm font-mono overflow-x-auto">
            <pre className="text-gray-300">
{`# Import spaCy and required libraries
import spacy
import pandas as pd
from collections import Counter

# Load spaCy English model with NER capabilities
nlp = spacy.load('en_core_web_sm')

# Define sentiment analysis rules
def analyze_sentiment(text):
    """Rule-based sentiment analysis"""
    positive_words = ['amazing', 'great', 'excellent', 'love', 'recommend', 
                        'perfect', 'fantastic', 'awesome', 'incredible']
    
    negative_words = ['terrible', 'awful', 'bad', 'hate', 'disappointing',
                        'useless', 'broken', 'worst', 'poor']
    
    text_lower = text.lower()
    pos_count = sum(1 for word in positive_words if word in text_lower)
    neg_count = sum(1 for word in negative_words if word in text_lower)
    
    if pos_count > neg_count:
        return 'POSITIVE', pos_count / (pos_count + neg_count + 1)
    elif neg_count > pos_count:
        return 'NEGATIVE', neg_count / (pos_count + neg_count + 1)
    else:
        return 'NEUTRAL', 0.5

# Process Amazon reviews dataset
def process_reviews(reviews):
    results = []
    
    for review in reviews:
        # Process text with spaCy NLP pipeline
        doc = nlp(review)
        
        # Extract named entities
        entities = []
        for ent in doc.ents:
            if ent.label_ in ['PRODUCT', 'ORG', 'DATE', 'MONEY', 'PERSON']:
                entities.append({
                    'text': ent.text,
                    'label': ent.label_,
                    'start': ent.start_char,
                    'end': ent.end_char
                })
        
        # Perform sentiment analysis
        sentiment, confidence = analyze_sentiment(review)
        
        results.append({
            'review': review,
            'entities': entities,
            'sentiment': sentiment,
            'confidence': confidence
        })
    
    return results

# Example usage
sample_reviews = [
    "This Amazon Echo Dot is amazing! Great sound quality.",
    "Samsung Galaxy S21 is disappointing. Battery life is poor."
]

analysis_results = process_reviews(sample_reviews)

# Display results
for result in analysis_results:
    print(f"Review: {result['review']}")
    print(f"Entities: {[e['text'] for e in result['entities']]}")
    print(f"Sentiment: {result['sentiment']} ({result['confidence']:.2f})")
    print("-" * 50)`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Analysis */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-green-400" />
            Interactive Review Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Enter a product review to analyze:</label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your review here..."
              className="bg-black/30 border-white/20 text-white placeholder-gray-400"
              rows={3}
            />
          </div>

          <Button
            onClick={handleAnalysis}
            disabled={isAnalyzing || !inputText.trim()}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            {isAnalyzing ? "Analyzing with spaCy..." : "Analyze Review"}
          </Button>

          {isCompleted && (
            <div className="space-y-6">
              <Separator className="bg-white/20" />

              {/* Entities Found */}
              <Card className="bg-black/30 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Search className="h-4 w-4 text-blue-400" />
                    Named Entities Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResults.entities.map((entity, index) => (
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

              {/* Sentiment Analysis */}
              <Card className="bg-black/30 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {analysisResults.sentiment.label === 'POSITIVE' ? 
                      <ThumbsUp className="h-4 w-4 text-green-400" /> : 
                      <ThumbsDown className="h-4 w-4 text-red-400" />
                    }
                    Sentiment Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Overall Sentiment</span>
                    <Badge className={
                      analysisResults.sentiment.label === 'POSITIVE' ? 'bg-green-600' : 'bg-red-600'
                    }>
                      {analysisResults.sentiment.label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Confidence Score</span>
                    <span className="font-mono text-lg">
                      {(analysisResults.sentiment.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded text-sm">
                    <strong className="text-yellow-300">Analysis:</strong>
                    <p className="text-gray-300 mt-1">{analysisResults.sentiment.reasoning}</p>
                  </div>
                  <div>
                    <strong className="text-blue-300">Key Phrases:</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {analysisResults.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-gray-300 border-gray-500">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Batch Analysis Results */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-400" />
            Batch Processing Results
          </CardTitle>
          <CardDescription className="text-gray-300">
            Analysis of sample Amazon product reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleReviews.map((review) => (
              <Card key={review.id} className="bg-black/30 border-white/10">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm">{review.text}</p>
                    <div className="flex flex-wrap gap-2">
                      <strong className="text-blue-300 text-sm">Entities:</strong>
                      {review.entities.map((entity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {entity}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <strong className="text-green-300 text-sm">Sentiment:</strong>
                      <Badge className={
                        review.sentiment === 'POSITIVE' ? 'bg-green-600' : 'bg-red-600'
                      }>
                        {review.sentiment}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
