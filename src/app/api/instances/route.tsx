import { NextRequest, NextResponse } from "next/server";
import { db } from '@/server/db'

export async function GET() {
    try {
    const instances = await db.query.Instances.findMany();

    console.log(instances)
    
    return NextResponse.json({'instances': instances}, {status: 200})

    } catch (error) {
        console.log(error)
    }

}