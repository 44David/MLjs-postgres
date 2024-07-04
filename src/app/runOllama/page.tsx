'use client'

import ollama, { Message } from 'ollama'
import { FormEvent, useEffect } from 'react'
import { z } from 'zod'
import { useState } from 'react'
  

export default function runOllama() { 
  const [response, setResponse] = useState('');
  

  async function onSubmit(event:any) {  

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await fetch('/api/runOllama', {
      method: 'POST',
      body: formData,
    });

    const result:any = await res.text();

    setResponse(result);

    // console.log('######### Response: ', response);
    
  }
  return (
    <form onSubmit={onSubmit}>

      <input type="text" defaultValue='Why is the sky blue?' name='text-input'/>
      <button type='submit'>Enter</button>
      <h2>{response}</h2>



      
    </form>

  )

}
