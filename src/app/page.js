'use client'

import { currencyFormatter } from "@/app/lib/utils"
import ExpenseCatogoryItem from "@/app/components/ExpenseCatogoryItem"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { useState, useContext, useEffect } from "react"
import { financeContext } from "./lib/store/finance-context"
import AddIncomeModal from "@/app/components/modals/AddIncomeModal"
import AddExpensesModal from "./components/modals/AddExpensesModal"


ChartJS.register(ArcElement, Tooltip, Legend);


export default function Home() {
  const [showAddIncomeModal, setshowAddIncomeModal] = useState(false)
  const [showAddExpenseModal, setshowAddExpenseModal] = useState(false)
  const [balance, setBalance] = useState(0)
  const { expenses, income } = useContext(financeContext)

  useEffect(() => {

    const newBalance = income.reduce((total, i) => {
      return total + i.amount
    }, 0)
    expenses.reduce((total, e) => {
      return total + e.total
    }, 0)

    setBalance(newBalance)
  }, [expenses, income])

  return (
    <>
      <AddIncomeModal show={showAddIncomeModal} onClose={setshowAddIncomeModal} />

      <AddExpensesModal show={showAddExpenseModal} onClose={setshowAddExpenseModal} />

      <main className="container max-w-2xl px-6 py-6 mx-auto">

        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">

          <button
            onClick={() => {
              setshowAddExpenseModal(true)
            }} className="btn btn-primary">+ Expenses</button>

          <button
            onClick={() => {
              setshowAddIncomeModal(true)
            }}
            className="btn btn-primary-outline">+ Income</button>

        </section>

        {/* Expenses */}

        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>

          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense, id) => {
              // console.log("EXPENSES",expense)
              return (
                <ExpenseCatogoryItem
                  key={expense.id}
                  expense={expense}
                // color={expense.color}
                // title={expense.title}
                // total={expense.total}
                />
              )
            })}
          </div>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut data={{
              labels: expenses.map(expense => expense.title),
              datasets: [
                {
                  label: "Expenses",
                  data: expenses.map(expense => expense.total),
                  backgroundColor: expenses.map(expense => expense.color),
                  borderColor: ['#18181b'],
                  borderWidth: 4
                }
              ]
            }} />
          </div>
        </section>
      </main>
    </>
  );
}
