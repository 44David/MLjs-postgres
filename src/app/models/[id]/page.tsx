// import { useRouter } from "next/navigation";
import { db } from "@/server/db";
import { Button } from "@/components/ui/button"


//@ts-ignore
export default async function ModelInfo({ params }) {

    const modelInfo = await getModelInfo(params.id)
    return (
        <h1>{modelInfo.model_name}</h1>
        )  
}

async function getModelInfo(id: number) {
    const res = await fetch(`http://localhost:3000/models/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    };
    return res.json()
}



//@ts-ignore