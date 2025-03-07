import { Outlet } from "react-router";
import Footer from "./pages/Footer";
import NavBar from "./pages/NavBar";

const App = () => {
  return (
    <div className="container mx-auto">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
