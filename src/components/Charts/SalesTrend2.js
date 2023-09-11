import { useSelector } from "react-redux";
import { calculateAverageValue, useEffectLineChart } from "./functions";
import classes from "./style.module.css";

export default function SalesTrend() {
  const data = useSelector(
    (state) => state.apiDataReducer.filterDataLandingPage
  );
  const tempdata = data.map((obj) => {
    return {
      dateMonth: `${obj["year"]} - ${obj["month"]}`,
      revenue: obj["revenue"],
    };
  });

  // Requiring the lodash library
  const _ = require("lodash");
  const grouped_data = _.groupBy(tempdata, "dateMonth");
  console.log("grouped data in sales chart", grouped_data);

  //get requried data
  const result = Object.keys(grouped_data).map((dateMonth) => ({
    dateMonth: dateMonth,
    revenue: calculateAverageValue(grouped_data[dateMonth]),
  }));

  //sort data
  function sortByDateMonth(a, b) {
    const dateA = new Date(a.dateMonth.replace("-", " "));
    const dateB = new Date(b.dateMonth.replace("-", " "));
    return dateA - dateB;
  }

  result.sort(sortByDateMonth);

  useEffectLineChart(result, "revenue", "dateMonth", "sales-trend");
  return (
    <>
      <div className={classes.chartTitle}>Yearly and monthy revenue</div>
      <div id="sales-trend" className = {classes.salesTrend} style={{ height: "400px", width: "90%" }}></div>
    </>
  );
}

// useEffect(() => {
//   /* Chart code */
// // Create root element
// // https://www.amcharts.com/docs/v5/getting-started/#Root_element
// let root = am5.Root.new("salesTrend");

// // Set themes
// // https://www.amcharts.com/docs/v5/concepts/themes/
// root.setThemes([
//  am5themes_Animated.new(root)
// ]);

// // Create chart
// // https://www.amcharts.com/docs/v5/charts/xy-chart/
// let chart = root.container.children.push(am5xy.XYChart.new(root, {
//  panX: true,
//  panY: true,
//  wheelX: "panX",
//  wheelY: "zoomX",
//  pinchZoomX: true
// }));

// // Add cursor
// // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
// let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
// cursor.lineY.set("visible", false);

// // Create axes
// // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
// xRenderer.labels.template.setAll({
//  rotation: -90,
//  centerY: am5.p50,
//  centerX: am5.p100,
//  paddingRight: 15
// });

// xRenderer.grid.template.setAll({
//  location: 1
// })

// let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
//  maxDeviation: 0.3,
//  categoryField: "dateMonth",
//  renderer: xRenderer,
//  tooltip: am5.Tooltip.new(root, {})
// }));

// let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
//  maxDeviation: 0.3,
//  renderer: am5xy.AxisRendererY.new(root, {
//    strokeOpacity: 0.1
//  })
// }));

// // Create series
// // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// let series = chart.series.push(am5xy.ColumnSeries.new(root, {
//  name: "Series 1",
//  xAxis: xAxis,
//  yAxis: yAxis,
//  valueYField: "revenue",
//  sequencedInterpolation: true,
//  categoryXField: "dateMonth",
//  tooltip: am5.Tooltip.new(root, {
//    labelText: "{valueY}"
//  })
// }));

// series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
// series.columns.template.adapters.add("fill", function(fill, target) {
//  return chart.get("colors").getIndex(series.columns.indexOf(target));
// });

// series.columns.template.adapters.add("stroke", function(stroke, target) {
//  return chart.get("colors").getIndex(series.columns.indexOf(target));
// });

// // Set data
// let data = [{
//  country: "USA",
//  value: 2025
// }, {
//  country: "China",
//  value: 1882
// }, {
//  country: "Japan",
//  value: 1809
// }, {
//  country: "Germany",
//  value: 1322
// }, {
//  country: "UK",
//  value: 1122
// }, {
//  country: "France",
//  value: 1114
// }, {
//  country: "India",
//  value: 984
// }, {
//  country: "Spain",
//  value: 711
// }, {
//  country: "Netherlands",
//  value: 665
// }, {
//  country: "South Korea",
//  value: 443
// }, {
//  country: "Canada",
//  value: 441
// }];

// xAxis.data.setAll(result);
// series.data.setAll(result);

// // Make stuff animate on load
// // https://www.amcharts.com/docs/v5/concepts/animations/
// series.appear(1000);
// chart.appear(1000, 100);

//    return () => root.dispose();
//  }, []);
