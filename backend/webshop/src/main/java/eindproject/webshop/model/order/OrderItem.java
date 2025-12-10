package eindproject.webshop.model.order;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
public class OrderItem {
    @Id
    @GeneratedValue
    Long id;
    @NotNull
    Long productId;
    String productName;
    @NotNull
    Integer quantity;
    Double lineTotal;
    @ManyToOne
    @JoinColumn(name = "order_id")
    Order order;

    public Long getId() {
        return id;}

    public Long getProductId() {
        return productId;}
    public void setProductId(Long productId) {
        this.productId = productId;}

    public String getProductName() {
        return productName;}
    public void setProductName(String productName) {
        this.productName = productName;}

    public Integer getQuantity() {
        return quantity;}
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;}

    public Double getLineTotal() {
        return lineTotal;}
    public void setLineTotal(Double lineTotal) {
        this.lineTotal = lineTotal;}

    public Order getOrder() {
        return order;}
    public void setOrder(Order order) {
        this.order = order;}

    // calculateLineTotal in OrderService?
    // public Double calculateLineTotal(Integer quantity, Long productId) {
    // Double price = productRepository.findById(productId).getPrice();
    // Double total = price * quantity;
    // return total;}
}




