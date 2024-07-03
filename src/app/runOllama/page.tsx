'use client'

import ollama, { Message } from 'ollama'
import { FormEvent } from 'react'
import { z } from 'zod'
  

export default function runOllama() { 

  async function onSubmit(event:any) {  

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/runOllama', {
      method: 'POST',
      body: formData,
    })


    // const response = await ollama.chat({
    //   model: 'llama2',
    //   messages: [{role: 'user', content: formData}],
    // })
    
  }
  return (
    <form onSubmit={onSubmit}>
      {/* <textarea placeholder='Start a conversation' name='input-text'></textarea> */}

      <input type="text" name='text-input'/>
      <button type='submit'>Enter</button>
    </form>

  )

}
