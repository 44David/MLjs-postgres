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

            <div className='p-4 outline w-1/4 gap-2 outline-gray-500 rounded-sm'>
                <h2 className='font-bold'>Llama 3</h2>
                <h3>Base Size: 10GB</h3>
                <h3>Number of Variations: 3</h3>
                <Button onClick={handleRedirect}>Pull Locally</Button>
                <Button>Pull on Servers</Button>
                <Button>More Info</Button>
            </div>
        
        </>


    )
    
}