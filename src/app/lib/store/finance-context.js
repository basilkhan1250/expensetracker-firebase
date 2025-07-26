import { useContext } from "react";

const financeContext = createContext({
    income: [],
    addIncomeItem: async () => { },
    removeIncomeItem: async () => { },
})


export default function FinanceContextProvider({ children }) {
    return <financeContext.Provider value={income: ["test"]}>
        {children}
    </financeContext.Provider>
}