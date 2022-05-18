import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./AdminOrders.css";
import {
  getPayments,
  getQuantitySold,
  getAmountSold,
} from "../../redux/actions/mercadopagoActions";
import AdminCardPayment from "../AdminCardPayment/AdminCardPayment";
import { getMostSell } from "../../redux/actions/productActions";

export default function AdminOrders({ viewOrder }) {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.mercadoReducer.pagos);
  const price = useSelector((state) => state.mercadoReducer.price);
  const amount = useSelector((state) => state.mercadoReducer.amount);
  const sell = useSelector((state) => state.productReducer.productosTop);
  console.log(sell);
  useEffect(() => {
    dispatch(getMostSell());
    dispatch(getPayments());
    dispatch(getQuantitySold());
    dispatch(getAmountSold());
  }, [dispatch]);

  return (
    <div className="container-articulos">
      <div className="container_stats">
        <div className="container_productos">
          <p>Total Ventas</p>
          {<h1>${price?.order}</h1>}
        </div>
        <div className="container_productos">
          <p>Pruductos Vendidos</p>
          <h1>{amount?.amount}</h1>
        </div>
      </div>
      <div className="trabajo">
        {sell?.map((producto, i) => {
          return (
            <div className="matematicas">
              <p>{producto.name}</p>
            </div>
          );
        })}
      </div>
      <div>
        {payments.length ? (
          <div>
            {payments.length ? (
              <div>
                {payments?.map(
                  (producto, i) => (
                    <AdminCardPayment
                      viewOrder={viewOrder}
                      key={i}
                      status_delivery={producto.status_delivery}
                      email={producto.email}
                      total_paid_amount={producto.total_paid_amount}
                      order_id={producto.order_id}
                    />
                  )
                  /* picture, name, price, quantity, size, */
                )}
              </div>
            ) : (
              <p className="text-no-products">
                No se encontraron artículos con ese nombre
              </p>
            )}
          </div>
        ) : (
          <p className="text-no-products">Loading...</p>
        )}
      </div>
    </div>
  );
}
