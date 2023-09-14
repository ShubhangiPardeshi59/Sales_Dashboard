import { useSelector } from "react-redux";
import { calculateAverageValue, useEffectFunnelChart } from "./functions.js";
import classes from "./style.module.css";

export default function FunnelChart() {
  const data = useSelector(
    (state) => state.apiDataReducer.filterDataLandingPage
  );
  // Requiring the lodash library
  const _ = require("lodash");
  const grouped_data = _.groupBy(data, "country");

  //transform data
  const result = Object.keys(grouped_data).map((country) => ({
    country: country,
    revenue: calculateAverageValue(grouped_data[country]),
  }));
  useEffectFunnelChart(result, "revenue", "country", "country-sales");
  if (result.length !== 0) {
    return (
      <>
        <div className={classes.chartTitle}>Revenue by country</div>
        <div id="country-sales" className={classes.countrySales}></div>
      </>
    );
  } else {
    return (
      <>
        <div className={classes.chartTitle}>Revenue by country</div>
        <div className={classes.message}>No data found</div>
      </>
    );
  }
}
