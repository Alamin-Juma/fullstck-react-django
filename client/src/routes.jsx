
import SuccessPage from "./SuccessPage";
import Home from "./Home"


// contains all routes exported as a component at the App level to be able to see browserHistory, links, etc
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
  );
};

export default AppRoutes;
