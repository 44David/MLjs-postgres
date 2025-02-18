'use client'
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

import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import React from 'react'
import { useEffect } from 'react';

import { 
  ChevronRight, 
  SquarePlus, 
  Zap,
  X,
  CircleAlert,

} from 'lucide-react';


export default function Prompts() { 
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [instanceModel, setInstanceModel] = useState('');
  const [instances, setInstances] = useState('');
  let showToast = true;


  async function onSubmit(event:any) {  

    event.preventDefault();

    const combinedData = {
      userInput: userInput,
      instanceModel: instanceModel,
    };

    const res = await fetch('/api/prompts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(combinedData),
    });

    const result:Promise<string> = res.text();

    const resultStatus:number = res.status

    if (resultStatus == 500) {
      showToast = false
    }

    const parsedResponse = JSON.parse(await result)
    const formattedText = parsedResponse.response.replace(/\\n/g, '\n')

    setResponse(formattedText)
  }


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/instances')
        const data = await res.json()

        console.log('JSON data ', JSON.parse(JSON.stringify(data)))

        //@ts-ignore 
        data.instances.forEach(element => {
          console.log("id ", element.model_name)
        });

      } catch (error) {
        console.error('Error fetching data ', error)
      }
    };
    fetchData()
  }, [])

  const [open, setOpen] = React.useState(false);

  const wait = () => new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <>
      <div className="float-left border-r-2 h-screen w-1/6 pr-10">
    
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
              onSubmit={async (event) => {
                wait().then(() => setOpen(false));
                event.preventDefault()
                await onSubmit(event)

                if (showToast) {
                  toast("Instance created successfully", {
                    action: { 
                      label: <X className='h-4 w-4' />,
                      onClick: () => console.log() 
                    }
                  })
                } else {
                  toast("An error occurred. Do you have this model pulled/installed?", {
                    action: {
                      label:  <CircleAlert />,
                      onClick: () => console.log() 
                    }
                  })
                }
              }}
            >              

                <Select value={instanceModel} onValueChange={setInstanceModel}>

                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  
                    <SelectContent>

                      <SelectGroup>
                        <SelectLabel>Ollama Models</SelectLabel>
                        <SelectItem value="llama3">Llama3</SelectItem>
                        <SelectItem value="Mistral AI">Mistral AI</SelectItem>
                        <SelectItem value="Gemma">Gemma</SelectItem>
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel>NVIDIA Nim Models</SelectLabel>
                        <SelectItem value='stable-video-diffusion'>stable-video-diffusion</SelectItem>
                        <SelectItem value='kosmos-2'>kosmos-2</SelectItem>
                        <SelectItem value='cuopt'>cuopt</SelectItem>
                        <SelectItem value='mistral-large'>mistral-large</SelectItem>
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel>Your Models</SelectLabel>
                      </SelectGroup>
                    </SelectContent>
                </Select>
                <Button type='submit' className='mt-2'>
                  <Zap className='mr-2 h-4 w-4'/> Build
                </Button>
            </form>
            </DialogContent>
          </Dialog>



          <div className='border border-gray-400 w-full'>
          </div>


      </div>



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
          
        <div style={{ whiteSpace: 'pre-wrap'}}>
          {response}
        </div>
        
      </form>
    
    </>
  )




  // sample API request 
  // function nvidiaNimAPI() {
  //   nim.create_chat_completion_v1_chat_completions_post({
  //     model: 'google/gemma-7b',
  //     max_tokens: 1024,
  //     stream: false,
  //     temperature: 0.3,
  //     top_p: 1,
  //     stop: null,
  //     frequency_penalty: 0,
  //     presence_penalty: 0,
  //     seed: null,
  //     messages: 'string'
  //   })
  //     .then(({ data }) => console.log(data))
  //     .catch(err => console.error(err));
  // }

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

