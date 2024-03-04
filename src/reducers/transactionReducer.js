export const transactionReducer = (state, action) => {
  const { type, payload } = action;
  switch(type) {
    case "TRANSACTION_LIST":
      return { ...state, transactionListCtx: payload.transactions }
    

    case "DELETE_TRANSACTION":
      return { ...state, transactionListCtx: payload.transactions  }
    

    case "TIMELINE_LIST":
      return { ...state, timelineListCtx: payload.timelines }
    

    default:
      throw new Error("No case found in transactionContext");
  }
}
