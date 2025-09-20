import type { AnalysisResult } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TrustMeter from './trust-meter';
import { Separator } from './ui/separator';
import { Lightbulb, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

const getVerdictInfo = (verdict: string) => {
  const lowerVerdict = verdict.toLowerCase();
  switch (lowerVerdict) {
    case 'real':
      return {
        icon: <CheckCircle className="mr-2 h-5 w-5 text-green-500" />,
        variant: 'secondary',
        className: 'border-green-500/50 text-green-700 dark:text-green-400',
      };
    case 'fake':
       return {
        icon: <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />,
        variant: 'destructive',
        className: '',
      };
    default:
       return {
        icon: <HelpCircle className="mr-2 h-5 w-5 text-yellow-500" />,
        variant: 'secondary',
        className: 'border-yellow-500/50 text-yellow-700 dark:text-yellow-500',
      };
  }
}

export default function AnalysisResults({ result }: { result: AnalysisResult }) {
  const { misinformationReport, verifiedContext } = result;
  const verdictInfo = getVerdictInfo(misinformationReport.verdict);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Trust Score</CardTitle>
            <CardDescription>An AI-generated score of the content's trustworthiness.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
             <TrustMeter score={misinformationReport.trustworthinessScore} />
             <div className="flex items-center">
                <Badge variant={verdictInfo.variant} className={verdictInfo.className}>
                    {verdictInfo.icon}
                    {misinformationReport.verdict}
                </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                    Analysis Summary
                </CardTitle>
                <CardDescription>The AI's reasoning behind the verdict.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm leading-relaxed">{misinformationReport.reasoning}</p>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Manipulation Techniques</CardTitle>
          <CardDescription>Deceptive methods identified in the content.</CardDescription>
        </CardHeader>
        <CardContent>
          {misinformationReport.manipulationTechniques.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {misinformationReport.manipulationTechniques.map((technique, index) => (
                <Badge key={index} variant="secondary">
                  {technique}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No specific manipulation techniques were identified.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Context Rebuilder</CardTitle>
          <CardDescription>Tracing the content's origin to provide verified context.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <h4 className="font-semibold">Original Source</h4>
                <p className="text-sm text-muted-foreground break-all">{verifiedContext.originalSource || 'Could not be determined.'}</p>
            </div>
            <Separator />
            <div>
                <h4 className="font-semibold">Verified Context</h4>
                <p className="text-sm text-muted-foreground">{verifiedContext.context || 'No additional context found.'}</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
