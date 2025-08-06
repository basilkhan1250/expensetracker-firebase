import Modal from "../Modal"

function ViewExpenseModal({ show, onClose }) {
    return (
        <>
            <Modal show={show} onClose={onClose}>
                <h3>Expense Details Modal</h3>
            </Modal>
        </>
    )
}

export default ViewExpenseModal