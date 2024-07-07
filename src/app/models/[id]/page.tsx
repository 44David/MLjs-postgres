// import { useRouter } from "next/navigation";
import { db } from "@/server/db";
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation";
import { models } from "@/server/db/schema";



async function getModelInfo(id:any) {
    
    const res = await fetch(`http://localhost:3000/models/${id}`);

    const modelData = await db.select({
        model_id: id,

    }).from(models)
    console.log(modelData)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    };
    return modelData
}   

//@ts-ignore
export default async function ModelInfo({ params }) {


    const modelInfo = getModelInfo(params.id)
    //console.log(modelInfo)
    return (
        <h1>{modelInfo}</h1>
        )  
}
