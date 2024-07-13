import { NextRequest, NextResponse } from "next/server";
import ollama from 'ollama'
import nim from '@api/nim';
import axios from 'axios'

export async function POST(req: NextRequest) {

    const { userInput, instanceModel } = await req.json()


    console.log("This is the user request:", userInput)
    console.log("This is the model chosen: ", instanceModel)

    try {
      const getOllamaStatus = await axios.get("http://127.0.0.1:11434/")
      console.log(getOllamaStatus.data)

      const response = await ollama.chat({
        model: instanceModel,
        messages: [{role: 'user', content: userInput}],
      })

      return NextResponse.json({'response': response.message.content}, {'status': 200});


    } catch (error) {
      console.log("THIS WAS THE ERROR: ", error)

      return NextResponse.json({'response': 'An error occurred when connecting to Ollama'}, 
        {
          status: 500,
        }
      )

    }
   
    
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

    
}