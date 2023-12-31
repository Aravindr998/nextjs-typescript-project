import Prompt from "@models/prompt"
import { connectToDatabase } from "@utils/database"
import { NextRequest } from "next/server"

export const GET = async (request: NextRequest, { params }: any) => {
  try {
    await connectToDatabase()
    const prompt = await Prompt.findById(params.id).populate("creator")
    if (!prompt) return new Response("Prompt not found", { status: 404 })
    return new Response(JSON.stringify(prompt), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response("Failed to fetch prompts", {
      status: 500,
    })
  }
}

export const PATCH = async (request: NextRequest, { params }: any) => {
  const { prompt, tag } = await request.json()

  try {
    await connectToDatabase()
    const existingPrompt = await Prompt.findById(params.id)
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 })
    existingPrompt.prompt = prompt
    existingPrompt.tag = tag
    await existingPrompt.save()
    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {
    return new Response("Failed to update the prompt", {
      status: 500,
    })
  }
}

export const DELETE = async (request: NextRequest, { params }: any) => {
  try {
    await connectToDatabase()
    await Prompt.findByIdAndRemove(params.id)
    return new Response("Prompt deleted successfully", { status: 200 })
  } catch (error) {
    return new Response("Failed to delete the prompt", {
      status: 500,
    })
  }
}
