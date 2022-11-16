import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import Tracks from "pages/Tracks";
import CardDetails from "components/CardDetails";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  minheight: 100vh;
`;
const Space = styled.div`
  height: 10rem;
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <Routes>
        <Route path="/" element={<Tracks />} />
        <Route path="details/:pokeid" element={<CardDetails />} />
      </Routes>
      <Space />
      <Footer />
    </Wrapper>
  );
}

export default App;
