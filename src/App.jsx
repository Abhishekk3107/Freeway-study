import './App.css'
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import {Home , Resources , AboutUs} from './pages';

function App() {
  
  return (
   <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/resources' element={<Resources/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
