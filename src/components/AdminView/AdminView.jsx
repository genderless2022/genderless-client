import React, { useEffect /* useState */ } from "react";
import { useDispatch, useSelector } from "react-redux";
import { infoView } from "../../redux/actions/mercadopagoActions";
import "./AdminView.css";

function AdminView(id) {
  const dispatch = useDispatch();
  const views = useSelector((state) => state.mercadoReducer.view);

  /*  const [aproved, setAproved] = useState("approved");
    const [delivery, setDelivery] = useState("accredited"); */

  useEffect(() => {
    dispatch(infoView(id));
  }, [dispatch, id]);
  return (
    <div className="container_views">
      <div className="info_views">
        <h4>Orden N-{`${id.id}`}</h4>
        {views.map((e) => {
          return (
            <div className="container_info">
              <div className="clase_name">
                <p>{e.name}</p>
              </div>
              <div className="clase_quan">
                <p>x{e.quantity}</p>
              </div>
              <div className="clase_price">
                <p>${e.price_unit}</p>
              </div>
            </div>
          );
        })}
        <div className="container_total">
          <p>subtotal</p>
          {<p>${`${views[0]?.total_paid_amount}`}</p>}
        </div>

        <div className="container_info_user">
          <div className="dibujo">
          <p className="dibujo2">Nombre: Juan Manuel</p>
          <p className="dibujo2">Apellido: Lucrado</p>
          <p className="dibujo2">Direccion: Don bosco 4531</p>
          <p className="dibujo2">Codigo postal: 3000</p>

          </div>
          <div className="dibujo">
          <p className="dibujo2">Provincia: San Miguel de Tucuman y la ura</p>
          <p className="dibujo2">Telefono: 3715834085</p>
          <p className="dibujo2">Delivery: {`${views[0]?.status_delivery}`}</p>
          <p className="dibujo2">Status: {`${views[0]?.status}`}</p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminView;

/* import { useState } from "react";
import { useDispatch } from "react-redux";
import "./AdminCardPayment.css";
import { changeOrderState } from "../../redux/actions/mercadopagoActions";

function AdminCardPayment({
  picture,
  name,
  price,
  quantity,
  size,
  email,
  id,
  status_delivery,
  type_delivery,
  status,
  price_unit,
}) {
  const [delivery, setDelivery] = useState(status_delivery);
  const [aproved, setAproved] = useState(status);
  const dispatch = useDispatch();

  function changeOrder(e) {
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
  }
  function cancelOrder(e) {
    console.log(e);
    setDelivery("Cancelada");
    setAproved("cancelled");
  }
  return (
    <div className="card_admin_slim">
      zz
      <div className="card_admin_slim2">
        <div className="card_admin_information">
          <div className="card_info">
            <p>{name}</p>
            <p>calle del pingo en lata</p>
            <p>{email}</p>
          </div>
        </div>
        <div className="card_admin_slim3">
          <div>
            <p className="card-admin-slim-stock">${"none"}</p>
            <p className="slim_status">{type_delivery}</p>
          </div>
          <div>
            <p className="slim_status">{delivery}</p>
            <p className="">{aproved}</p>
          </div>
          <div className="">
            <p className="">Venta:{quantity}</p>
            <p className="">${price_unit}</p>
          </div>
          <div className="container_buttons">
            <select className="button_change_status" onChange={changeOrder}>
              <option value="Creada">Creada</option>
              <option value="Procesando">Procesando</option>
              <option value="Completa">Completa</option>
              <option value="Enviado">Enviado</option>
              <option value="Cancelada">Cancelada</option>
            </select>
            <button className="button_cancel_order" onClick={cancelOrder}>
              cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCardPayment;
 */
