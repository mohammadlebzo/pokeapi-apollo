import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import Tracks from "pages/Tracks";
import CardDetails from "components/CardDetails";

function App() {
  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
    }}>
      <Header />
      <Routes>
        <Route path="/" element={<Tracks />} />
        <Route path="details/:pokeid" element={<CardDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
