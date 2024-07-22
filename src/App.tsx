import { createContext, useState } from "react";
import Payment from "./Components/Payment";
import { CURRENCIES } from "./Components/Utils/CurrencyUtils";

interface CurrencyContextType {
  currency: keyof typeof CURRENCIES;
  updateCurrency: (currency: keyof typeof CURRENCIES) => void;
}

interface amountContextType {
  amount: number;
  updateAmount: (value: number) => void;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);
export const ContextAmount = createContext<amountContextType | undefined>(
  undefined
);

const App: React.FC = () => {
  const [currency, setCurrency] = useState<keyof typeof CURRENCIES>("EUR");
  const [amount, setAmount] = useState<number>(0);

  const updateCurrency = (currency: keyof typeof CURRENCIES) => {
    setCurrency(currency);
  };
  const updateAmount = (value: number) => {
    setAmount(value);
  };

  return (
    <div>
      <CurrencyContext.Provider value={{ currency, updateCurrency }}>
        <ContextAmount.Provider value={{ amount, updateAmount }}>
          <Payment />
        </ContextAmount.Provider>
      </CurrencyContext.Provider>

      <input
        type="number"
        onChange={(e) => updateAmount(Number(e.target.value))}
      />
      <select
        name="currency"
        id="currency"
        onChange={(e) =>
          updateCurrency(e.target.value as keyof typeof CURRENCIES)
        }
      >
        {Object.keys(CURRENCIES).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default App;
