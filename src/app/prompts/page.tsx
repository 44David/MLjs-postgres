'use client'
import ollama, { Message } from 'ollama';
import { z } from 'zod';
import { useState } from 'react';
import { db } from "@/server/db";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ChevronRight } from 'lucide-react';
import { SquarePlus } from 'lucide-react';
 
export default function Prompts() { 
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  async function onSubmit(event:any) {  

    event.preventDefault();

    // const formData = new FormData(event.currentTarget);

    console.log("e.currentTarget: ", userInput)

    const res = await fetch('/api/prompts', {
      method: 'POST',
      body: userInput,
    });

    const result:any = res.text();

    response ? setResponse(result) : setResponse('Loading...')

    
  }
  return (
    <>


    <Dialog>
      <DialogTrigger><Button variant={"outline"} size={'icon'} className=''> <SquarePlus className='h-10 w-full' /></Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a model to start an instance</DialogTitle>
          <DialogDescription>
            You will be charged accordingly
          </DialogDescription>
        </DialogHeader>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Installed Models" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Llama3">Llama3</SelectItem>
            <SelectItem value="Mistral AI">Mistral AI</SelectItem>
            <SelectItem value="Gemma">Gemma</SelectItem>
          </SelectContent>
        </Select>
        <Button>Build</Button>
      </DialogContent>
    </Dialog>



      <div className="float-left border-r-2 h-screen w-1/6 pr-10 place-content-center">
        {/* <Button variant={"outline"} size={'icon'} className=''> <SquarePlus className='h-10 w-full' /></Button> */}
        <p className="fixed bottom-0 text-xs">Performance varies <br></br>greatly on local hardware</p>
      </div>


      <form onSubmit={onSubmit}>  

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type='text' 
          placeholder='Start chatting'
          name='textinput' 
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value)
          }}
        />
        <Button variant="outline" size='icon' className='bg-blue-600'>
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>


        {/* <input 
        className='border-4 ml-2 border-grey fixed bottom-2 w-1/2 p-3 rounded-xl'
        placeholder='Start chatting'
        type="text" 
      
        /> */}

      { response }
      </form>
    
    </>
  )

  // async function FetchModelData() {

  //   const getServerSideProps = (async () => {

  //   })
  //   const modelsInfo = await db.query.models.findMany();

  //   return (

  //     modelsInfo.map(modelInfo => (

  //     <div className="outline gap-2">
  //       <Link href={`#`}>
  //         {modelInfo.model_name}
  //       </Link>
  //     </div>


  //     ))

  //   )
  // }

}

