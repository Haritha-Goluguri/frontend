import './App.css';
import { SignIn } from './components/signin/signin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './components/signup/signup';
import { ForgotPassword } from './components/forgotpassword/forgotpassword';
import { Students } from './components/studentdata/students';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/students" element={<Students/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
