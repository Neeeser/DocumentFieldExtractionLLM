import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI();

export async function POST(request: NextRequest) {
  const {
    contractType,
    clientName,
    contractorName,
    projectDescription,
    paymentTerms,
    startDate,
    endDate,
    clauses,
  } = await request.json();

  const sysPromptFile = fs.readFileSync(path.join(process.cwd(), 'src/app', 'prompts', 'Generate_contract_sys_prompt_instruct.txt'), 'utf-8');

  const userPrompt = `
    <document>
      Contract Type: ${contractType}
      Client Name: ${clientName}
      Contractor Name: ${contractorName}
      Project Description: ${projectDescription}
      Payment Terms: ${paymentTerms}
      Start Date: ${startDate}
      End Date: ${endDate}
      Clauses:
      ${clauses.map((clause: any) => `
        - ${clause.label}: ${clause.content}
      `).join('')}
    </document>
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: sysPromptFile },
        { role: 'user', content: userPrompt },
      ],
      model: 'gpt-4-turbo',
      temperature: 0.8
    });

    const generatedOutput = completion.choices[0].message.content;
    console.log(generatedOutput);
    return new NextResponse(generatedOutput, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('Failed to generate contract:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
