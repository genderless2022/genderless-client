import { useDispatch } from "react-redux";
import { changeOrderState } from "../../redux/actions/mercadopagoActions";
import "./AdminCardPayment.css";

function AdminCardPayment({
  email,
  order_id,
  total_paid_amount,
  viewOrder
}) {
  const dispatch = useDispatch();

  /* function changeOrder(e) {
    let data = {
      id: id,
      state: e.target.value,
    };
    if (delivery === "Cancelada") {
      setDelivery("Cancelada");
    } else {
      setDelivery(e.target.value);
    }
    if (data.id) {
      dispatch(changeOrderState(data));
    }
  } */
  function goToOrder(e) {
    console.log(e);
    viewOrder(order_id)
  }
  function cancelOrder() {
    let data = {
      id: order_id,
      state: "Cancelada",
    };
    if (data) {
      console.log("entramos");
      dispatch(changeOrderState(data));
    }
  }
  return (
    <div className="card_admin_slim">
      <div className="card_admin_slim2">
        <div className="card_admin_information">
          <p>Orden N˚{order_id}</p>
          <p>Total: ${total_paid_amount}</p>
          <p>{email}</p>
        </div>

        <div className="card_admin_slim3">
          <div className="container_buttons">
            <button className="button_cancel_order" onClick={goToOrder}>
              Ver Orden
            </button>
            <button className="button_cancel_order" onClick={cancelOrder}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCardPayment;