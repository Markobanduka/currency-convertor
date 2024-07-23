import { createContext, useReducer, useState } from "react";
import Payment from "./Components/Payment";
import { CURRENCIES } from "./Components/Utils/CurrencyUtils";
import { userReducer, initialUserState } from "./Reducers/User";

interface CurrencyContextType {
  currency: keyof typeof CURRENCIES;
  updateCurrency: (currency: keyof typeof CURRENCIES) => void;
}

interface AmountContextType {
  amount: number;
  updateAmount: (value: number) => void;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);
export const ContextAmount = createContext<AmountContextType | undefined>(
  undefined
);

const App: React.FC = () => {
  const [userState, dispatch] = useReducer(userReducer, initialUserState);
  const [currency, setCurrency] = useState<keyof typeof CURRENCIES>("EUR");
  const [amount, setAmount] = useState<number>(0);

  const updateCurrency = (currency: keyof typeof CURRENCIES) => {
    setCurrency(currency);
  };

  const updateAmount = (value: number) => {
    setAmount(value);
  };

  const saveUser = () => {
    if (userState.username.trim() === "" || userState.money === 0) {
      console.log("Please enter both username and money");
      return;
    }
    dispatch({ type: "SET_USER_CREATED", payload: true });
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

      {!userState.isUserCreated && (
        <form>
          <input
            placeholder="Enter your username"
            type="text"
            onChange={(e) =>
              dispatch({ type: "SET_USERNAME", payload: e.target.value })
            }
          />
          <input
            placeholder="Enter amount"
            type="number"
            onChange={(e) =>
              dispatch({ type: "SET_MONEY", payload: Number(e.target.value) })
            }
          />
          <button type="button" onClick={saveUser}>
            Create user
          </button>
        </form>
      )}

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
