import { useSelector } from "react-redux";
import classes from "./style.module.css";
import { calculateAverageValue} from "./functions.js";
import { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
//import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function DirectedTree() {
    const data = useSelector(
        (state) => state.apiDataReducer.filterDataLandingPage
      );

      const _ = require("lodash");
      const grouped_data = _.groupBy(data, "product_category");

    //console.log('data in directed tree' , grouped_data)
    
    // const sub_grouped_data = _.groupBy(grouped_data,"sub_category");
    // //console.log('data in directed tree' , grouped_data)
        
  const result = Object.keys(grouped_data).map((category) =>{
    const grouped_data2 = _.groupBy(grouped_data[category],"sub_category");
    //console.log("grouped data 2 " ,grouped_data2);
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

  const transformedData = {
    value: 0 ,
    children : result
  }
  //console.log('data in directed tree' , transformedData)

    

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
        
        // let data = {
        //   value: 0,
        //   children: [
        //     {
        //       name: "Flora",
        //       children: [
        //         {
        //           name: "Black Tea",
        //           value: 1
        //         },
        //         {
        //           name: "Floral",
        //           children: [
        //             {
        //               name: "Chamomile",
        //               value: 1
        //             },
        //             {
        //               name: "Rose",
        //               value: 1
        //             },
        //             {
        //               name: "Jasmine",
        //               value: 1
        //             }
        //           ]
        //         }
        //       ]
        //     },
        //     {
        //       name: "Fruity",
        //       children: [
        //         {
        //           name: "Berry",
        //           children: [
        //             {
        //               name: "Blackberry",
        //               value: 1
        //             },
        //             {
        //               name: "Raspberry",
        //               value: 1
        //             },
        //             {
        //               name: "Blueberry",
        //               value: 1
        //             },
        //             {
        //               name: "Strawberry",
        //               value: 1
        //             }
        //           ]
        //         },
        //         {
        //           name: "Dried Fruit",
        //           children: [
        //             {
        //               name: "Raisin",
        //               value: 1
        //             },
        //             {
        //               name: "Prune",
        //               value: 1
        //             }
        //           ]
        //         },
        //         {
        //           name: "Other Fruit",
        //           children: [
        //             {
        //               name: "Coconut",
        //               value: 1
        //             },
        //             {
        //               name: "Cherry",
        //               value: 1
        //             },
        //             {
        //               name: "Pomegranate",
        //               value: 1
        //             },
        //             {
        //               name: "Pineapple",
        //               value: 1
        //             },
        //             {
        //               name: "Grape",
        //               value: 1
        //             },
        //             {
        //               name: "Apple",
        //               value: 1
        //             },
        //             {
        //               name: "Peach",
        //               value: 1
        //             },
        //             {
        //               name: "Pear",
        //               value: 1
        //             }
        //           ]
        //         },
        //         {
        //           name: "Citrus Fruit",
        //           children: [
        //             {
        //               name: "Grapefruit",
        //               value: 1
        //             },
        //             {
        //               name: "Orange",
        //               value: 1
        //             },
        //             {
        //               name: "Lemon",
        //               value: 1
        //             },
        //             {
        //               name: "Lime",
        //               value: 1
        //             }
        //           ]
        //         }
        //       ]
        //     },
        //     {
        //       name: "Sour/Fermented",
        //       children: [
        //         {
        //           name: "Sour",
        //           children: [
        //             {
        //               name: "Sour Aromatics",
        //               value: 1
        //             },
        //             {
        //               name: "Acetic Acid",
        //               value: 1
        //             },
        //             {
        //               name: "Butyric Acid",
        //               value: 1
        //             },
        //             {
        //               name: "Isovaleric Acid",
        //               value: 1
        //             },
        //             {
        //               name: "Citric Acid",
        //               value: 1
        //             },
        //             {
        //               name: "Malic Acid",
        //               value: 1
        //             }
        //           ]
        //         },
        //         {
        //           name: "Alcohol/Fremented",
        //           children: [
        //             {
        //               name: "Winey",
        //               value: 1
        //             },
        //             {
        //               name: "Whiskey",
        //               value: 1
        //             },
        //             {
        //               name: "Fremented",
        //               value: 1
        //             },
        //             {
        //               name: "Overripe",
        //               value: 1
        //             }
        //           ]
        //         }
        //       ]
        //     },
        //     {
        //       name: "Green/Vegetative",
        //       children: [
        //         {
        //           name: "Olive Oil",
        //           value: 1
        //         },
        //         {
        //           name: "Raw",
        //           value: 1
        //         },
        //         {
        //           name: "Green/Vegetative",
        //           children: [
        //             {
        //               name: "Under-ripe",
        //               value: 1
        //             },
        //             {
        //               name: "Peapod",
        //               value: 1
        //             },
        //             {
        //               name: "Fresh",
        //               value: 1
        //             },
        //             {
        //               name: "Dark Green",
        //               value: 1
        //             },
        //             {
        //               name: "Vegetative",
        //               value: 1
        //             },
        //             {
        //               name: "Hay-like",
        //               value: 1
        //             },
        //             {
        //               name: "Herb-like",
        //               value: 1
        //             }
        //           ]
        //         },
        //         {
        //           name: "Beany",
        //           value: 1
        //         }
        //       ]
        //     },
        //     {
        //       name: "Other",
        //       children: [
        //         {
        //           name: "Papery/Musty",
        //           children: [
        //             {
        //               name: "Stale",
        //               value: 1
        //             },
        //             {
        //               name: "Cardboard",
        //               value: 1
        //             },
        //             {
        //               name: "Papery",
        //               value: 1
        //             },
        //             {
        //               name: "Woody",
        //               value: 1
        //             },
        //             {
        //               name: "Moldy/Damp",
        //               value: 1
        //             },
        //             {
        //               name: "Musty/Dusty",
        //               value: 1
        //             },
        //             {
        //               name: "Musty/Earthy",
        //               value: 1
        //             },
        //             {
        //               name: "Animalic",
        //               value: 1
        //             },
        //             {
        //               name: "Meaty Brothy",
        //               value: 1
        //             },
        //             {
        //               name: "Phenolic",
        //               value: 1
        //             }
        //           ]
        //         },
        //         {
        //           name: "Chemical",
        //           children: [
        //             {
        //               name: "Bitter",
        //               value: 1
        //             },
        //             {
        //               name: "Salty",
        //               value: 1
        //             },
        //             {
        //               name: "Medicinal",
        //               value: 1
        //             },
        //             {
        //               name: "Petroleum",
        //               value: 1
        //             },
        //             {
        //               name: "Skunky",
        //               value: 1
        //             },
        //             {
        //               name: "Rubber",
        //               value: 1
        //             }
        //           ]
        //         }
        //       ]
        //     },
        //     {
        //       name: "Roasted",
        //       children: [
        //         {
        //           name: "Pipe Tobacco",
        //           value: 1
        //         },
        //         {
        //           name: "Tobacco",
        //           value: 1
        //         },
        //         {
        //           name: "Burnt",
        //           children: [
        //             {
        //               name: "Acrid",
        //               value: 1
        //             },
        //             {
        //               name: "Ashy",
        //               value: 1
        //             },
        //             {
        //               name: "Smoky",
        //               value: 1
        //             },
        //             {
        //               name: "Brown, Roast",
        //               value: 1
        //             }
        //           ]
        //         },
        //         {
        //           name: "Cereal",
        //           children: [
        //             {
        //               name: "Grain",
        //               value: 1
        //             },
        //             {
        //               name: "Malt",
        //               value: 1
        //             }
        //           ]
        //         }
        //       ]
        //     },
        //     {
        //       name: "Spices",
        //       children: [
        //         {
        //           name: "Pungent",
        //           value: 1
        //         },
        //         {
        //           name: "Pepper",
        //           value: 1
        //         },
        //         {
        //           name: "Brown Spice",
        //           children: [
        //             {
        //               name: "Anise",
        //               value: 1
        //             },
        //             {
        //               name: "Nutmeg",
        //               value: 1
        //             },
        //             {
        //               name: "Cinnamon",
        //               value: 1
        //             },
        //             {
        //               name: "Clove",
        //               value: 1
        //             }
        //           ]
        //         }
        //       ]
        //     },
        //     {
        //       name: "Nutty/Cocoa",
        //       children: [
        //         {
        //           name: "Nutty",
        //           children: [
        //             {
        //               name: "Peanuts",
        //               value: 1
        //             },
        //             {
        //               name: "Hazelnut",
        //               value: 1
        //             },
        //             {
        //               name: "Almond",
        //               value: 1
        //             }
        //           ]
        //         },
        //         {
        //           name: "Cocoa",
        //           children: [
        //             {
        //               name: "Chocolate",
        //               value: 1
        //             },
        //             {
        //               name: "Dark Chocolate",
        //               value: 1
        //             }
        //           ]
        //         }
        //       ]
        //     },
        //     {
        //       name: "Sweet",
        //       children: [
        //         {
        //           name: "Brown Sugar",
        //           children: [
        //             {
        //               name: "Molasses",
        //               value: 1
        //             },
        //             {
        //               name: "Maple Syrup",
        //               value: 1
        //             },
        //             {
        //               name: "Caramelized",
        //               value: 1
        //             },
        //             {
        //               name: "Honey",
        //               value: 1
        //             }
        //           ]
        //         },
        //         {
        //           name: "Vanilla",
        //           value: 1
        //         },
        //         {
        //           name: "Vanillin",
        //           value: 1
        //         },
        //         {
        //           name: "Overall Sweet",
        //           value: 1
        //         },
        //         {
        //           name: "Sweet Aromatics",
        //           value: 1
        //         }
        //       ]
        //     }
        //   ]
        // };
        
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

    },[])


    return (
        <>
          <div className={classes.chartTitle}>Categories and Sub-category Qunatity</div>
          <div id="directed-graph" className={classes.directedTree}></div>
        </>
      );
     
}