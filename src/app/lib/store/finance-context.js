'use client'

import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../../../../firebaseConfig";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore"
import { authContext } from "../../../../auth-context";

export const financeContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => { },
    removeIncomeItem: async () => { },
    addExpenseItem: async () => { },
    addCategory: async () => { },
    deleteExpenseItem: async () => { },
    deleteExpenseCategory: async () => { },
})

export default function FinanceContextProvider({ children }) {
    const [income, setIncome] = useState([])
    const [expenses, setExpenses] = useState([])
    const { user } = useContext(authContext)

    const addCategory = async (Category) => {
        try {
            const collectionRef = collection(db, "expense")
            const docSnap = await addDoc(collectionRef, {

                uid: user.uid,
                ...Category,
                items: [],
            })

            setExpenses(prevExpenses => {
                return [
                    ...prevExpenses,
                    {
                        id: docSnap.id,
                        uid: user.uid,
                        items: [],
                        ...Category
                    }
                ]
            })
        } catch (error) {
            throw error
        }
    }


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

    const deleteExpenseItem = async (updatedExpense, expenseCatogaryId) => {
        try {
            const docRef = doc(db, "expense", expenseCatogaryId)
            await updateDoc(docRef, {
                ...updatedExpense
            })

            setExpenses(prevExpense => {
                const updatedExpenses = [...prevExpense]
                const pos = updatedExpenses.findIndex((ex) => ex.id === expenseCatogaryId)
                updatedExpenses[pos].items = [...updatedExpense.items]
                updatedExpenses[pos].total = updatedExpense.total
                return updatedExpenses

            })
        } catch (error) {
            throw error
        }
    }

    const deleteExpenseCategory = async (expenseCatogaryId) => {

        try {
            const docRef = doc(db, "expenses", expenseCatogaryId)
            await deleteDoc(docRef)

            setExpenses((prevExpenses) => {
                const updatedExpenses = prevExpenses.filter((expense) => expense.id !== expenseCatogaryId)
                return [...updatedExpenses]
            })
        } catch (error) {
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
    const values = { income, expenses, addIncomeItem, removeIncomeItem, addExpenseItem, addCategory, deleteExpenseItem, deleteExpenseCategory }


    useEffect(() => {
        if (!user) return
        const getIncomeData = async () => {
            const collectionRef = collection(db, "income")
            const q = query(collectionRef, where("uid", "==", user.uid))
            const docsSnap = await getDocs(q)
            console.log(docsSnap.docs)
            const data = docsSnap.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    createAt: new Date(doc.data().createAt.toMillis())
                }
            })
            console.log(docsSnap.docs)
            console.log(data)
            setIncome(data)
        }

        const getExpenseData = async () => {
            const collectionRef = collection(db, "expense")
            const q = query(collectionRef, where("uid", "==", user.uid))

            const docsSnap = await getDocs(q)

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
    }, [user])

    return (
        <financeContext.Provider value={values}>
            {children}
        </financeContext.Provider>
    )
}