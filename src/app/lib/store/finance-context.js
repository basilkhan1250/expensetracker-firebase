'use client'

import { createContext, useState, useEffect } from "react";
import { db } from "../../../../firebaseConfig"
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"

export const financeContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => { },
    removeIncomeItem: async () => { },
})

export default function FinanceContextProvider({ children }) {
    const [income, setIncome] = useState([])
    const [expenses, setExpense] = useState([])

    const addIncomeItem = async (newIncome) => {

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

        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    const removeIncomeItem = async (incomeId) => {
        const docRef = doc(db, "income", incomeId)

        try {
            await deleteDoc(docRef)
            setIncome(prevState => {
                return prevState.filter(i => i.id !== incomeId)
            })
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    const values = { income, expenses, addIncomeItem, removeIncomeItem }

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

        const getExpenseData = async () => {
            const collectionRef = collection(db, "expense")
            const docsSnap = await getDocs(collectionRef)

            const data = docsSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })

            setExpense(data)
        }


        getIncomeData()
        getExpenseData()
    }, [])

    return (
        <financeContext.Provider value={values}>
            {children}
        </financeContext.Provider>
    )
}