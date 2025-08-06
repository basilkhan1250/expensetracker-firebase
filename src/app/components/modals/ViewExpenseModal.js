import Modal from "../Modal"

function ViewExpenseModal({ show, onClose, expense }) {
    // console.log("EXPENSE",expense)
    return (
        <>
            <Modal show={show} onClose={onClose}>
                <div className="flex items-center justify-between">
                    <h2 className="text-4xl">{expense.title}</h2>
                    <button className="btn btn-danger">Delete</button>
                </div>

                <div>
                    <h3 className="my-4 text-2xl">Expense History</h3>
                    {/* {console.log(expense)} */}
                    {expense.items.map((item,i) => {
                        console.log(expense.items[i])
                        // const _date = (expense.items[i].createdAt)
                        
                        return <div key={item.id} className="flex items-center justify-between">
                            <small>

                                {/* { _date } */}
                                    
                            </small>
                        </div>
                    })}
                </div>
            </Modal>
        </>
    )
}

export default ViewExpenseModal