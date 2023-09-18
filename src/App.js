import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const data = useSelector((state) => state.apiDataReducer.data);
  const [currentPage, setCurrentPage] = useState("overview");

  const [isLoading, setIsLoading] = useState(false);

  const fetchDataHandler = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:8000/sales");

    const data = await response.json();
    console.log(data);
    dispatch({ type: "get_data", value: data });

    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  return (
    //<div>hello</div>
    <>
      <BrowserRouter>
        {!isLoading && data.length === 0 && <Loading>Found no data.</Loading>}
        {isLoading && <Loading>Loading...</Loading>}
        {!isLoading && data.length > 0 && (
          <div className="main">
            <Sidebar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
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
