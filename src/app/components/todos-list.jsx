'use client'

import { experimental_useOptimistic as useOptimistic } from 'react'
import TodoCard from "./todo-card"

export default function TodosList({ todos }) {
  const [optimisticTodo, addOptimisticTodo] = useOptimistic(
    todos,
    (currentOptimisticTodo, newTodo) =>{
      const newOptimisticTodo = [...currentOptimisticTodo]
      const index = newOptimisticTodo.findIndex(todo => todo.id === newTodo.id)
      newOptimisticTodo[index] = newTodo
      return newOptimisticTodo
    }
  
  )

  return (
    <>
        {
          optimisticTodo?.map(todo => {
          const {
            id,
            user,
            title,
            created_at,
          } = todo

          const {
            email: userEmail,
            avatar_url: avatarUrl,
            
          } = user

          return (
            <TodoCard
              avatarUrl={avatarUrl}
              key={id}
              userEmail={userEmail}
              createdAt={created_at}
              title={title}
              addOptimisticTodo={addOptimisticTodo}
              todo={todo}
            />
          )
        })
      }
    </>
  )
}