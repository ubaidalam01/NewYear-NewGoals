'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddGoalForm } from '@/components/add-goal-form'
import { GoalList } from '@/components/goal-list'

interface Goal {
  id: number
  text: string
  completed: boolean
}

export default function NewYearGoals() {
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    const storedGoals = localStorage.getItem('newYearGoals')
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('newYearGoals', JSON.stringify(goals))
  }, [goals])

  const addGoal = (text: string) => {
    setGoals([...goals, { id: Date.now(), text, completed: false }])
  }

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ))
  }

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  const completedGoals = goals.filter(goal => goal.completed).length
  const totalGoals = goals.length
  const progress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Happy New Year Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <AddGoalForm onAddGoal={addGoal} />
          <GoalList goals={goals} onToggleGoal={toggleGoal} onDeleteGoal={deleteGoal} />
          <div className="mt-4">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Progress: {completedGoals}/{totalGoals} ({Math.round(progress)}%)
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

