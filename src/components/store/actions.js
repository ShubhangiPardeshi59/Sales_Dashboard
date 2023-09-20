import { useCallback } from "react";
import { useDispatch } from "react-redux";
export const FetchDataHandler = () => {
  const dispatch = useDispatch();

  return async () => {
    const response = await fetch("http://localhost:8000/sales");

    const data = await response.json();
    console.log(data);
    dispatch({ type: "get_data", value: data });
  };
};
