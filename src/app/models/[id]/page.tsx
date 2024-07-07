// import { useRouter } from "next/navigation";
import { db } from "@/server/db";
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation";
import { models } from "@/server/db/schema";
import { eq } from 'drizzle-orm';



async function getModelInfo(id:any) {
    
    const res = await fetch(`http://localhost:3000/models/${id}`);

    const modelData = await db.select().from(models).where(eq(id, models.id))

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    };
    return modelData
}   

//@ts-ignore
export default async function ModelInfo({ params }) {

    const modelInfo = await getModelInfo(params.id)
    const parsedModelInfo = JSON.parse(JSON.stringify(modelInfo))
    console.log(parsedModelInfo)
    return (
        <>
            <h1>{parsedModelInfo[0].model_name}</h1>
            <h1>{parsedModelInfo[0].variations}</h1>
        </>
        )  
}
