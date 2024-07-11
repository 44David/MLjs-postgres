import { NextRequest, NextResponse } from "next/server";
import ollama from 'ollama'
import nim from '@api/nim';

export async function POST(req: NextRequest) {

    const userReq = await req.text();

    console.log("This is the req.body:", userReq)

    const response = await ollama.chat({
      model: 'llama2',
      messages: [{role: 'user', content: userReq}],
    })

    // console.log(response.message.content);
    
    // function nvidiaNimAPI() {
    //   nim.create_chat_completion_v1_chat_completions_post({
    //   model: 'google/gemma-7b',
    //   max_tokens: 1024,
    //   stream: false,
    //   temperature: 0.3,
    //   top_p: 1,
    //   stop: null,
    //   frequency_penalty: 0,
    //   presence_penalty: 0,
    //   seed: null,
    //   messages: userReq,
    // })
    //   .then(({ data }) => console.log(data))
    //   .catch(err => console.error(err));
    // }


    return NextResponse.json({'response': response.message.content});

}