import { useState } from 'react';
import './App.css';
import CountApp from './components/CountApp.jsx';
import Navbar from "./components/Navbar.jsx"

function App() {
  const [language, setLanguage] = useState("en"); 
  return (
    <div className="App">
      <Navbar language={language} setLanguage={setLanguage} />
      <CountApp language={language} />
    </div>
  );
}

export default App;
