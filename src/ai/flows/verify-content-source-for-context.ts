'use server';

/**
 * @fileOverview This flow traces the original source of submitted content to provide verified context.
 *
 * - verifyContentSourceForContext - A function that traces the source of content.
 * - VerifyContentSourceForContextInput - The input type for the verifyContentSourceForContext function.
 * - VerifyContentSourceForContextOutput - The return type for the verifyContentSourceForContext function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyContentSourceForContextInputSchema = z.object({
  content: z
    .string()
    .describe('The content to verify, could be text, link, image data URI, or short video data URI.'),
});
export type VerifyContentSourceForContextInput = z.infer<
  typeof VerifyContentSourceForContextInputSchema
>;

const VerifyContentSourceForContextOutputSchema = z.object({
  originalSource: z
    .string()
    .describe('The original source of the content, if found.'),
  context: z
    .string()
    .describe(
      'The verified context of the content, which can be used to debunk manipulated narratives.'
    ),
});
export type VerifyContentSourceForContextOutput = z.infer<
  typeof VerifyContentSourceForContextOutputSchema
>;

export async function verifyContentSourceForContext(
  input: VerifyContentSourceForContextInput
): Promise<VerifyContentSourceForContextOutput> {
  return verifyContentSourceForContextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyContentSourceForContextPrompt',
  input: {schema: VerifyContentSourceForContextInputSchema},
  output: {schema: VerifyContentSourceForContextOutputSchema},
  prompt: `You are an expert in identifying the original sources of content and providing verified context.

  Given the following content, trace its origin and provide context that can help debunk potential manipulations.

  Content: {{{content}}}

  If the content is an image or video, perform reverse image search to find the original source.
  If the content is text, identify potential quotes and search for their original source.

  Provide the original source and context in the output.`,
});

const verifyContentSourceForContextFlow = ai.defineFlow(
  {
    name: 'verifyContentSourceForContextFlow',
    inputSchema: VerifyContentSourceForContextInputSchema,
    outputSchema: VerifyContentSourceForContextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
