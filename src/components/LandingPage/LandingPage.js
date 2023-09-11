import React, { useState } from "react"; // Import useState
import MapChart from "../Charts/MapChart";
import { TotalTransactions, TotalSales, Profit } from "../Cards/CardKpi";
import classes from "./LandingPage.module.css";
import PieChart from "../Charts/Piechart";
import SalesTrend from "../Charts/SalesTrend2";
import FunnelChart from "../Charts/FunnelChart";
import { useDispatch, useSelector } from "react-redux";

export default function LandingPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.apiDataReducer.data);

  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    filterData(selectedMonth, year);
  };

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
    filterData(month, selectedYear);
  };

  const filterData = (month, year) => {
    if (selectedMonth === "all" && selectedYear === "all") {
      dispatch({ type: "reset_filter" });
    } else {
      const filteredData = data.filter((item) => {
        return (
          (year === "all" || item["year"] === parseInt(year)) &&
          (month === "all" || item["month"] === month)
        );
      });
      dispatch({ type: "filter_data_landing_page", value: filteredData });
    }
  };

  console.log("filtered data dropdown ", data);
  
  return (

    <div className={classes.landingPageContainer}>
      <div className={`${classes.box} ${classes.box1}`}>
        <TotalTransactions />
      </div>
      <div className={`${classes.box} ${classes.box2}`}>
        <TotalSales />
      </div>
      <div className={`${classes.box} ${classes.box3}`}>
        <Profit />
      </div>
      <div className={`${classes.box} ${classes.box4}`}>
        <div className={classes.dropdown}>
          <div className={classes.dropdownTitle}>Year</div>
          <div>
            <select name="year" id="year" onChange={handleYearChange}>
              <option value="all">All</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
            </select>
          </div>
        </div>
        <div className={classes.dropdown}>
          <div className={classes.dropdownTitle}>Month</div>
          <div>
            <select name="month" id="month" onChange={handleMonthChange}>
              <option value="all">All</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="Jun">Jun</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="Obctober">Obtober</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
        </div>
      </div>
      <div className={`${classes.box} ${classes.box5}`}>
        <SalesTrend />
      </div>
      <div className={`${classes.box} ${classes.box6}`}>
        <PieChart />
      </div>
      <div className={`${classes.box} ${classes.box7}`}>
        <FunnelChart />
      </div>
    </div>
  );
}
