import ollama from 'ollama'
import { Button } from "@/components/ui/button"
import { db } from "@/server/db";
import Link from 'next/link';


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { HardDriveDownload, Database } from 'lucide-react';

export default function Models() {
    return (
        <>
        <h1 className='font-bold text-7xl mb-4'>Currently available models</h1>
            <div className="grid gap-4 grid-cols-3 grid-rows-3 mt-10">
                    <ShowModels></ShowModels>
            </div>
        </>
    )   
}
    async function ShowModels() {
        const modelsInfo = await db.query.models.findMany();
        return (
            modelsInfo.map(modelInfo => (
                <>
                    <div className='p-4 outline w-full outline-gray-500 rounded-sm '>
                        <Link href={`/install/${modelInfo.id}`}>
                            {modelInfo.model_name}
                        </Link>
                        <h3>Size: {modelInfo.size}</h3>
                        <h3>Context Length: {modelInfo.context_length}</h3>
                        <h3>Number of Variations: {modelInfo.variations}</h3>

                        <DropdownMenu>
                            <DropdownMenuTrigger><Button className='mr-2'> <HardDriveDownload className='h-4 w-4 mr-2'/> Pull Locally</Button></DropdownMenuTrigger>  
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Choose how to host</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Link href={`/models/install/${modelInfo.id}`}>Host with NVIDIA Nim</Link></DropdownMenuItem>
                                <DropdownMenuItem>Host with Ollama</DropdownMenuItem>
                            </DropdownMenuContent>           
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger><Button><Database className='h-4 w-4 mr-2' />Pull on Servers</Button></DropdownMenuTrigger>  
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Choose where to host</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Host on NVIDIA Nim</DropdownMenuItem>
                                <DropdownMenuItem>Host from a bucket</DropdownMenuItem>
                                <DropdownMenuItem>MLjs server (Network speeds will vary)</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                    </div>
                </>
            ))
        )
    }