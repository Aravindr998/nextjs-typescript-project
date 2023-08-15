"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const Feed = () => {
  const [searchText, setSearchText] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

  return (
    <section>
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
    </section>
  )
}

export default Feed
