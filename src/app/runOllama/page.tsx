import ollama, { Message } from 'ollama'
import { FormEvent } from 'react'


export default function runOllama() { 

  async function onSubmit(event: FormEvent<HTMLFormElement>) {  

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log(formData)

    // const response = await ollama.chat({
    //   model: 'llama2',
    //   messages: [{role: 'user', content: formData}],
    // })
    
  }
  return (
    <form onSubmit={onSubmit} className='justify-copntent-center' >
      <textarea placeholder='Start a conversation' name='input-text'></textarea>
      <button type='submit'>Enter</button>
    </form>

  )

}
