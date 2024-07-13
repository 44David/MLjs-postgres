import { db } from '@/server/db'
import { models } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import ollama from 'ollama'

async function getModel(id:any) {
    const res = await fetch(`http://localhost:3000/models/${id}`);

    const modelData = await db.select().from(models).where(eq(id, models.id));

    if (!res.ok) {
        throw new Error('Could not find model to install')
    };
    return modelData
} 

//@ts-ignore
export default async function Install({ params }) {

    const modelInfo = await getModel(params.id)
    const parsedModelInfo = JSON.parse(JSON.stringify(modelInfo))

    try {
        ollama.pull(parsedModelInfo[0].model_name)
    } catch (err) {
        console.log("THIS IS THE ERROR", err)
    }
    
    return (
        <>  
            <div className='text-center'>
            <h1>Installing Selected model. This may take a couple minutes depending on your hardware </h1>
            <h1>Please ensure you have Ollama running in the terminal with <pre>ollama serve</pre></h1>
            </div>
        </>

    )
}