import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './auth';

import './style/App.css';
import './style/Components.css';

import Navbar from './components/NavBar';
import HomeScreen from './components/HomeScreen';
import Login from './components/Login';
import Register from './components/Register';
import Inventory from './components/Inventory';
import SelectionScreen from './components/SelectionScreen';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div className="App">
          <Navbar/>
          <Routes>
              <Route exact path="/" element={<HomeScreen/>}/>
              <Route exact path="/register" element={<Register/>}/>
              <Route exact path = "/login" element={<Login/>}/>
              <Route exact path = "/inventory" element={<Inventory/>}/>
              <Route path="/selection" exact component={SelectionScreen}/>
              {/* <Route path="/result" exact component={ResultScreen}/>*/}
          </Routes>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
