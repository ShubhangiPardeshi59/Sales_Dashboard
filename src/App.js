import useApiData from "./components/customeHooks/useApiData"
import Header from "./UI/Header";
import Sidebar from "./UI/sidebar/Sidebar";
import Table from "./components/Table/Table.js";
import Loading from "./components/Loading/Loading";
import Sales from "./components/sales/Sales";
import Inventory from "./components/inventory/Inventory";
import Form from "./components/form/Form";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const headerContent = {
  name: "Sales Analysis",
  subname: "How are we performing?",
};

function App() {
  //call to custome hook uspApiData to handle loading fo data
  const { data, isLoading, fetchDataHandler } = useApiData("http://localhost:8000/sales");
  return (
    <>
      <BrowserRouter>
        {!isLoading && data.length === 0 && <Loading>Found no data.</Loading>}
        {isLoading && <Loading>Loading...</Loading>}
        {!isLoading && data.length > 0 && (
          <div className="main">
            <Sidebar />
            <div className="rightSide">
              <Header headerContent={headerContent} />
              <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/sales" element={<Sales />}></Route>
                <Route path="/inventory" element={<Inventory />}></Route>
                <Route path="/table" element={<Table />}></Route>
                <Route path="/form" element={<Form fetchDataHandler={fetchDataHandler}/>}></Route>
              </Routes>
            </div>
          </div>
        )}
      </BrowserRouter>
     
    </>
  );
}

export default App;
