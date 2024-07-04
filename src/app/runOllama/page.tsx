'use client'

import ollama, { Message } from 'ollama'
import { FormEvent } from 'react'
import { z } from 'zod'
import { useState } from 'react'
  

export default function runOllama() { 
  const [response, SetResponse] = useState('');
  

  async function onSubmit(event:any) {  

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await fetch('/api/runOllama', {
      method: 'POST',
      body: formData,
    });

    const result:any = res.text();
    
    // const ifResultNull:any = 'Loading...'
    // if (result == null) {
    //   SetResponse(ifResultNull)
    // } else {

    // }

    SetResponse(result);

    console.log('######### Response: ', response);
    
  }
  return (
    <form onSubmit={onSubmit}>

      <input type="text" defaultValue='Why is the sky blue?' name='text-input'/>
      <button type='submit'>Enter</button>


      {/* {response? (
        <h3>{response}</h3> )  : ( <h3>Loading...</h3> ) } */}

      
    </form>

  )

}
