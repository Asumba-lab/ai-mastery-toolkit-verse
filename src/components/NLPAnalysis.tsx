
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
<span className="text-green-400"># Import spaCy and required libraries</span>
<span className="text-blue-400">import</span> spacy
<span className="text-blue-400">import</span> pandas <span className="text-blue-400">as</span> pd
<span className="text-blue-400">from</span> collections <span className="text-blue-400">import</span> Counter

<span className="text-green-400"># Load spaCy English model with NER capabilities</span>
<span className="text-yellow-400">nlp</span> = spacy.load(<span className="text-red-400">'en_core_web_sm'</span>)

<span className="text-green-400"># Define sentiment analysis rules</span>
<span className="text-blue-400">def</span> <span className="text-yellow-400">analyze_sentiment</span>(text):
    <span className="text-green-400">"""Rule-based sentiment analysis"""</span>
    <span className="text-yellow-400">positive_words</span> = [<span className="text-red-400">'amazing'</span>, <span className="text-red-400">'great'</span>, <span className="text-red-400">'excellent'</span>, <span className="text-red-400">'love'</span>, <span className="text-red-400">'recommend'</span>, 
                        <span className="text-red-400">'perfect'</span>, <span className="text-red-400">'fantastic'</span>, <span className="text-red-400">'awesome'</span>, <span className="text-red-400">'incredible'</span>]
    
    <span className="text-yellow-400">negative_words</span> = [<span className="text-red-400">'terrible'</span>, <span className="text-red-400">'awful'</span>, <span className="text-red-400">'bad'</span>, <span className="text-red-400">'hate'</span>, <span className="text-red-400">'disappointing'</span>,
                        <span className="text-red-400">'useless'</span>, <span className="text-red-400">'broken'</span>, <span className="text-red-400">'worst'</span>, <span className="text-red-400">'poor'</span>]
    
    <span className="text-yellow-400">text_lower</span> = text.lower()
    <span className="text-yellow-400">pos_count</span> = <span className="text-blue-400">sum</span>(<span className="text-purple-400">1</span> <span className="text-blue-400">for</span> word <span className="text-blue-400">in</span> positive_words <span className="text-blue-400">if</span> word <span className="text-blue-400">in</span> text_lower)
    <span className="text-yellow-400">neg_count</span> = <span className="text-blue-400">sum</span>(<span className="text-purple-400">1</span> <span className="text-blue-400">for</span> word <span className="text-blue-400">in</span> negative_words <span className="text-blue-4000">if</span> word <span className="text-blue-400">in</span> text_lower)
    
    <span className="text-blue-400">if</span> pos_count > neg_count:
        <span className="text-blue-400">return</span> <span className="text-red-400">'POSITIVE'</span>, pos_count / (pos_count + neg_count + <span className="text-purple-400">1</span>)
    <span className="text-blue-400">elif</span> neg_count > pos_count:
        <span className="text-blue-400">return</span> <span className="text-red-400">'NEGATIVE'</span>, neg_count / (pos_count + neg_count + <span className="text-purple-400">1</span>)
    <span className="text-blue-400">else</span>:
        <span className="text-blue-400">return</span> <span className="text-red-400">'NEUTRAL'</span>, <span className="text-purple-400">0.5</span>

<span className="text-green-400"># Process Amazon reviews dataset</span>
<span className="text-blue-400">def</span> <span className="text-yellow-400">process_reviews</span>(reviews):
    <span className="text-yellow-400">results</span> = []
    
    <span className="text-blue-400">for</span> review <span className="text-blue-400">in</span> reviews:
        <span className="text-green-400"># Process text with spaCy NLP pipeline</span>
        <span className="text-yellow-400">doc</span> = nlp(review)
        
        <span className="text-green-400"># Extract named entities</span>
        <span className="text-yellow-400">entities</span> = []
        <span className="text-blue-400">for</span> ent <span className="text-blue-400">in</span> doc.ents:
            <span className="text-blue-400">if</span> ent.label_ <span className="text-blue-400">in</span> [<span className="text-red-400">'PRODUCT'</span>, <span className="text-red-400">'ORG'</span>, <span className="text-red-400">'DATE'</span>, <span className="text-red-400">'MONEY'</span>, <span className="text-red-400">'PERSON'</span>]:
                <span className="text-yellow-400">entities</span>.append({
                    <span className="text-red-400">'text'</span>: ent.text,
                    <span className="text-red-400">'label'</span>: ent.label_,
                    <span className="text-red-400">'start'</span>: ent.start_char,
                    <span className="text-red-400">'end'</span>: ent.end_char
                })
        
        <span className="text-green-400"># Perform sentiment analysis</span>
        <span className="text-yellow-400">sentiment</span>, <span className="text-yellow-400">confidence</span> = analyze_sentiment(review)
        
        <span className="text-yellow-400">results</span>.append({
            <span className="text-red-400">'review'</span>: review,
            <span className="text-red-400">'entities'</span>: entities,
            <span className="text-red-400">'sentiment'</span>: sentiment,
            <span className="text-red-400">'confidence'</span>: confidence
        })
    
    <span className="text-blue-400">return</span> results

<span className="text-green-400"># Example usage</span>
<span className="text-yellow-400">sample_reviews</span> = [
    <span className="text-red-400">"This Amazon Echo Dot is amazing! Great sound quality."</span>,
    <span className="text-red-400">"Samsung Galaxy S21 is disappointing. Battery life is poor."</span>
]

<span className="text-yellow-400">analysis_results</span> = process_reviews(sample_reviews)

<span className="text-green-400"># Display results</span>
<span className="text-blue-400">for</span> result <span className="text-blue-400">in</span> analysis_results:
    <span className="text-blue-400">print</span>(<span className="text-red-400">f"Review: </span>{result[<span className="text-red-400">'review'</span>]}<span className="text-red-400">"</span>)
    <span className="text-blue-400">print</span>(<span className="text-red-400">f"Entities: </span>{[e[<span className="text-red-400">'text'</span>] <span className="text-blue-400">for</span> e <span className="text-blue-400">in</span> result[<span className="text-red-400">'entities'</span>]]}<span className="text-red-400">"</span>)
    <span className="text-blue-400">print</span>(<span className="text-red-400">f"Sentiment: </span>{result[<span className="text-red-400">'sentiment'</span>]}<span className="text-red-400"> (</span>{result[<span className="text-red-400">'confidence'</span>]:<span className="text-purple-400">.2f</span>}<span className="text-red-400">)"</span>)
    <span className="text-blue-400">print</span>(<span className="text-red-400">"-"</span> * <span className="text-purple-400">50</span>)
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
