import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useDocTitle } from "../../hooks";

import { Loading } from "../../components";
import { Form } from "./components/Form";

import { getUserTransactions } from "../../services";

export const Statement = () => {
  useDocTitle("Statement");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        setLoading(true);
        const data = await getUserTransactions();
        if(data) {
          setTransactions(data);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(data);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchUserTransactions();
  }, []); //eslint-disable-line

  return (
    <main>
      {loading && 
        <Loading/>
      }
      <section className="text-gray-800 dark:text-gray-100 text-center mb-10">
        <h3 className="text-2xl font-bold underline underline-offset-8">Generate Statement</h3>
      </section>
      <Form transactions={transactions} />
    </main>
  )
}
