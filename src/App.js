import './App.css';
import Login from "./pages/Login"
import Signup from "./pages/Signup"

// import Navbarpage from './pages/Navbar';
import Stack from '@mui/material/Stack';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import NavFile from './pages/NavFile';
import Newnft from './components/Newnft';
import Home from './pages/Home';

function App() {
  return (
    <Stack spacing={5} >
      <NavFile/>
      <Router>
        <Routes>
          <Route path='/' exact element={<Login />}></Route>
          <Route path='/login' exact element={<Login />}></Route>
          <Route path='/signup' exact element={<Signup />}></Route>
          <Route path='/newnft' exact element={<Newnft />}></Route>
          <Route path='/home' exact element={<Home />}></Route>

        </Routes>
      </Router>
    </Stack>
  );
}
export default App;
