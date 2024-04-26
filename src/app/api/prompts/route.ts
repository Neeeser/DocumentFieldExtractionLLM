// src/app/api/prompts/sys.ts

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || 'sys_prompt_instruct.txt';

  const sysPromptFile = fs.readFileSync(
    path.join(process.cwd(), 'src', 'app', 'prompts', filename),
    'utf-8'
  );

  return NextResponse.json({ sysPromptFile });
}
