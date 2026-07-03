import { streamText, tool } from 'ai';
import { z } from 'zod';
import { mistral } from '@ai-sdk/mistral';
import { run } from '../../lib/run';
import { saveRawChunks } from '../../lib/save-raw-chunks';

run(async () => {
  const result = streamText({
    model: mistral('mistral-small-latest'),
    prompt: 'What is the weather in Paris, France and London, UK?',
    tools: {
      getWeather: tool({
        description: 'Get the current weather for a location',
        inputSchema: z.object({
          location: z
            .string()
            .describe('The city and state, e.g. San Francisco, CA'),
        }),
        execute: async ({ location }: { location: string }) => {
          return `Weather in ${location}: 72°F, sunny`;
        },
      }),
    },
    includeRawChunks: true,
  });

  await saveRawChunks({ result, filename: 'mistral-tool-call-capture' });
});
