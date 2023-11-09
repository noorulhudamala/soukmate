import "./App.css";
import ProductPage from "./components/Home";
import Header from './components/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import AppRoutes from "./Routes";

function App() {

  return (
    <div className="App">
      
      <AppRoutes/>
     
    </div>
  );
}

export default App;
