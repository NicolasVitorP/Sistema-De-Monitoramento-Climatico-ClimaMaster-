import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EstadoDoTempoLista from './pages/EstadoDoTempoLista';
import EstadoDoTempoForm from './pages/EstadoDoTempoForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EstadoDoTempoLista />} />
          <Route path="/novo" element={<EstadoDoTempoForm />} />
          <Route path="/editar/:id" element={<EstadoDoTempoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
