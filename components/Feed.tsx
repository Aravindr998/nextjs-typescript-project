"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import { PostType } from "@types"

type PromptCardListType = {
  data: Array<PostType>
  handleTagClick: () => void
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListType) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [post, setPost] = useState([])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt")
      const data = await response.json()
      setPost(data)
    }
    fetchPost()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>
      <PromptCardList data={post} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed
