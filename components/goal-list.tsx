'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'

interface Goal {
  id: number
  text: string
  completed: boolean
}

interface GoalListProps {
  goals: Goal[]
  onToggleGoal: (id: number) => void
  onDeleteGoal: (id: number) => void
}

export function GoalList({ goals, onToggleGoal, onDeleteGoal }: GoalListProps) {
  return (
    <ul className="space-y-2">
      {goals.map(goal => (
        <li key={goal.id} className="flex items-center gap-2">
          <Checkbox
            checked={goal.completed}
            onCheckedChange={() => onToggleGoal(goal.id)}
            id={`goal-${goal.id}`}
          />
          <label
            htmlFor={`goal-${goal.id}`}
            className={`flex-grow ${goal.completed ? 'line-through text-gray-500' : ''}`}
          >
            {goal.text}
          </label>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteGoal(goal.id)}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  )
}

