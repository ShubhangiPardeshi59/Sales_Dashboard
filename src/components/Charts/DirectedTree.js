import { useSelector } from "react-redux";
import classes from "./style.module.css";
import { useEffect,useMemo } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function DirectedTree() {
    const data = useSelector(
        (state) => state.apiDataReducer.filterDataLandingPage
      );

      const _ = require("lodash");
      const grouped_data = _.groupBy(data, "product_category");
        
  const result = Object.keys(grouped_data).map((category) =>{
    const grouped_data2 = _.groupBy(grouped_data[category],"sub_category");
    
    const result2 = Object.keys(grouped_data2).map((subCategory)=>{
        return(
            {
                name:subCategory,
                value: grouped_data2[subCategory].length
            }
        )
    })
    return ({
        name: category,
        children: result2,
      })
  } );

  const transformedData =useMemo(()=>({
    value: 0 ,
    children : result
  }),[result]) 
    useEffect(()=>{


        /* Chart code */
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new("directed-graph");
        
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        // Create wrapper container
        let container = root.container.children.push(am5.Container.new(root, {
          width: am5.percent(100),
          height: am5.percent(100),
          layout: root.verticalLayout
        }));
        
        // Create series
        // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
        let series = container.children.push(am5hierarchy.ForceDirected.new(root, {
          singleBranchOnly: false,
          downDepth: 2,
          topDepth: 1,
          initialDepth: 1,
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
          idField: "name",
          linkWithField: "linkWith",
          manyBodyStrength: -10,
          centerStrength: 0.8
        }));
        
        series.get("colors").setAll({
          step: 2
        });
        
        series.links.template.set("strength", 0.5);
        
        series.data.setAll([transformedData]);
        
        series.set("selectedDataItem", series.dataItems[0]);
        
        
        // Make stuff animate on load
        series.appear(3000, 300);
        
        return () => root.dispose();

    },[transformedData])


    return (
        <>
          <div className={classes.chartTitle}>Categories and Sub-category Qunatity</div>
          <div id="directed-graph" className={classes.directedTree}></div>
        </>
      );
     
}