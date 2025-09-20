// Use server directive.
'use server';

/**
 * @fileOverview Analyzes content for potential misinformation.
 *
 * - analyzeContent - Analyzes the content and returns a report.
 * - AnalyzeContentInput - Input for the analyzeContent function.
 * - AnalyzeContentOutput - Output of the analyzeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContentInputSchema = z.object({
  content: z.string().describe('The content to analyze, either text or a URL.'),
});
export type AnalyzeContentInput = z.infer<typeof AnalyzeContentInputSchema>;

const AnalyzeContentOutputSchema = z.object({
  misinformationReport: z.object({
    verdict: z.string().describe('The verdict of the analysis (real/fake/undetermined).'),
    trustworthinessScore: z.number().describe('Trustworthiness score (0-100).'),
    reasoning: z.string().describe('Explanation of the verdict.'),
    manipulationTechniques: z.array(z.string()).describe('List of manipulation techniques used.'),
    originalSource: z.string().optional().describe('The original source of the content, if found.'),
  }).describe('Report containing misinformation analysis results.'),
});
export type AnalyzeContentOutput = z.infer<typeof AnalyzeContentOutputSchema>;

export async function analyzeContent(input: AnalyzeContentInput): Promise<AnalyzeContentOutput> {
  return analyzeContentFlow(input);
}

const analyzeContentPrompt = ai.definePrompt({
  name: 'analyzeContentPrompt',
  input: {schema: AnalyzeContentInputSchema},
  output: {schema: AnalyzeContentOutputSchema},
  prompt: `You are an AI-powered misinformation detection system.

  Analyze the following content for potential misinformation, determine its trustworthiness, and explain your reasoning.

  Content: {{{content}}}

  Specifically, you must return a verdict (real/fake/undetermined), a trustworthiness score (0-100), an explanation of the verdict, a list of manipulation techniques used, and the original source of the content if found.

  Return your analysis in JSON format.
  `,
});

const analyzeContentFlow = ai.defineFlow(
  {
    name: 'analyzeContentFlow',
    inputSchema: AnalyzeContentInputSchema,
    outputSchema: AnalyzeContentOutputSchema,
  },
  async input => {
    const {output} = await analyzeContentPrompt(input);
    return output!;
  }
);
