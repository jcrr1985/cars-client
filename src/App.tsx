import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CarProvider from './contexts/IcarContext'

import './App.css'
import { CarsList } from './components/CarsList'
import { CarDetail } from './components/CarDetail';

function App() {

  return (
    <div style={{
      display: 'grid', gap: '6rem', marginTop: '3.7rem', justifyContent: 'center'
    }}>
      <CarProvider>
        <Router>
          <Routes>
            <Route path='/' element={<CarsList />} />
            <Route path="/car/:id" element={<CarDetail />} />
          </Routes>
        </Router>
      </CarProvider>
    </div>
  )
}

export default App
