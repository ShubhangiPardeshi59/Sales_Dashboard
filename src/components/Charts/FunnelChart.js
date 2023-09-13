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
  if(result.length !== 0){
    return(
      <>
      <div className={classes.chartTitle}>Revenue by country</div>
      <div id="country-sales" className = {classes.countrySales} ></div>
    </>
    )
   
  }
  else{
   
    return(
      <>
      <div className={classes.chartTitle}>Revenue by country</div>
      <div className = {classes.message} >No data found</div>
    </>
    )
  }
}

// Create legend
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
// let legend = chart.children.push(am5.Legend.new(root, {
//   centerX: am5.p50,
//   x: am5.p50,
//   marginTop: 15,
//   marginBottom: 15
// }));

// legend.data.setAll(series.dataItems);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/

// const dataTransformation = (somedata,valueField,categoryField) =>{
//   // Requiring the lodash library
//   const _ = require("lodash");
//   const grouped_data = _.groupBy(somedata,categoryField);
//   // console.log("grouped data", grouped_data);

//   function calculateAverageRevenue(categoryData) {
//     const totalVal = categoryData.reduce((acc, item) => acc + item[valueField], 0);
//     return Math.round(totalVal / categoryData.length);
//   }

//     const result = Object.keys(grouped_data).map((categoryField) => ({
//       "country": categoryField,
//       "revenue": calculateAverageRevenue(grouped_data[categoryField]),
//     }));
//   }
