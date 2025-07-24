import { currencyFormatter } from "@/app/lib/utils"

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
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-[25px] h-[25px] rounded-full bg-yellow-500" />
                <h4 className="capitalize">Entertainment</h4>
              </div>
              <p>{currencyFormatter(500)}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
