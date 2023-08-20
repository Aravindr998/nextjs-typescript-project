"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@components/Form"

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [prompt, setPrompt] = useState({
    prompt: "",
    tag: "",
  })

  const searchParams = useSearchParams()
  const promptId = searchParams.get("id")
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()
      setPrompt({
        prompt: data.prompt,
        tag: data.tag,
      })
    }
    if (promptId) getPromptDetails()
  }, [promptId])

  const router = useRouter()

  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!promptId) return alert("Prompt ID not found")
    setSubmitting(true)

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.prompt,
          tag: prompt.tag,
        }),
      })

      if (res.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Edit"
      post={prompt}
      setPost={setPrompt}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt
