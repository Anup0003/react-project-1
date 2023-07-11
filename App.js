import React from 'react';
import { UserContextProvider, useUser } from './src/components/UserContext';
import TodoApp from './src/components/TodoApp';
import Auth from './src/components/Auth';


const Container = () => {
  const { user } = useUser()

  return user ? <TodoApp user={user}/> : <Auth />
}

export default function App() {
  return (
    <UserContextProvider>
        <Container />
    </UserContextProvider>
  )
}