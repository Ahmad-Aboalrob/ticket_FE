
import './App.css';
import './views/style.css';
import SignupForm from './views/Signup';
import SignInForm from './views/SignIn';
import MainPage from './views/mainPage';
import { BrowserRouter, Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/Login" element={<SignInForm />} />
          <Route path="/Home" element={<MainPage  />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
