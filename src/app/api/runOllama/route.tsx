import { NextRequest, NextResponse } from "next/server";
import ollama from 'ollama'

export async function POST(req: NextRequest) {
    const data = req.body

    //const message:any = [{ role: 'user', content: data}]

    const response = await ollama.chat({
      model: 'llama2',
      messages: [{role: 'user', content: 'Name some fruits!'}],
    })

    // console.log(response.message.content);

    return NextResponse.json({'response': response.message.content});

}