import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() { return (
    <div className="App">
    <Routes>


      <Route exact path="/" element={<div>Landing</div>} />


    </Routes>
    </div>
  );
}

export default App;
