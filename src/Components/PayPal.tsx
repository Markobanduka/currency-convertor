import React, { useContext } from "react";
import { CurrencyContext, ContextAmount } from "../App";
import { CURRENCIES } from "./Utils/CurrencyUtils";

const PayPal: React.FC = () => {
  const currencyContext = useContext(CurrencyContext);
  const amountContext = useContext(ContextAmount);

  if (!currencyContext || !amountContext) {
    return <div>Error: Context not available</div>;
  }

  const { currency } = currencyContext;
  const { amount } = amountContext;

  return (
    <div>
      {currency},{amount} = {(CURRENCIES[currency] * amount).toFixed(2)} RSD
    </div>
  );
};

export default PayPal;
