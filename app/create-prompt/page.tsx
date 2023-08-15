"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Form from "@components/Form"

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [prompt, setPrompt] = useState({
    prompt: "",
    tag: "",
  })

  const { data: session } = useSession()
  const router = useRouter()

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.prompt,
          userId: (session?.user as any)?.id,
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
      type="Create"
      post={prompt}
      setPost={setPrompt}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
