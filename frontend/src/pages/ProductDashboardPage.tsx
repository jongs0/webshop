import { useState, useEffect } from "react";
import type { ProductAdminSummaryDTO, Category } from "../types/models";
import ProductListComponent from "../components/product dashboard/ProductListComponent";
import ProductCreatePopupComponent from "../components/product dashboard/ProductCreatePopupComponent";
import ProductEditPopupComponent from "../components/product dashboard/ProductEditPopupComponent";
import ProductDetailComponent from "../components/product dashboard/ProductDetailComponent";
import { categoryLabels } from "../components/product dashboard/config/productLabels";
import { API_URL } from "../App";
import { updateUser } from "../stores/UserStore";

const authHeaders = {
  "Content-Type": "application/json",
  Authorization: `Basic ${btoa("admin@webshop.com:admin123")}`,
};

const getCategoryEndpoint = (category: Category): string => {
  switch (category) {
    case "IPHONE":
      return "iphone";
    case "IPAD":
      return "ipad";
    case "MACBOOK":
      return "macbook";
    case "IWATCH":
      return "iwatch";
    default:
      throw new Error(`Unknown category: ${category}`);
  }
};

const fetchProductDetails = async (
  id: number,
  category: Category
): Promise<Record<string, any> | null> => {
  const endpoint = getCategoryEndpoint(category);
  const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
    headers: authHeaders,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  const product = await response.json();
  return { ...product, category };
};

type ViewMode = "create" | "view" | "edit" | null;

const ProductDashboardPage = () => {
  const [products, setProducts] = useState<ProductAdminSummaryDTO[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Record<string, any> | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(null);
  const [loading, setLoading] = useState(false);
  const [showCategorySelector, setShowCategorySelector] = useState(false);

  const categories: Category[] = ["IPHONE", "IPAD", "MACBOOK", "IWATCH"];

  useEffect(() => {

    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/products/all`, {
          headers: authHeaders,
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddProduct = () => {
    setShowCategorySelector(true);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    setViewMode("create");
    setShowCategorySelector(false);
  };

  const saveImageUrls = (productId: number, category: Category, imageUrls: string[]) => {
    const key = `product_images_${productId}`;
    if (imageUrls && imageUrls.length > 0) {
      localStorage.setItem(key, JSON.stringify(imageUrls));
    } else {
      localStorage.removeItem(key);
    }
  };

  const getImageUrls = (productId: number, category: Category): string[] => {
    const key = `product_images_${productId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  };

  const handleSelectProduct = async (product: ProductAdminSummaryDTO) => {
    setLoading(true);
    try {
      const fullProduct = await fetchProductDetails(product.id, product.category);
      if (fullProduct) {
        const storedImageUrls = getImageUrls(product.id, product.category);
        setSelectedProduct({ ...fullProduct, imageUrls: storedImageUrls });
        setSelectedCategory(product.category);
        setViewMode("view");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setViewMode("edit");
  };

  const handleSave = async (productData: Record<string, any>) => {
    const imageUrls = Array.isArray(productData.imageUrls) ? productData.imageUrls : [];
    const processedData = { ...productData };
    delete processedData.imageUrls;
    if (!selectedCategory) return;

    setLoading(true);
    try {
      const endpoint = getCategoryEndpoint(selectedCategory);

      if (viewMode === "create") {
        const response = await fetch(`${API_URL}/${endpoint}`, {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify(processedData),
        });

        if (!response.ok) {
          throw new Error(`Failed to create product: ${response.statusText}`);
        }

        const createdProduct = await response.json();
        if (imageUrls.length > 0) {
          saveImageUrls(createdProduct.id, selectedCategory, imageUrls);
        }

        const responseProducts = await fetch(`${API_URL}/products/all`, {
          headers: authHeaders,
        });
        if (responseProducts.ok) {
          const updatedProducts = await responseProducts.json();
          setProducts(updatedProducts);
        }

        setViewMode(null);
        setSelectedProduct(null);
        setSelectedCategory(null);
      } else if (viewMode === "edit" && selectedProduct?.id) {
        const response = await fetch(`${API_URL}/${endpoint}/${selectedProduct.id}`, {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify(processedData),
        });

        if (!response.ok) {
          throw new Error(`Failed to update product: ${response.statusText}`);
        }

        const updatedProduct = await response.json();
        if (imageUrls.length > 0) {
          saveImageUrls(updatedProduct.id, selectedCategory, imageUrls);
        }
        const storedImageUrls = getImageUrls(updatedProduct.id, selectedCategory);
        setSelectedProduct({ ...updatedProduct, category: selectedCategory, imageUrls: storedImageUrls });

        const responseProducts = await fetch(`${API_URL}/products/all`, {
          headers: authHeaders,
        });
        if (responseProducts.ok) {
          const updatedProducts = await responseProducts.json();
          setProducts(updatedProducts);
        }

        setViewMode("view");
      }
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setViewMode(null);
    setSelectedProduct(null);
    setSelectedCategory(null);
    setShowCategorySelector(false);
  };

  const handleClose = () => {
    setViewMode(null);
    setSelectedProduct(null);
    setSelectedCategory(null);
  };

  const handleStockUpdate = async (productId: number, newStock: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setLoading(true);
    try {
      const endpoint = getCategoryEndpoint(product.category);
      const response = await fetch(`${API_URL}/${endpoint}/${productId}`, {
        headers: authHeaders,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`);
      }

      const fullProduct = await response.json();
      const updatedProduct = { ...fullProduct, stock: newStock };

      const updateResponse = await fetch(`${API_URL}/${endpoint}/${productId}`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(updatedProduct),
      });

      if (!updateResponse.ok) {
        throw new Error(`Failed to update stock: ${updateResponse.statusText}`);
      }

      const responseProducts = await fetch(`${API_URL}/products/all`, {
        headers: authHeaders,
      });
      if (responseProducts.ok) {
        const updatedProducts = await responseProducts.json();
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "calc(100vh - 100px)",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        <ProductListComponent
          products={products}
          onAddProduct={handleAddProduct}
          onSelectProduct={handleSelectProduct}
          onStockUpdate={handleStockUpdate}
        />
      </div>

      {viewMode === "create" && selectedCategory && (
        <ProductCreatePopupComponent
          category={selectedCategory}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {viewMode === "view" && selectedProduct && selectedCategory && (
        <ProductDetailComponent
          category={selectedCategory}
          product={selectedProduct}
          onEdit={handleEdit}
          onClose={handleClose}
        />
      )}

      {viewMode === "edit" && selectedProduct && selectedCategory && (
        <ProductEditPopupComponent
          category={selectedCategory}
          product={selectedProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {showCategorySelector && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCategorySelector(false);
            }
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              minWidth: "300px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: "600" }}>
              Select Product Category
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    textAlign: "left",
                  }}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowCategorySelector(false)}
              style={{
                marginTop: "16px",
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                width: "100%",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
};

export default ProductDashboardPage;
