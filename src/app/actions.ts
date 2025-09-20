'use server';

import { analyzeContent } from '@/ai/flows/analyze-content-for-misinformation';
import { verifyContentSourceForContext } from '@/ai/flows/verify-content-source-for-context';
import type { AnalysisResult } from '@/lib/types';

export async function performAnalysis(
  content: string
): Promise<{ data: AnalysisResult | null; error: string | null }> {
  try {
    if (!content.trim()) {
      return { data: null, error: 'Content cannot be empty.' };
    }

    const [analysisResult, verificationResult] = await Promise.all([
      analyzeContent({ content }),
      verifyContentSourceForContext({ content }),
    ]);

    if (!analysisResult || !verificationResult) {
      throw new Error('AI analysis failed to return a result.');
    }

    const combinedResult: AnalysisResult = {
      ...analysisResult,
      ...verificationResult,
    };
    
    return { data: combinedResult, error: null };
  } catch (error) {
    console.error('Error performing analysis:', error);
    // In a real app, you might want to log this error to a monitoring service
    return { data: null, error: 'An unexpected error occurred during analysis. Please try again later.' };
  }
}
