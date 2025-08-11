import { currencyFormatter } from "@/app/lib/utils";
import Modal from "../Modal"
import { FaRegTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { financeContext } from "@/app/lib/store/finance-context";

function ViewExpenseModal({ show, onClose, expense }) {
    // console.log("EXPENSE",expense)
    const { deleteExpenseItem, deleteExpenseCategory } = useContext(financeContext)


    const deleteExpenseHandler = async () => {      
        try {
            await deleteExpenseCategory(expense.id)
        } catch (error) {
            console.log(error.message)
        }
    }


    const deleteExpressItemHandler = async (item) => {
        try {
            // Remove the clicked item
            const updatedItems = expense.items.filter((i) => i.id !== item.id);

            // Recalculate total from the remaining items to avoid sync issues
            const updatedTotal = updatedItems.reduce((sum, i) => sum + i.amount, 0);

            const updatedExpense = {
                ...expense,
                items: updatedItems,
                total: updatedTotal,
            };

            await deleteExpenseItem(updatedExpense, expense.id);
        } catch (error) {
            console.log(error.message);
        }
    };


    return (
        <>
            <Modal show={show} onClose={onClose}>
                <div className="flex items-center justify-between">
                    <h2 className="text-4xl">{expense.title}</h2>
                    <button onClick={deleteExpenseHandler} className="btn btn-danger">Delete</button>
                </div>

                <div>
                    <h3 className="my-4 text-2xl">Expense History</h3>
                    {/* {console.log(expense)} */}
                    {expense.items.map((item, i) => {
                        console.log(expense.items[i])
                        console.log(JSON.stringify(expense.items[i], null, 2));

                        // const _date = (expense.items[i].createdAt)

                        return (
                            <div key={item.id} className="flex items-center justify-between">
                                <small>
                                    {item.createdAt && item.createdAt.toMillis
                                        ? new Date(item.createdAt.toMillis()).toISOString()
                                        : new Date(item.createdAt).toISOString()}
                                </small>
                                <p className="flex items-center gap-2">{currencyFormatter(item.amount)}</p>
                                <button onClick={() => {
                                    deleteExpressItemHandler(item)
                                }}><FaRegTrashAlt /></button>
                            </div>
                        )
                    })}
                </div>
            </Modal>
        </>
    )
}

export default ViewExpenseModal