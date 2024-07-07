import { NextRequest, NextResponse } from "next/server";
import ollama from 'ollama'

export async function POST(req: NextRequest) {
    const data = await req.text();

    console.log("This is the req.body:", data)

    const response = await ollama.chat({
      model: 'llama2',
      messages: [{role: 'user', content: data}],
    })

    // console.log(response.message.content);

    return NextResponse.json({'response': response.message.content});

}