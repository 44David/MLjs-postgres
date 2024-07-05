'use client'

import ollama, { Message } from 'ollama'
import { FormEvent, useEffect } from 'react'
import { z } from 'zod'
import { useState } from 'react'
  

export default function runOllama() { 
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  

  async function onSubmit(event:any) {  

    event.preventDefault();

    // const formData = new FormData(event.currentTarget);

    console.log("e.currentTarget: ", userInput)

    const res = await fetch('/api/runOllama', {
      method: 'POST',
      body: userInput,
    });

    const result:any = await res.text();

    setResponse(result);

    // console.log('######### Response: ', response);
    
  }
  return (
    <form onSubmit={onSubmit}>

      <input 
      type="text" 
      name='textinput' 
      value={userInput}
      onChange={(e) => {
        setUserInput(e.target.value)
      }}
      />


      <button type='submit'>Enter</button>
      <h2>{response}</h2>



      
    </form>

  )

}
