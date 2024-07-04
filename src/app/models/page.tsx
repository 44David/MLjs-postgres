'use client'


import ollama from 'ollama'

import { Button } from "@/components/ui/button"



export default function Models() {


    const handleRedirect = () => {
        location.href = "models/install"
    }

    return (
        <>
            <h1>Currently available models:</h1>

            <div className='p-4 outline w-1/4 gap-2'>
                <h2>Llama 3</h2>
                <Button onClick={handleRedirect}>Pull Locally</Button>
                <Button>Pull on Servers</Button>
            </div>
        
        </>


    )
    
}