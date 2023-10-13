import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Championship from './components/championship'
import './App.scss'
import ChampionshipMatches from './pages/match';
import Pool from './pages/pool';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Championship />}/>
        <Route path="/match/:id" element={<ChampionshipMatches />}/>
        <Route path="/pool" element={<Pool />}/>
      </Routes>
    </Router>
  )
}

export default App
