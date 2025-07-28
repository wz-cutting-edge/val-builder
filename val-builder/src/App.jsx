import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {

  return (
        <div>
            <h1>Home</h1>
            <NavBar />
            <main className="p-6">
                <Outlet />
            </main>
        </div>
  )
}

export default App
