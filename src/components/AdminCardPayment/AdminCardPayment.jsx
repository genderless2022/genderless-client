import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeOrderState } from "../../redux/actions/mercadopagoActions";
import "./AdminCardPayment.css";

function AdminCardPayment({
  email,
  order_id,
  total_paid_amount,
  viewOrder,
  status_delivery
}) {
  const dispatch = useDispatch();
  const [delivery, setDelivery] = useState(status_delivery);
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
  function changeOrder(e) {
    let data = {
      id: order_id,
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
  }
  return (
    <div className="card_admin_slim">
      <div className="card_admin_slim2">
        <div className="card_admin_information">
          <p className="p_info_admin">Orden N˚{order_id}</p>
          <p className="p_info_admin">Total: ${total_paid_amount}</p>
          <p className="p_info_admin">Status Delivery: {delivery}</p>
          <p className="p_info_admin">{email}</p>
        </div>

        <div className="card_admin_slim3">
          <div className="container_buttons">
          <select className="button_change_order" onChange={changeOrder}>
              <option value="Creada">Creada</option>
              <option value="Procesando">Procesando</option>
              <option value="Completa">Completa</option>
              <option value="Enviado">Enviado</option>
              <option value="Cancelada">Cancelada</option>
            </select>
            <button className="button_change_order" onClick={goToOrder}>
              Ver Orden
            </button>
            <button className="button_cancel_order" onClick={changeOrder}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCardPayment;