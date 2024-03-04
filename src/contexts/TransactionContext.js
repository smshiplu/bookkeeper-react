import { createContext, useContext, useReducer } from "react";
import { transactionReducer } from "../reducers";

const transactionInitialState = {
  transactionListCtx: [],
  timelineListCtx: []
}

const TransactionContext = createContext(transactionInitialState);

export const TransactionProvider = ({children}) => {

  const [state, dispatch] = useReducer(transactionReducer, transactionInitialState);

  function setTransactionListCtx(transactions) {
    dispatch({
      type: "TRANSACTION_LIST",
      payload: {
        transactions: transactions
      }
    })
  }

  function deleteTransactionCtx(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: {
        transactions: state.transactionListCtx.filter(item => item.id !== id)
      }
    })
  }

  function setTimelineListCtx(timelines) {
    dispatch({
      type: "TIMELINE_LIST",
      payload: {
        timelines: timelines
      }
    })
  }
  
  const value = {
    setTransactionListCtx,
    transactionListCtx: state.transactionListCtx,
    setTimelineListCtx,
    timelineListCtx: state.timelineListCtx,
    deleteTransactionCtx
  }

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )

}

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  return context;
} 