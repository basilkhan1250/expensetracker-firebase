import { currencyFormatter } from "@/app/lib/utils"
import ViewExpenseModal from "./modals/ViewExpenseModal"
import { useState } from "react"

function ExpenseCatogoryItem({ color, title, total }) {
    const [showViewExpenseModal, setShowViewExpenseModal] = useState(false)

    return (
        <>
            <ViewExpenseModal show={showViewExpenseModal} onClose={setShowViewExpenseModal} />

            <button onClick={() => {
                setShowViewExpenseModal(true)
            }}>
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