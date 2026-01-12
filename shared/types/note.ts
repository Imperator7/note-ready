export type HistoryNote = {
  note: string
  category: string
  createdAt: number
}

export type Note = {
  id: string
  userId: string
  author: string
  note: string
  history: HistoryNote[]
  createdAt: number
  category: string
}
