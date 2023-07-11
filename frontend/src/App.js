import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from './components/Homepage/Homepage';
import Addbook from './components/Addbook/Addbook';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/addbook' element={<Addbook/>}/>
    </Routes> 
    </BrowserRouter>
    </>
  );
}

export default App;