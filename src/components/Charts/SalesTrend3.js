import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function SalesTrend() {
  const data = useSelector((state) => state.data);

  const tempdata = data.map((obj)=>{
    return(
      {
        date: `${obj["date"].slice(6,10)}-${obj["date"].slice(0,2)}-${obj["date"].slice(3,5)}`,
        value: obj["revenue"]
      }
    )
  })
  
  useEffect(() => {
   /* Chart code */
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
let root = am5.Root.new("salesTrend");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

root.dateFormatter.setAll({
  dateFormat: "yyyy",
  dateFields: ["valueX"]
});

let data = [
  {
    date: "2012-01-01",
    value: 8
  },
  {
    date: "2012-01-02",
    value: 10
  },
  {
    date: "2012-01-03",
    value: 12
  },
  {
    date: "2012-01-04",
    value: 14
  },
  {
    date: "2012-01-05",
    value: 11
  },
  {
    date: "2012-01-06",
    value: 6
  },
  {
    date: "2012-01-07",
    value: 7
  },
  {
    date: "2012-01-08",
    value: 9
  },
  {
    date: "2012-01-09",
    value: 13
  },
  {
    date: "2012-01-10",
    value: 15
  },
  {
    date: "2012-01-11",
    value: 19
  },
  {
    date: "2012-01-12",
    value: 21
  },
  {
    date: "2012-01-13",
    value: 22
  },
  {
    date: "2012-01-14",
    value: 20
  },
  {
    date: "2012-01-15",
    value: 18
  },
  {
    date: "2012-01-16",
    value: 14
  },
  {
    date: "2012-01-17",
    value: 16
  },
  {
    date: "2012-01-18",
    value: 18
  },
  {
    date: "2012-01-19",
    value: 17
  },
  {
    date: "2012-01-20",
    value: 15
  },
  {
    date: "2012-01-21",
    value: 12
  },
  {
    date: "2012-01-22",
    value: 10
  },
  {
    date: "2012-01-23",
    value: 8
  }
];

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
let chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
  pinchZoomX:true
  })
);

let easing = am5.ease.linear;

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.5,
    groupData: false,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      pan:"zoom",
      minGridDistance: 50
    }),
    tooltip: am5.Tooltip.new(root, {})
  })
);

let yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 1,
    renderer: am5xy.AxisRendererY.new(root, {pan:"zoom"})
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    minBulletDistance: 10,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "{valueY}"
    })
  })
);

// Set up data processor to parse string dates
// https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
series.data.processor = am5.DataProcessor.new(root, {
  dateFormat: "yyyy-MM-dd",
  dateFields: ["date"]
});

series.data.setAll(data);

series.bullets.push(function() {
  let circle = am5.Circle.new(root, {
    radius: 4,
    fill: series.get("fill"),
    stroke: root.interfaceColors.get("background"),
    strokeWidth: 2
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

createTrendLine(
  [
    { date: "2012-01-02", value: 10 },
    { date: "2012-01-11", value: 19 }
  ],
  root.interfaceColors.get("positive")
);

createTrendLine(
  [
    { date: "2012-01-17", value: 16 },
    { date: "2012-01-22", value: 10 }
  ],
  root.interfaceColors.get("negative")
);

function createTrendLine(data, color) {
  let series = chart.series.push(
    am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "date",
      stroke: color,
      valueYField: "value"
    })
  );

  series.data.processor = am5.DataProcessor.new(root, {
    dateFormat: "yyyy-MM-dd",
    dateFields: ["date"]
  });

  series.data.setAll(tempdata);
  series.appear(1000, 100);
}

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis
}));
cursor.lineY.set("visible", false);

// add scrollbar
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);
    return () => root.dispose();
  }, []);

  return (
    <div id="salesTrend" style={{ height: "350px", width: "90%" }}></div>
  );
}
