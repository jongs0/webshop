import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { API_URL } from "../../App";
import { currentUser } from "../../stores/UserStore";
import type { OrderDTO } from "../../types/models";

const UserOrderDetailComponent = () => {
  const userStore = currentUser();
  const { orderId } = useParams<{ orderId: string }>();

  // Haal alle orders op voor deze user
  const { data: orders, isLoading, error } = useQuery<OrderDTO[]>({
    queryKey: ["orders", userStore.id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/order/user/${userStore.id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": userStore.authHeader,
        },
      });
      if (!response.ok) throw new Error("Failed to load orders");
      return response.json();
    },
    enabled: !!userStore.authHeader && Number.isFinite(userStore.id),
  });

  if (!userStore.authHeader) return <p>Niet ingelogd</p>;
  if (isLoading) return <p>Orders laden...</p>;
  if (error) return <p>Fout bij ophalen orders</p>;
  if (!orders || orders.length === 0) return <p>Geen orders gevonden</p>;

  // Vind de specifieke order op basis van orderId, of gebruik de eerste
  const order = orderId
    ? orders.find((o) => o.id === Number(orderId))
    : orders[0];

  if (!order) return <p>Order niet gevonden</p>;

  return (
    <div className="container form">
      <div className="flex-row">
        <div>
          <h3>Order details</h3>
        </div>
        <div className="">
          <div className="item">
            <h3>Order #{order.id}</h3>
          </div>
          <div className="item">
            <h3>Payment: {order.paymentMethod}</h3>
          </div>
        </div>
      </div>

      {order.orderItems.map((item) => (
        <div key={item.id} className="item space-between">
          <div>
            <p>
              {item.productName} (x{item.quantity})
            </p>
          </div>
          <div>
            <p>€{item.lineTotal.toFixed(2)}</p>
          </div>
        </div>
      ))}

      <div className="item space-between">
        <div>
          <p><strong>Total price</strong></p>
        </div>
        <div>
          <p><strong>€{order.totalSum.toFixed(2)}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetailComponent;