import { NextRequest, NextResponse } from "next/server";
import ollama from 'ollama'

export async function POST(req: NextRequest) {
    const data = req.body

    const message:any = [{ role: 'user', content: data}]

    const response = await ollama.chat({
      model: 'llama2',
      messages: message,
    })

    return NextResponse.json({Response: "hello"})

}