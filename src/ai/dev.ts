import { config } from 'dotenv';
config();

import '@/ai/flows/verify-content-source-for-context.ts';
import '@/ai/flows/analyze-content-for-misinformation.ts';