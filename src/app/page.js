'use client'

import { currencyFormatter } from "@/app/lib/utils"
import ExpenseCatogoryItem from "@/app/components/ExpenseCatogoryItem"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { useState, useRef } from "react"
import Modal from "@/app/components/Modal"
import { db } from "../../firebaseConfig"
import { collection, addDoc } from "firebase/firestore"


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

  const [showAddIncomeModal, setshowAddIncomeModal] = useState(false)
  const amountRef = useRef()
  const descriptionRef = useRef()

  const addIncomeHandler = async (e) => {
    e.preventDefault()

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createAt: new Date()
    }
    console.log(newIncome)
    const collectionRef = collection(db, "income")

    try {
      const docSnap = await addDoc(collectionRef, newIncome)

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Modal show={showAddIncomeModal} onClose={setshowAddIncomeModal} >
        <form onSubmit={addIncomeHandler} className="input-groups">
          <div className="input-groups">
            <label htmlFor="amount">Income Amount</label>
            <input name="amount" type="number" ref={amountRef} min={0.01} step={0.01} placeholder="Enter Income Amount" required />
          </div>

          <div className="input-groups">
            <label htmlFor="amount">description</label>
            <input name="description" type="text" ref={descriptionRef} placeholder="Enter Description" required />
          </div>

          <button type="submit" className="btn btn-primary">Add Entry</button>
        </form>
      </Modal >

      <main className="container max-w-2xl px-6 py-6 mx-auto">

        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => { }} className="btn btn-primary">+ Expenses</button>
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
