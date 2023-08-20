import Prompt from "@models/prompt"
import { connectToDatabase } from "@utils/database"
import { NextRequest } from "next/server"

export const GET = async (request: NextRequest, { params }: any) => {
  try {
    await connectToDatabase()
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator")
    return new Response(JSON.stringify(prompts), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response("Failed to fetch prompts", {
      status: 500,
    })
  }
}
