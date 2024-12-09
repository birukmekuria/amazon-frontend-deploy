import React, { useEffect, useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { db, auth } from "../../Utility/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./Orders.module.css";
import ProductCard from "../../Components/Product/ProductCard";

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = auth.currentUser; // Get the current user
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const ordersQuery = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      // Cleanup the listener on unmount
      return () => unsubscribe();
    } else {
      setOrders([]); // Clear orders if no user is found
    }
  }, [auth, db]); // Added dependencies for clarity

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && (
            <div style={{ padding: "20px" }}>You don't have orders yet</div>
          )}
          {/* Ordered Items */}
          <div>
            {orders?.map((eachOrder) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder?.id}</p>
                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard flex={true} product={order} key={order.id} />
                ))}
              </div>
            ))}
          </div> 
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
