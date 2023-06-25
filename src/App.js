import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './auth';
import { UserContextProvider } from './user';

import './style/App.css';
import './style/Components.css';
import './style/recipe.module.css';

import Navbar from './components/NavBar';
import HomeScreen from './components/HomeScreen';
import Login from './components/Login';
import Register from './components/Register';
import Inventory from './components/Inventory';
import SelectionScreen from './components/SelectionScreen';
import RecipeScreen from './components/RecipeScreen';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <UserContextProvider>
          <div className="App">
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<HomeScreen/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path = "/login" element={<Login/>}/>
                <Route exact path = "/inventory" element={<Inventory/>}/>
                <Route exact path="/selection" element={<SelectionScreen/>}/>
                <Route exact path="/result" element={<RecipeScreen/>}/>
            </Routes>
          </div>
        </UserContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
