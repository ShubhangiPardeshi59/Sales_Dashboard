import { useSelector } from "react-redux";
import { useEffect } from "react";

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import classes from "./style.module.css"

const transformData = (somedata) => {
  const temp_data = somedata.map((obj) => ({
    country: obj["country"],
    revenue: obj["revenue"],
  }));

  const countryRevenueMap = [];
  temp_data.forEach((item) => {
    const { country, revenue } = item;
    if (countryRevenueMap[country]) {
      countryRevenueMap[country] += revenue;
    } else {
      countryRevenueMap[country] = revenue;
    }
  });

  const arrayOfObjects = Object.entries(countryRevenueMap).map(
    ([country, revenue]) => ({
      country: country,
      revenue: revenue,
    })
  );
  return arrayOfObjects;
};

const setId = (somedata) => {
  const temp_data = somedata.map((obj) => {
    let id = null;
    switch (obj["country"]) {
      case "United States":
        id = "US";
        break;
      case "France":
        id = "FR";
        break;
      case "United Kingdom":
        id = "GB";
        break;
      case "Germany":
        id = "DE";
        break;
      default:
        id="";
        break;
    }
    return { id: id, country: obj["country"], revenue: obj["revenue"] };
  });
  return temp_data;
};

export default function MapChart() {
  const data = useSelector(
    (state) => state.apiDataReducer.data
  );
  const mapData = transformData(data);

  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoEqualEarth(),
      })
    );

    // Create series for background fill
    let backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      fillOpacity: 0,
      strokeOpacity: 0,
    });
    // Add background polygo
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -70, -180),
    });

    // Create main polygon series for countries
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      fillOpacity: 0.15,
      strokeWidth: 0.5,
      stroke: root.interfaceColors.get("background"),
    });

    // Create polygon series for circles
    let circleTemplate = am5.Template.new({
      tooltipText: "{name}: {value}",
    });

    let bubbleSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        calculateAggregates: true,
        valueField: "value",
        polygonIdField: "id",
      })
    );

    bubbleSeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(
          root,
          {
            radius: 10,
            templateField: "circleTemplate",
          },
          circleTemplate
        ),
      });
    });

    bubbleSeries.set("heatRules", [
      {
        target: circleTemplate,
        min: 3,
        max: 30,
        key: "radius",
        dataField: "value",
      },
    ]);

    let colors = am5.ColorSet.new(root, {});
    const newData = setId(mapData);
    //console.log(newData);
    const subData = newData.map((obj) => {
      return {
        id: obj["id"],
        name: obj["country"],
        value: obj["revenue"],
        circleTemplate: { fill: colors.getIndex(2) },
      };
    });

    bubbleSeries.data.setAll(subData);

    // Add globe/map switch
    let cont = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 40,
      })
    );

    cont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: "Map",
      })
    );

    let switchButton = cont.children.push(
      am5.Button.new(root, {
        themeTags: ["switch"],
        centerY: am5.p50,
        icon: am5.Circle.new(root, {
          themeTags: ["icon"],
        }),
      })
    );

    switchButton.on("active", function () {
      if (!switchButton.get("active")) {
        chart.set("projection", am5map.geoMercator());
        backgroundSeries.mapPolygons.template.set("fillOpacity", 0);
      } else {
        chart.set("projection", am5map.geoOrthographic());
        backgroundSeries.mapPolygons.template.set("fillOpacity", 0.1);
      }
    });

    // let label = cont.children.push(am5.Label.new(root, {
    //   text: subData.revenue + "%",
    //   fill: am5.color(0xffffff),
    //   fontWeight: "400",
    //   centerX: am5.p50,
    //   centerY: am5.p50,
      
    // }))
  
    // let titleLabel = container.children.push(am5.Label.new(root, {
    //   text: dataItem.dataContext.title,
    //   fill: color,
    //   fontWeight: "500",
    //   fontSize: "1em",
    //   centerY: am5.p50,
    //   dy: -radius * 2,
    //   dx: radius
    // }))

    cont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: "Globe",
      })
    );

    // Make stuff animate on load
    chart.appear(1000, 100);
    return () => root.dispose();
  }, [mapData]);


  return (
    <div className={classes.mapChart}>
      <div className={classes.chartTitle}>Revenue by country</div>
      <div id="chartdiv" className = {classes.chartdiv}></div>
    </div>
  );
}

/*

const getYearlyAvg = (tempdata) => {

  const salesDataYearly = tempdata.filter(
    (item) => item.year === 2015 || item.year === 2016
  );

  const revenueByMonth = {};

  salesDataYearly.forEach((item) => {
    const year = item.year;
    const month = item.month;
    const revenue = item.revenue;

    if (revenueByMonth[year] && revenueByMonth[year][month]) {
      revenueByMonth[year][month].totalRevenue += revenue;
      revenueByMonth[year][month].count += 1;
    } else {
      if (!revenueByMonth[year]) {
        revenueByMonth[year] = {};
      }

      revenueByMonth[year][month] = {
        totalRevenue: revenue,
        count: 1,
      };
    }
  });

  const averageRevenueByMonth = {};

  Object.keys(revenueByMonth).forEach((year) => {
    averageRevenueByMonth[year] = {};

    Object.keys(revenueByMonth[year]).forEach((month) => {
      averageRevenueByMonth[year][month] =
        revenueByMonth[year][month].totalRevenue /
        revenueByMonth[year][month].count;
    });
  });

  //console.log(averageRevenueByMonth);
  return averageRevenueByMonth;
};



const tempdata = [
      {
        id: "IN",
        name: "India",
        value: 100,
        circleTemplate: { fill: colors.getIndex(2) },
      },
      {
        id: "IN",
        name: "India",
        value: 200,
        circleTemplate: { fill: colors.getIndex(7) },
      },
      {
        id: "FR",
        name: "France",
        value: 50,
        circleTemplate: { fill: colors.getIndex(7) },
      },
      {
        id: "FR",
        name: "France",
        value: 500,
        circleTemplate: { fill: colors.getIndex(2) },
      },
    ];


/*
const sdata = [
  {
    id: "AF",
    name: "Afghanistan",
    value: 32358260,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "AL",
    name: "Albania",
    value: 3215988,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "DZ",
    name: "Algeria",
    value: 35980193,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "AO",
    name: "Angola",
    value: 19618432,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "AR",
    name: "Argentina",
    value: 40764561,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "AM",
    name: "Armenia",
    value: 3100236,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "AU",
    name: "Australia",
    value: 22605732,
    circleTemplate: { fill: colors.getIndex(8) }
  },

  {
    id: "BY",
    name: "Belarus",
    value: 9559441,
    circleTemplate: { fill: colors.getIndex(8) }
  }
]
*/
