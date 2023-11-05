import "./App.css";
import ProductPage from "./components/Home";
import Header from './components/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="App">
      <Header />
      <ProductPage />
      <Footer />
    </div>
  );
}

export default App;
