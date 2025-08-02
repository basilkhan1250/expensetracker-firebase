'use client'

import { createContext, useState, useEffect } from "react";
import { db } from "../../../../firebaseConfig";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"

export const financeContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => { },
    removeIncomeItem: async () => { },
    addExpenseItem: async () => { },
})

export default function FinanceContextProvider({ children }) {
    const [income, setIncome] = useState([])
    const [expenses, setExpenses] = useState([])

    const addExpenseItem = async (expenseCatogaryId, newExpense) => {
        const docRef = doc(db, "expense", expenseCatogaryId)
        try {
            await updateDoc(docRef, { ...newExpense })

            setExpenses(prevState => {
                const updatedExpenses = [...prevState]
                const foundIndex = updatedExpenses.findIndex(expense => {
                    return expense.id === expenseCatogaryId
                })

                updatedExpenses[foundIndex] = { id: expenseCatogaryId, ...newExpense }
                console.log("success", updatedExpenses)
                return updatedExpenses
            })
        } catch (error) {
            console.error("failed", error.message)
            throw error
        }
    }

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

    const values = { income, expenses, addIncomeItem, removeIncomeItem, addExpenseItem }

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

            setExpenses(data)
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