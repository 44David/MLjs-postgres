'use client'
import ollama, { Message } from 'ollama';
import { z } from 'zod';
import { useState } from 'react';
import { db } from "@/server/db";
import Link from 'next/link';

export default function Prompts() { 
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  async function onSubmit(event:any) {  

    event.preventDefault();

    // const formData = new FormData(event.currentTarget);

    console.log("e.currentTarget: ", userInput)

    const res = await fetch('/api/prompts', {
      method: 'POST',
      body: userInput,
    });

    const result:any = await res.text();

    setResponse(result);

    
  }
  return (
    <>
      
      <div className="float-left border-r-2 h-screen w-1/6 pr-10">
        User conversations here

        <p className="fixed bottom-0 text-xs">Performance varies <br></br>greatly on local hardware</p>
      </div>

      <form>
        
        <input 
        className='border-4 border-black fixed bottom-0 w-full p-5 rounded-full'
        placeholder='Start chatting'
        type="text" 
        name='textinput' 
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value)
        }}
        />
        <h2>{response}</h2>
      </form>
    
    </>
  )

  // async function FetchModelData() {

  //   const getServerSideProps = (async () => {

  //   })
  //   const modelsInfo = await db.query.models.findMany();

  //   return (

  //     modelsInfo.map(modelInfo => (

  //     <div className="outline gap-2">
  //       <Link href={`#`}>
  //         {modelInfo.model_name}
  //       </Link>
  //     </div>


  //     ))

  //   )
  // }

}

