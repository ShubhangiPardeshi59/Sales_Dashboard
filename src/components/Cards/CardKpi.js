import { useSelector } from "react-redux";
import { useMemo } from "react";
import transactionImg from "../../assets/transaction.png";
import salesImg from "../../assets/salesImg.png";
import profitImg from "../../assets/profit.png";
import Card from "./Card";

export function TotalTransactions() {
  const data = useSelector(
    (state) => state.apiDataReducer.filterDataLandingPage
  );
  const totalCustomers = data.length;

  return (
    <Card
      title="Total Transctions"
      value={data.length != 0 ? totalCustomers : ""}
      image={transactionImg}
    />
  );
}

export function TotalSales() {
  const data = useSelector(
    (state) => state.apiDataReducer.filterDataLandingPage
  );

  //used this so that whenever data changes this should get called
  const calTotalRevenue = useMemo(() => {
    let sum = 0;
    data.forEach((obj) => {
      sum += obj["revenue"];
    });
    sum = (sum / 1000000).toFixed(2);
    return sum;
  }, [data]);

    return (
      <Card
        title="Total Revenue"
        value={data.length != 0 ? `$${calTotalRevenue}M` : ""}
        image={salesImg}
      />
    );
  
  
}

export function Profit() {
  const data = useSelector(
    (state) => state.apiDataReducer.filterDataLandingPage
  );
  //used this so that whenever data changes this should get called
  const calProfit = useMemo(() => {
    let sumCost = 0;
    let sumRevenue = 0;
    data.forEach((obj) => {
      sumRevenue += obj["revenue"];
      sumCost += obj["cost"];
    });
    let profit = sumRevenue - sumCost;

    let percentageProfit = ((profit / sumCost) * 100).toFixed(2);
    return percentageProfit;
  }, [data]);

    return <Card title="Profit" value={data.length != 0 ? `${calProfit}%` : ""} image={profitImg} />;
  

}
