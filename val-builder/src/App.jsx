import { useEffect } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { supabase } from './client';

function App() {
  return (
    <div>
      <h1>Five Stack</h1>
      <NavBar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;