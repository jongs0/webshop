import { useState } from "react";
import type { ProductAdminSummaryDTO, Category } from "../../../types/models";
import { categoryLabels } from "./config/productLabels";

interface ProductListComponentProps {
  products: ProductAdminSummaryDTO[];
  onAddProduct: () => void;
  onSelectProduct: (product: ProductAdminSummaryDTO) => void;
  onStockUpdate: (productId: number, newStock: number) => void;
}

const ProductListComponent = ({ products, onAddProduct, onSelectProduct, onStockUpdate }: ProductListComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | "ALL">("ALL");
  const [editingStockId, setEditingStockId] = useState<number | null>(null);
  const [editingStockValue, setEditingStockValue] = useState<string>("");

  const categories: (Category | "ALL")[] = ["ALL", "IPHONE", "IPAD", "MACBOOK", "IWATCH"];

  const filteredProducts = selectedCategory === "ALL" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const formatState = (state: string) => {
    return state.replace(/_/g, " ");
  };

  const handleStockClick = (e: React.MouseEvent, product: ProductAdminSummaryDTO) => {
    e.stopPropagation();
    setEditingStockId(product.id);
    setEditingStockValue(product.stock.toString());
  };

  const handleStockBlur = (productId: number) => {
    const newStock = parseInt(editingStockValue);
    if (!isNaN(newStock) && newStock >= 0) {
      onStockUpdate(productId, newStock);
    }
    setEditingStockId(null);
    setEditingStockValue("");
  };

  const handleStockKeyDown = (e: React.KeyboardEvent, productId: number) => {
    if (e.key === "Enter") {
      handleStockBlur(productId);
    } else if (e.key === "Escape") {
      setEditingStockId(null);
      setEditingStockValue("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>Products</h2>
          <button
            onClick={onAddProduct}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Add Product
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <label style={{ fontSize: "14px", fontWeight: "500", color: "#495057" }}>
            Filter by category:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category | "ALL")}
            style={{
              padding: "6px 12px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "white",
              color: "#000",
              cursor: "pointer",
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "ALL" ? "All Categories" : categoryLabels[cat]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ overflowX: "auto", flex: 1 }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
              <th
                style={{
                  padding: "12px 12px 12px 24px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: "12px 12px 12px 24px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "12px 12px 12px 24px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Category
              </th>
              <th
                style={{
                  padding: "12px 12px 12px 24px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Price
              </th>
              <th
                style={{
                  padding: "12px 12px 12px 24px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                Stock
              </th>
              <th
                style={{
                  padding: "12px 12px 12px 24px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#6c757d",
                  }}
                >
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  style={{
                    borderBottom: "1px solid #dee2e6",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  <td style={{ padding: "12px 12px 12px 24px", color: "#495057" }}>{product.id}</td>
                  <td style={{ padding: "12px 12px 12px 24px", color: "#495057", fontWeight: "500" }}>
                    {product.name}
                  </td>
                  <td style={{ padding: "12px 12px 12px 24px", color: "#495057" }}>
                    {categoryLabels[product.category]}
                  </td>
                  <td style={{ padding: "12px 12px 12px 24px", color: "#495057" }}>
                    €{product.price.toFixed(2)}
                  </td>
                  <td 
                    style={{ padding: "12px 12px 12px 24px", color: "#495057" }}
                    onClick={(e) => handleStockClick(e, product)}
                  >
                    {editingStockId === product.id ? (
                      <input
                        type="number"
                        value={editingStockValue}
                        onChange={(e) => setEditingStockValue(e.target.value)}
                        onBlur={() => handleStockBlur(product.id)}
                        onKeyDown={(e) => handleStockKeyDown(e, product.id)}
                        autoFocus
                        style={{
                          width: "80px",
                          padding: "4px 8px",
                          fontSize: "14px",
                          border: "2px solid #007bff",
                          borderRadius: "4px",
                          backgroundColor: "white",
                          color: "#000",
                          boxSizing: "border-box",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span style={{ cursor: "text", textDecoration: "underline", textDecorationStyle: "dotted" }}>
                        {product.stock}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "12px 12px 12px 24px", color: "#495057" }}>
                    {formatState(product.state)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListComponent;

