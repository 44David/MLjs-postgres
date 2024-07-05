import ollama from 'ollama'
import { Button } from "@/components/ui/button"
import { db } from "@/server/db";

export default function Models() {
    const handleRedirect = () => {
        location.href = "models/install"
    }

    return (
        <>
            <h1>Currently available models:</h1>

            <div className='p-4 outline w-1/4 gap-2 outline-gray-500 rounded-sm'>
                <ShowModels></ShowModels>
                <Button>Pull Locally</Button>
                <Button>Pull on Servers</Button>
                <Button>More Info</Button>
            </div>
        </>
    )
}

    async function ShowModels() {
        const modelsInfo = await db.query.models.findMany();
        return (
            modelsInfo.map(modelInfo => (
                <>
                    <h2 className='font-bold'>{modelInfo.model_name}</h2>
                    <h3>Size: {modelInfo.size}</h3>
                    <h3>Context Length: {modelInfo.context_length}</h3>
                    <h3>Number of Variations: {modelInfo.variations}</h3>
                </>
            ))
        )
    }

const pullLocal = () => {
    console.log('hello')
}