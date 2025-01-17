import './App.css'
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import {Home , Resources , AboutUs, Policy,Admin} from './pages';

function App() {
  
  return (
   <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/resources' element={<Resources/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/admin' element={<Admin/>}/>

      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
