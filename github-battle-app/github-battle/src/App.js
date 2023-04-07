import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './component/Header';
import Popular from './component/Popular';
import Battle from './component/Battle';


function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Popular />} />
          <Route path='/battle' element={<Battle />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
