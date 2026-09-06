import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { AppRoutes } from './routes/Routes'

function App() {
 return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;