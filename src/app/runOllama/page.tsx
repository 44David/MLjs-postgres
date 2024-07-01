import ollama from 'ollama'

export default async function runOllama() { 
  getResponse()
}

async function getResponse() {
  const response = await ollama.chat({
    model: 'llama2', 
    messages: [{ role: 'user', content: 'Why is the sky blue?' }],
  })

  console.log(response.message.content)
}