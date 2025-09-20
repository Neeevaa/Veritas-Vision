import type { AnalyzeContentOutput } from '@/ai/flows/analyze-content-for-misinformation';
import type { VerifyContentSourceForContextOutput } from '@/ai/flows/verify-content-source-for-context';

export type AnalysisResult = AnalyzeContentOutput & VerifyContentSourceForContextOutput;
