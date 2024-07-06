import ollama from 'ollama'
import { Button } from "@/components/ui/button"
import { db } from "@/server/db";
import Link from 'next/link';

export default function Models() {
    const handleRedirect = () => {
        location.href = "models/install"
    }

    return (
        <>
            <h1>Currently available models:</h1>
            <ShowModels></ShowModels>

        </>
    )   
}

    async function ShowModels() {
        const modelsInfo = await db.query.models.findMany();
        return (
            modelsInfo.map(modelInfo => (
                <>
                    <div className='p-4 outline w-1/4 gap-2 outline-gray-500 rounded-sm mb-4' key={modelInfo.id}>
                        <Link href={`/models/${modelInfo.id}`}>
                            {modelInfo.model_name}
                        </Link>
                        <h3>Size: {modelInfo.size}</h3>
                        <h3>Context Length: {modelInfo.context_length}</h3>
                        <h3>Number of Variations: {modelInfo.variations}</h3>

                        <Button>Pull Locally</Button>
                        <Button>Pull on Servers</Button>
                        {/* <Button><Link href={`http://localhost:3000/models/${modelInfo.id}`}>More Info</Link></Button> */}
                    </div>
                </>
            ))
        )
    }

const pullLocal = () => {
    console.log('hello')
}