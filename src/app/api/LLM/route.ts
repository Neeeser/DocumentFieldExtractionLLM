// src/app/api/LLM/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI();

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { prompt } = body;
    console.log(prompt);

    const userPromptFile = fs.readFileSync(path.join(process.cwd(), 'src/app', 'prompts', 'user_prompt.txt'), 'utf-8');
    const sysPromptFile = fs.readFileSync(path.join(process.cwd(), 'src/app', 'prompts', 'sys_prompt_instruct.txt'), 'utf-8');

    const userPrompt = `<document>${prompt}<document>`;

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: sysPromptFile },
                { role: 'user', content: userPrompt },
            ],
            model: 'gpt-4-turbo',
            temperature: 0.1
        });

        const generatedOutput = completion.choices[0].message.content;
        const parsedOutput = parseLLMOutput(generatedOutput || ''); // Add null check

        return NextResponse.json(parsedOutput);
    } catch (error) {
        console.error('Failed to fetch or parse JSON:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

function parseLLMOutput(output: string): Record<string, string | null> {
    try {
      const parsedOutput: Record<string, string | null> = JSON.parse(output);
      console.log(parsedOutput);
      return parsedOutput;
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return {};
    }
  }