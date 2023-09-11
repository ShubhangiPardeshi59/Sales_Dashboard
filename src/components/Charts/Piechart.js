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
  //console.log("grouped data" ,grouped_data)

  const result = Object.keys(grouped_data).map((category) => ({
    category: category,
    revenue: calculateAverageValue(grouped_data[category]),
  }));

  useEffectPieChart(result, "revenue", "category", "category-sales");
  return (
    <>
      <div className={classes.chartTitle}>Average Revenue By Category</div>
      <div id="category-sales" className={classes.categorySales} style={{ height: "150px", width: "100%" }}></div>
    </>
  );
}

// useEffect(()=>{

//     // Create root and chart
//     let root = am5.Root.new("category-sales");
//     let chart = root.container.children.push(
//     am5percent.PieChart.new(root, {
//         layout: root.verticalHorizontal
//     })
//     );

//     // Define data
//     let data = [{
//     country: "France",
//     sales: 100000
//     }, {
//     country: "Spain",
//     sales: 160000
//     }, {
//     country: "United Kingdom",
//     sales: 80000
//     }];

//     // Create series
//     let series = chart.series.push(
//     am5percent.PieSeries.new(root, {
//         name: "Series",
//         valueField: "revenue",
//         categoryField: "category"

//     })
//     );
//     // series.ticks.template.disabled = true;
//     // series.alignLabels = false;

//     series.data.setAll(result);

//     // // Add legend
//     // let legend = chart.children.push(am5.Legend.new(root, {
//     // centerX: am5.percent(50),
//     // x: am5.percent(50),
//     // layout: root.horizontalLayout
//     // }));

//     // legend.data.setAll(series.dataItems);

//     return () => root.dispose();
// },[])

//  const sortedMonths = monthOrder.map((month) => ({
//     month: month,
//     totalRevenue:
//       groups[month]?.reduce(
//         (totalRevenue, item) => totalRevenue + item.revenue,
//         0
//       ) ,
//     totalCost:
//       groups[month]?.reduce((totalCost, item) => totalCost + item.cost, 0) ,

//   }));

// // Add legend
// let legend = chart.children.push(am5.Legend.new(root, {
// centerX: am5.percent(50),
// x: am5.percent(50),
// layout: root.horizontalLayout
// }));

// legend.data.setAll(series.dataItems);
