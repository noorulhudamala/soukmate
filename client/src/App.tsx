import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./Routes";
import { StoreProvider } from "./store";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <AppRoutes />
      </StoreProvider>
    </div>
  );
}

export default App;
