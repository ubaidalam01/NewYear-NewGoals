'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AddGoalFormProps {
  onAddGoal: (text: string) => void
}

export function AddGoalForm({ onAddGoal }: AddGoalFormProps) {
  const [newGoal, setNewGoal] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGoal.trim()) {
      onAddGoal(newGoal.trim())
      setNewGoal('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        value={newGoal}
        onChange={(e) => setNewGoal(e.target.value)}
        placeholder="Enter a new goal..."
        className="flex-grow"
      />
      <Button type="submit">Add Goal</Button>
    </form>
  )
}

