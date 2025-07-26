import { useRef, useEffect } from "react"
import { currencyFormatter } from "@/app/lib/utils"
import { db } from "../../../../firebaseConfig"
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"
import { FaRegTrashAlt } from 'react-icons/fa'
import Modal from "@/app/components/Modal"



function AddIncomeModal({ show, onClose }) {
    const amountRef = useRef()
    const descriptionRef = useRef()

    // function handlers


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

            setIncome(prevState => {
                return [
                    ...prevState,
                    {
                        id: docSnap.id,
                        ...newIncome,
                    }
                ]
            })
            descriptionRef.current.value = ""
            amountRef.current.value = ""
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteIncomeEntryhandeler = async (incomeId) => {
        const docRef = doc(db, "income", incomeId)

        try {
            await deleteDoc(docRef)
            setIncome(prevState => {
                return prevState.filter(i => i.id !== incomeId)
            })
        } catch (error) {
            console.log(error.message)
        }
    }




    useEffect(() => {
        const getIncomeData = async () => {
            const collectionRef = collection(db, "income")
            const docsSnap = await getDocs(collectionRef)
            console.log(docsSnap.docs)
            const data = docsSnap.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    createAt: new Date(doc.data().createAt.toMillis())
                }
            })
            setIncome(data)
        }

        getIncomeData()
    }, [])


    return (
        <>
            <Modal show={show} onClose={onClose} >
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

                <div className="flex flex-col gap-4 mt-6">
                    <h3 className="text-2xl font-bold">Income History</h3>
                    {income.map((i) => {
                        return (
                            <div key={i.id} className="flex justify-between item-center">
                                <div>
                                    <p className="font-semibold">{i.description}</p>
                                    <small className="text-xs">{i.createAt.toISOString()}</small>
                                </div>
                                <p className="flex items-center gap-2">{currencyFormatter(i.amount)}
                                    <button onClick={() => {
                                        deleteIncomeEntryhandeler(i.id)
                                    }}>
                                        <FaRegTrashAlt />
                                    </button>
                                </p>
                            </div>
                        )
                    })}
                </div>
            </Modal >
        </>
    )
}

export default AddIncomeModal