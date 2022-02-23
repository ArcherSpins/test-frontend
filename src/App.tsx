import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Header, Routers } from "./components";
import { RouteInsurance } from "./hoc/RouteInsurance";
import { Providers } from "./components/Providers";

const App = () => {
  return (
    <BrowserRouter>
      <Providers>
        <RouteInsurance>
          <div className="App">
            <Header />
            <Routers />
          </div>
        </RouteInsurance>
      </Providers>
    </BrowserRouter>
  );
};

export default App;
