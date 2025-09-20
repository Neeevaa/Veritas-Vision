'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { performAnalysis } from '@/app/actions';
import type { AnalysisResult } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalysisResults from './analysis-results';
import { Card, CardContent } from './ui/card';

const formSchema = z.object({
  inputType: z.enum(['text', 'link']),
  text: z.string(),
  link: z.string(),
}).refine(data => {
    if (data.inputType === 'text') {
        return data.text.trim().length > 0;
    }
    if (data.inputType === 'link') {
        return data.link.trim().length > 0 && z.string().url().safeParse(data.link).success;
    }
    return false;
}, {
    message: 'Please enter valid content to analyze.',
    path: ['text'], // This path will be dynamically adjusted in the component
});

type FormValues = z.infer<typeof formSchema>;

export default function AnalysisForm() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: (values, context, options) => {
        if (values.inputType === 'link') {
            const linkResult = z.string().url({ message: 'Please enter a valid URL.' }).safeParse(values.link);
            if (!linkResult.success) {
                return {
                    values: {},
                    errors: { link: { type: 'manual', message: 'Please enter a valid URL.' } },
                };
            }
        }
        return zodResolver(formSchema)(values, context, options);
    },
    defaultValues: {
      inputType: 'text',
      text: '',
      link: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setAnalysisResult(null);

    const contentToAnalyze = values.inputType === 'text' ? values.text : values.link;

    const { data, error } = await performAnalysis(contentToAnalyze);

    setIsLoading(false);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: error,
      });
    } else if (data) {
      setAnalysisResult(data);
    }
  }
  
  const inputType = form.watch('inputType');

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs
              defaultValue="text"
              className="w-full"
              onValueChange={(value) => form.setValue('inputType', value as 'text' | 'link')}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">Paste Text</TabsTrigger>
                <TabsTrigger value="link">Submit Link</TabsTrigger>
              </TabsList>
              <TabsContent value="text" className="mt-4">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Text to analyze</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste a news article, social media post, or any other text here..."
                          className="min-h-[150px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      {inputType === 'text' && <FormMessage />}
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="link" className="mt-4">
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Link to analyze</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/article" {...field} />
                      </FormControl>
                       {inputType === 'link' && <FormMessage />}
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Content'
              )}
            </Button>
          </form>
        </Form>
        
        {isLoading && (
           <div className="mt-8 text-center">
             <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
             <p className="mt-2 text-muted-foreground">Running AI analysis... this may take a moment.</p>
           </div>
        )}

        {analysisResult && (
          <div className="mt-8">
            <AnalysisResults result={analysisResult} />
            <div className="mt-8 flex flex-col items-center justify-center space-y-2 rounded-lg border bg-card p-4">
              <p className="text-sm font-medium">Was this analysis helpful?</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon"><ThumbsUp className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><ThumbsDown className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
