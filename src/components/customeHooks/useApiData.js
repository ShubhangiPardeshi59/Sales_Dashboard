import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// use this custome hook to fetch the data 
// doing so provides the fetched data from the given url
const useApiData = (url) =>{
    const dispatch = useDispatch();
    const data = useSelector((state) => state.apiDataReducer.data);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetchDataHandler = useCallback(async () => {
      setIsLoading(true);
      const response = await fetch(url);
  
      const data = await response.json();
      console.log(data);
      dispatch({ type: "get_data", value: data });
  
      setIsLoading(false);
    }, [dispatch]);
  
    useEffect(() => {
      fetchDataHandler();
    }, [fetchDataHandler]);
  
    return { data, isLoading, fetchDataHandler};
  }

export default useApiData;