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

async function fetchFiles() {
    const res = await fetch('/f{cluster}.backblazeb2.com/file/{bucket name}/{folder name}/{file}');
}

//@ts-ignore
export  default async function Pull({ params }) {

    const modelInfo = await getModel(params.id)
    const parsedModelInfo = JSON.parse(JSON.stringify(modelInfo))

    try {
        ollama.pull(parsedModelInfo[0].model_name)
    } catch (err) {
        console.log("THIS IS THE ERROR", err)
    }
    
    return (
        <h1>Installing Selected model. This may take a couple minutes depending on your hardware </h1>
    )
}