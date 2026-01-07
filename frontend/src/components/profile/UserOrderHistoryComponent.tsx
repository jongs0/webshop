import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { currentUser } from "../../stores/UserStore";
import { API_URL } from "../../App";
import type { AppUserDTO, OrderDTO } from "../../types/models";

const UserOrderHistoryComponent = () => {
  const userStore = currentUser();

  const { data: user, isLoading, error } = useQuery<AppUserDTO>({
    queryKey: ["profile", userStore.id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/user/${userStore.id}`, {
        headers: {
          Authorization: userStore.authHeader,
        },
      });

      if (!response.ok) {
        throw new Error("Not authenticated");
      }

      return response.json();
    },
    enabled: !!userStore.authHeader && Number.isFinite(userStore.id),
  });

  if (!Number.isFinite(userStore.id)) return <p>Niet ingelogd</p>;
  if (isLoading) return <p>Orders laden...</p>;
  if (error) return <p>Fout bij ophalen orders</p>;
  if (!user) return <p>Geen gebruikersdata gevonden</p>;

  const orders: OrderDTO[] = user.orders || [];

  return (
    <div className="container list">
      <h3>Order history</h3>
      
      {orders.length === 0 ? (
        <p>Geen orders gevonden</p>
      ) : (
        orders.map((order) => (
          <Link
            key={order.id}
            to={`/profile/orders/${order.id}`}
            className="item space-between"
          >
            <div>
              <p><strong>Order #{order.id}</strong></p>
              <p style={{ fontSize: "14px", opacity: 0.8 }}>
                {order.paymentMethod} • {order.orderItems?.length || 0} items
              </p>
            </div>
            <div>
              <p><strong>€{order.totalSum.toFixed(2)}</strong></p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default UserOrderHistoryComponent;


// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router";
// import { API_URL } from "../../App";
// import { currentUser } from "../../stores/UserStore";
// import type { OrderDTO } from "../../types/models";

// const UserOrderDetailComponent = () => {
//   const userStore = currentUser();
//   const { orderId } = useParams<{ orderId: string }>();

//   const { data: order, isLoading, error } = useQuery<OrderDTO>({
//     queryKey: ["order", orderId],
//     queryFn: async () => {
//       const response = await fetch(`${API_URL}/order/${orderId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": userStore.authHeader,
//         },
//       });
//       if (!response.ok) throw new Error("Failed to load order");
//       return response.json();
//     },
//     enabled: !!userStore.authHeader && !!orderId,
//   });

//   if (!userStore.authHeader) return <p>Niet ingelogd</p>;
//   if (isLoading) return <p>Order laden...</p>;
//   if (error) return <p>Fout bij ophalen order</p>;
//   if (!order) return <p>Order niet gevonden</p>;

//   return (
//     <div className="container form">
//       <div className="flex-row">
//         <div>
//           <h3>Order details</h3>
//         </div>
//         <div className="">
//           <div className="item">
//             <h3>Order #{order.id}</h3>
//           </div>
//           <div className="item">
//             <h3>Payment: {order.paymentMethod}</h3>
//           </div>
//         </div>
//       </div>

//       {order.orderItems.map((item) => (
//         <div key={item.id} className="item space-between">
//           <div>
//             <p>
//               {item.productName} (x{item.quantity})
//             </p>
//           </div>
//           <div>
//             <p>€{item.lineTotal.toFixed(2)}</p>
//           </div>
//         </div>
//       ))}

//       <div className="item space-between">
//         <div>
//           <p><strong>Total price</strong></p>
//         </div>
//         <div>
//           <p><strong>€{order.totalSum.toFixed(2)}</strong></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserOrderDetailComponent;

// // import { Link } from "react-router";

// // const UserOrderHistoryComponent = () => {
// //     return (
// //         <div className="container list">
// //             <div className="">
// //                 <h3>Order history</h3>
// //                 <Link to="/profile/orders/123" className="item space-between">
// //         <p>Order #123</p>
// //         <p>€249,00</p>
// //       </Link>

// //       <Link to="/profile/orders/124" className="item space-between">
// //         <p>Order #124</p>
// //         <p>€129,00</p>
// //       </Link>
// //             </div>
// //         </div>
// //     );
// // };

// // export default UserOrderHistoryComponent;