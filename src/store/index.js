import { createStore } from "redux";

import { combineReducers } from "redux";
const initialState = {
  data: [],
  filteredData: [],
  filterDataLandingPage: [],
};

// const sorting = {
//   data:[],
//   isSorted:false,

// };
const apiDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "get_data":
      return {
        ...state,
        data: action.value,
        filteredData: action.value,
        filterDataLandingPage: action.value,
      };
    case "filter_data":
      return {
        ...state,
        filteredData: action.value,
      };
    case "filter_data_landing_page":
      return {
        ...state,
        filterDataLandingPage: action.value,
      };
    case "reset_filter":
      return {
        ...state,
        filterDataLandingPage: state.data,
      };
    default:
      return state;
  }
};

// const apiSorting = (state =  sorting, action) =>{
//   switch (action.type){
//     case 'sort_data':
//       return {
//         ...sorting,
//         data: action.value,
//         isSorted: true
//       }
//       default:
//         return state;
//   }
// }
// const apiDataFilter = (state = {data},action) =>{
//   if(action.type === 'filter_data'){
//     return{
//       filteredData : action.value
//     }
//   }
//   return state;
// }

const rootReducer = combineReducers({
  apiDataReducer: apiDataReducer,
  //apiSorting:apiSorting
  //apiDataFilter: apiDataFilter
});
//const store = createStore(apiDataReducer);
const store = createStore(rootReducer);
export default store;
