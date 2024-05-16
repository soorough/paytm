import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import SendMoney from "./pages/SendMoney";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendmoney" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
