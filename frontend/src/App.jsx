import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import PostAuction from "./pages/PostAuction";
import AuctionDetails from "./pages/AuctionDetails";
// import AuctionList from "./components/AuctionList";
// import PlaceBid from "./components/PlaceBid";
import Logout from "./pages/Logout";

// Layout Wrapper (Excludes Landing, Signup, Signin)
const Layout = ({ children }) => (
  <div className="app-container">
    <Navbar /> {/* Navbar displayed only on required pages */}
    <div className="content">{children}</div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages WITHOUT Navbar */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}></Route>
        <Route path="/signin" element={<Signin />} />

        {/* Pages WITH Navbar */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/post-auction" element={<PostAuction />} />
                <Route path="/auction-details" element={<AuctionDetails />} />
                {/* <Route path="/auction-list" element={<AuctionList />} /> */}
                {/* <Route path="/bid/:auctionId" element={<PlaceBid />} /> */}
                <Route path="/" element={<Logout />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

