import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';
import Profile from './components/Profile/Profile';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/*" element={<HomePage/>} />
          <Route path="/homepage" element={<HomePage/>} />
          <Route path="/loginpage" element={<Login />} />
          <Route path="/registerpage" element={<Register />} />
          <Route path="/profilepage" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
