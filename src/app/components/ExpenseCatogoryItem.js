import { currencyFormatter } from "@/app/lib/utils"


function ExpenseCatogoryItem({ color, title, total }) {
    return (
        <>
            <button>
                <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-4xl">
                    <div className="flex items-center gap-2">
                        <div className="w-[25px] h-[25px] rounded-full" style={{ backgroundColor: color }} />
                        <h4 className="capitalize">{title}</h4>
                    </div>
                    <p>{currencyFormatter(total)}</p>
                </div>
            </button>
        </>
    )
}

export default ExpenseCatogoryItem