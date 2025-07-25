'use client'

import { currencyFormatter } from "@/app/lib/utils"
import ExpenseCatogoryItem from "@/app/components/ExpenseCatogoryItem"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { useState } from "react"


ChartJS.register(ArcElement, Tooltip, Legend);


const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: "#613",
    total: 500
  },
  {
    id: 2,
    title: "Bike Repair",
    color: "#890",
    total: 300
  },
  {
    id: 3,
    title: "Petrol",
    color: "#519",
    total: 100
  },
  {
    id: 4,
    title: "Laptop",
    color: "#190",
    total: 700
  },
  {
    id: 5,
    title: "House Paint",
    color: "#399",
    total: 1000
  },

]

export default function Home() {

  const [modalIsOpen, setModalIsOpen] = useState(false)


  return (
    <>
      {modalIsOpen && (
        < div className="absolute top-0 left-0 w-full h-full z-10">
          <div className="container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-slate-800 py-6 px-4 ">
            <button
              onClick={() => {
                setModalIsOpen(false)
              }}
              className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600">X</button>
            <h3>I'm a modal</h3>
          </div>
        </div >
      )}

      <main className="container max-w-2xl px-6 py-6 mx-auto">

        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              setModalIsOpen(true)
            }} className="btn btn-primary">+ Expenses</button>
          <button className="btn btn-primary-outline">+ Income</button>
        </section>

        {/* Expenses */}

        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>

          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_DATA.map((expense, id) => {
              return (
                <ExpenseCatogoryItem
                  key={expense.id}
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              )
            })}
          </div>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut data={{
              labels: DUMMY_DATA.map(expense => expense.title),
              datasets: [
                {
                  label: "Expenses",
                  data: DUMMY_DATA.map(expense => expense.total),
                  backgroundColor: DUMMY_DATA.map(expense => expense.color),
                  borderColor: ['#18181b'],
                  borderWidth: 2
                }
              ]
            }} />
          </div>
        </section>
      </main>
    </>
  );
}
