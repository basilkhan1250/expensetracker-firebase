import { currencyFormatter } from "@/app/lib/utils"
import ExpenseCatogoryItem from "@/app/components/ExpenseCatogoryItem"


const DUMMY_DATE = [
  {
    id: 1,
    title: "Entertainment",
    color: "#613",
    amount: 500
  },
  {
    id: 2,
    title: "Bike Repair",
    color: "#483",
    amount: 300
  },
  {
    id: 3,
    title: "Petrol",
    color: "#519",
    amount: 100
  },
  {
    id: 4,
    title: "House Paint",
    color: "#353",
    amount: 1000
  },
  {
    id: 5,
    title: "Laptop",
    color: "#720",
    amount: 700
  },
]

export default function Home() {
  return (
    <>
      <main className="container max-w-2xl px-6 py-6 mx-auto">

        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button className="btn btn-primary">+ Expenses</button>
          <button className="btn btn-primary-outline">+ Income</button>
        </section>

        {/* Expenses */}

        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>

          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_DATE.map((expense, id) => {
              return (
                <ExpenseCatogoryItem
                  key={expense.id}
                  color={expense.color}
                  title={expense.title}
                  amount={expense.amount}
                />
              )
            })}


          </div>
        </section>
      </main>
    </>
  );
}
