import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './style/App.css';
import './style/Components.css';
import Navbar from './components/NavBar';
import HomeScreen from './components/HomeScreen';
// import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
            <Route exact path="/" element={<HomeScreen/>}/>
            {/* <Route exact path="/register" element={<Register/>}/> */}
            {/* <Route path="/inventory" exact component={InventoryScreen}/>
            <Route path="/selection" exact component={SelectionScreen}/>
            <Route path="/result" exact component={ResultScreen}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
