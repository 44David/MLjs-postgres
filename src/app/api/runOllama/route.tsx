import { NextRequest, NextResponse } from "next/server";
import ollama from 'ollama'

export async function POST(req: NextRequest) {
    const data = req.body

    const response = await ollama.chat({
      model: 'llama2',
      messages: [{role: 'user', content: data}],
    })

    return NextResponse.json({message: "API reached"})