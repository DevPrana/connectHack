import Navbar from './components/Navbar';
import HomePage from './components/Home';
import RegisterPage from './components/Register';
import './components/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  	return (
    	<div className = "App">
			<BrowserRouter>
      			<Navbar/>
      		
				<Routes>
					<Route path = "/" element = { <HomePage/> }/>
					<Route path = "register" element = { <RegisterPage/> }/>
				</Routes>
      		</BrowserRouter>
    	</div>
  	);
}

export default App;
