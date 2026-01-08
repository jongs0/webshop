import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { currentUser } from "../../stores/UserStore";
import { API_URL } from "../../App";
import type { OrderDTO } from "../../types/models";

const UserOrderDetailComponent = () => {
  const userStore = currentUser();
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const { data: order, isLoading, error } = useQuery<OrderDTO>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/order/${orderId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": userStore.authHeader,
        },
      });
      if (!response.ok) throw new Error("Failed to load order");
      return response.json();
    },
    enabled: !!userStore.authHeader && !!orderId,
  });

  if (!userStore.authHeader) return <p>Niet ingelogd</p>;
  if (isLoading) return <p>Order laden...</p>;
  if (error) return <p>Fout bij ophalen order</p>;
  if (!order) return <p>Order niet gevonden</p>;

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
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>
            Order Details
          </h2>
          <button
            onClick={() => navigate("/profile/orders")}
            style={{
              background: "none",
              border: "none",
              fontSize: "14px",
              cursor: "pointer",
              color: "#666",
              padding: "8px",
              textDecoration: "underline",
            }}
          >
            ← Back
          </button>
        </div>

        {/* Order Info */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "1px solid #eee",
          }}
        >
          <div style={{ flex: 1 }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#666",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Order Number
            </label>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
              #{order.id}
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#666",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Payment Method
            </label>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
              {order.paymentMethod}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              margin: "0 0 16px 0",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Order Items
          </h3>
          {order.orderItems && order.orderItems.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {order.orderItems.map((item) => {
                const pricePerItem = item.lineTotal / item.quantity;
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: "16px",
                      border: "1px solid #eee",
                      borderRadius: "4px",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#333",
                        }}
                      >
                        {item.productName}
                      </p>
                      <p
                        style={{
                          margin: "4px 0 0 0",
                          fontSize: "14px",
                          color: "#666",
                        }}
                      >
                        Quantity: {item.quantity} × €{pricePerItem.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#007bff",
                        }}
                      >
                        €{item.lineTotal?.toFixed(2) || "0.00"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: "#666", textAlign: "center", padding: "20px" }}>
              Geen items gevonden
            </p>
          )}
        </div>

        {/* Address */}
        {order.address && (
          <div
            style={{
              marginBottom: "24px",
              paddingBottom: "16px",
              borderBottom: "1px solid #eee",
            }}
          >
            <h3
              style={{
                margin: "0 0 16px 0",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Delivery Address
            </h3>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#fafafa",
                borderRadius: "4px",
                border: "1px solid #eee",
              }}
            >
              <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>
                {order.address.street} {order.address.houseNumber}
              </p>
              <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#333" }}>
                {order.address.postalCode} {order.address.city}
              </p>
            </div>
          </div>
        )}

        {/* Total */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "16px",
            borderTop: "2px solid #ddd",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Total Price
            </p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: "700",
                color: "#007bff",
              }}
            >
              €{order.totalSum?.toFixed(2) || "0.00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetailComponent;