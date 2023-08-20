export type PostType = {
  _id: string
  creator: {
    _id: string
    image: string
    username: string
    email: string
  }
  prompt: string
  tag: string
}
