import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { currentUser } from "../../stores/UserStore";
import { API_URL } from "../../App";
import type { OrderDTO } from "../../types/models";

const UserOrderHistoryComponent = () => {
  const userStore = currentUser();

  const { data: orders, isLoading, error } = useQuery<OrderDTO[]>({
    queryKey: ["orders", userStore.id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/order/user/${userStore.id}`, {
        headers: {
          Authorization: userStore.authHeader,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load orders");
      }

      return response.json();
    },
    enabled: !!userStore.authHeader && Number.isFinite(userStore.id),
  });

  if (!Number.isFinite(userStore.id)) return <p>Niet ingelogd</p>;
  if (isLoading) return <p>Orders laden...</p>;
  if (error) return <p>Fout bij ophalen orders</p>;
  if (!orders || orders.length === 0) return <p>Geen orders gevonden</p>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "calc(100vh - 200px)",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            margin: "0 0 24px 0",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          Order History
        </h2>

        {orders.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center", padding: "20px" }}>
            Geen orders gevonden
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {orders.map((order) => (
              <Link
                key={order.id}
                to={`/profile/orders/${order.id}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "#333",
                  backgroundColor: "#fff",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    Order #{order.id}
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {order.paymentMethod} • {order.orderItems?.length || 0} items
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#007bff",
                    }}
                  >
                    €{order.totalSum?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrderHistoryComponent;