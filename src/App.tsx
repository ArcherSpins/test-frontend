import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Header, Routers } from "./components";
import { InsuranceProvider } from "./providers/InsuranceProvider";
import { UserProvider } from "./providers/UserProvider";
import { RouteInsurance } from "./hoc/RouteInsurance";

const App = () => {
  return (
    <BrowserRouter>
      <InsuranceProvider>
        <UserProvider>
          <RouteInsurance>
            <div className="App">
              <Header />
              <Routers />
            </div>
          </RouteInsurance>
        </UserProvider>
      </InsuranceProvider>
    </BrowserRouter>
  );
};

export default App;
