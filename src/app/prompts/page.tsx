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

import React from 'react'

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

  const [open, setOpen] = React.useState(false);

  const wait = () => new Promise((resolve) => setTimeout(resolve, 500));

  return (

    <>

      {/* <div className="float-left border-r-2 h-screen w-1/6 pr-10 place-content-center"> */}
    
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger><SquarePlus /></DialogTrigger>



            <DialogContent>

              <DialogHeader>

                <DialogTitle>Select a model to start an instance</DialogTitle>

                <DialogDescription>
                  Instances will vary in speed depending on hardware.
                </DialogDescription>

              </DialogHeader>

            <form
              onSubmit={(event) => {
                wait().then(() => setOpen(false));
                event.preventDefault()
                console.log('Hello')

              }}
            >              

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

                <Button type='submit'>Build</Button>
              

            </form>

            </DialogContent>


          </Dialog>
      {/* </div> */}



      <p className="fixed bottom-0 text-xs">Performance varies <br></br>greatly on local hardware</p>



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

