import { useSelector } from "react-redux";
import classes from "./style.module.css";
import { calculateAverageValue, useEffectPieChart } from "./functions.js";

export default function PieChart() {
  const data = useSelector(
    (state) => state.apiDataReducer.filterDataLandingPage
  );
  // Requiring the lodash library
  const _ = require("lodash");
  const grouped_data = _.groupBy(data, "product_category");

  const result = Object.keys(grouped_data).map((category) => ({
    category: category,
    revenue: calculateAverageValue(grouped_data[category]),
  }));

  useEffectPieChart(result, "revenue", "category", "category-sales");

  if (result.length !== 0) {
    return (
      <>
        <div className={classes.chartTitle}>Average Revenue By Category</div>
        <div id="category-sales" className={classes.categorySales}></div>
      </>
    );
  } else {
    return (
      <>
        <div className={classes.chartTitle}>Average Revenue By Category</div>
        <div className={classes.message}>No data found</div>
      </>
    );
  }
}
