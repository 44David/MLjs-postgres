'use client'

import ollama, { Message } from 'ollama'
import { FormEvent } from 'react'


export default function runOllama() { 

  async function onSubmit(event: FormEvent<HTMLFormElement>) {  

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/runOllama', {
      method: 'POST',
      body: formData,
    })

    const data = await response

    console.log(data)


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
