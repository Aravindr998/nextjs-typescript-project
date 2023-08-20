"use client"

import Profile from "@components/Profile"
import { PostType } from "@types"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

const ProfilePage = () => {
  const [posts, setPosts] = useState<Array<PostType> | []>([])
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `/api/users/${(session?.user as any)?.id}/posts`
      )
      const data: Array<PostType> = await response.json()
      setPosts(data)
    }
    if ((session?.user as any)?.id) fetchPost()
  }, [])

  const handleEdit = (post: PostType) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post: PostType) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?")
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        })
        const filteredPosts = posts.filter((p) => p._id !== post._id)
        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage
