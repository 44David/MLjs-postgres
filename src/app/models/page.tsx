import ollama from 'ollama'

export default function Models() {

    console.log(ollama.list())
    return (
        <h1>Select a model</h1>
        
    )
    
}