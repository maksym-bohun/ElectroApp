import classes from "./PaymentHistory.module.css";
import PaymentHistoryItem from "./PaymentHistoryItem";

const DUMMY_PAYMENTS = [
  {
    paymentType: "Income",
    paymentSum: 300,
    type: "Selling",
    date: "01.03.2023",
    time: "12:04:33",
  },
  {
    paymentType: "Expense",
    paymentSum: 250,
    type: "Buying",
    date: "01.03.2023",
    time: "14:36:27",
  },
  {
    paymentType: "Expense",
    paymentSum: 10,
    type: "Commission",
    date: "01.03.2023",
    time: "15:12:42",
  },
  {
    paymentType: "Income",
    paymentSum: 1000,
    type: "Selling",
    date: "29.02.2023",
    time: "18:55:03",
  },
];

const PaymentHistory = ({ payments }) => {
  return (
    <>
      <h2 className={classes["heading-secondary"]}>Payment history</h2>
      <div className={classes.container}>
        <ul className={classes.list}>
          {DUMMY_PAYMENTS.map((payment) => (
            <PaymentHistoryItem
              paymentType={payment.paymentType}
              paymentSum={payment.paymentSum}
              type={payment.type}
              date={payment.date}
              time={payment.time}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default PaymentHistory;
