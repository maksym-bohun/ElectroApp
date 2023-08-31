import classes from "./PaymentHistoryItem.module.css";

const PaymentHistoryItem = ({ paymentType, paymentSum, type, date, time }) => {
  return (
    <div className={classes.container}>
      <p>
        {paymentType}: {paymentSum} UAH
      </p>
      <p>Type: {type}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <div className={classes.btn}>
        <div>...</div>
      </div>
    </div>
  );
};

export default PaymentHistoryItem;
