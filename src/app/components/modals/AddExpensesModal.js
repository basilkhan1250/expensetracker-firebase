import { useState, useContext } from "react"
import Modal from "../Modal"
import { financeContext } from "@/app/lib/store/finance-context"
import { v4 as uuidv4 } from "uuid"


function AddExpensesModal({ show, onClose }) {
    const [expenseAmount, setExpenseAmount] = useState("")
    const [selectedCatagory, setSelectedCatagory] = useState(null)
    const { expenses } = useContext(financeContext)


    const AddExpenseItemHandler = () => {

        const expense = expenses.find(e => {
            return e.id === selectedCatagory
        })

        const newExpense = {
            color: expense.color,
            title: expense.title,
            total: expense.total + +expenseAmount,
            items: [
                ...expense.items,
                {
                    amount: +expenseAmount,
                    createdAt: new Date(),
                    id: uuidv4()
                }
            ]
        }
        console.log(newExpense)
        setExpenseAmount("")
        setSelectedCatagory(null)
        onclose()
    }


    return (
        <>
            <Modal show={show} onClose={onClose}>
                <div className="flex flex-col gap-4">
                    <label>Enter an amount</label>
                    <input
                        type="number"
                        min={0.01}
                        step={0.01}
                        placeholder="Enter expense amount"
                        value={expenseAmount}
                        onChange={(e) => { setExpenseAmount(e.target.value) }}
                    />
                </div>

                {expenseAmount > 0 && (
                    <div className="flex flex-col gap-4 mt-6">
                        <h3 className="text-2xl capitalize">Select Expense Catagory</h3>
                        {expenses.map(expense => {
                            return (
                                <button
                                    key={expense.id}
                                    onClick={() => {
                                        setSelectedCatagory(expense.id)
                                    }}>
                                    <div style={{
                                        boxShadow: expense.id === selectedCatagory ? "1px 1px 4px" : "none"
                                    }} className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
                                        <div className="flex items-center gap-2">
                                            <div className="w-[25px] h-[25px] rounded-full"
                                                style={{
                                                    backgroundColor: expense.color,
                                                }}
                                            />
                                            <h4 className="capitalize">{expense.title}</h4>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                )}
                {expenseAmount > 0 && selectedCatagory && (
                    <div className="mt-6 ">
                        <button
                            className="btn btn-primary"
                            onClick={AddExpenseItemHandler}>Add Expense
                        </button>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default AddExpensesModal