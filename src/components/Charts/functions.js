import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useEffect } from "react";

export const calculateAverageValue = (categoryData) => {
  const totalVal = categoryData.reduce((acc, item) => acc + item.revenue, 0);
  return Math.round(totalVal / categoryData.length);
};

export const useEffectPieChart = (
  somedata,
  valueField,
  categoryField,
  rootId
) => {
  useEffect(() => {
    if (somedata.length != 0) {
      // Create root and chart
      let root = am5.Root.new(rootId);
      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalHorizontal,
        })
      );
      // Create series
      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: valueField,
          categoryField: categoryField,
        })
      );

      series.data.setAll(somedata);

      return () => root.dispose();
    }
  }, [somedata]);
};

export const useEffectFunnelChart = (
  somedata,
  valueField,
  categoryField,
  rootId
) => {
  useEffect(() => {
    if (somedata.length != 0) {
      // Create root element
      let root = am5.Root.new(rootId);

      // Set themes
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      let chart = root.container.children.push(
        am5percent.SlicedChart.new(root, {
          layout: root.verticalLayout,
        })
      );

      // Create series
      let series = chart.series.push(
        am5percent.FunnelSeries.new(root, {
          alignLabels: false,
          orientation: "vertical",
          valueField: valueField,
          categoryField: categoryField,
        })
      );

      // Set data
      series.data.setAll(somedata);

      // Play initial series animation
      series.appear();

      chart.appear(1000, 100);
    
      return () => root.dispose();
    }
  }, [somedata]);
};

export const useEffectLineChart = (
  somedata,
  valueField,
  categoryField,
  rootId
) => {
  useEffect(() => {
    if (somedata.length != 0) {
      // Create root element
      let root = am5.Root.new(rootId);
      // Set theme
      root.setThemes([am5themes_Animated.new(root)]);
      // Create chart
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
        })
      );

      // Add cursor
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);

      // Create axes
      let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15,
      });

      xRenderer.grid.template.setAll({
        location: 1,
      });

      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0.3,
          categoryField: categoryField,
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.3,
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1,
          }),
        })
      );

      // Create series
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: valueField,
          sequencedInterpolation: true,
          categoryXField: categoryField,
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );

      series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0,
      });
      series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      xAxis.data.setAll(somedata);
      series.data.setAll(somedata);

      // Make stuff animate on load
      series.appear(1000);
      chart.appear(1000, 100);

      return () => root.dispose();
    }
  }, [somedata]);
};
