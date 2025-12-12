package eindproject.webshop.dto.order;

import eindproject.webshop.model.order.OrderItem;

public record OrderItemDTO(
        Long id,
        Long productId,
        String productName,
        Integer quantity,
        Double lineTotal
) {
    public static OrderItemDTO fromEntity(OrderItem item) {
        return new OrderItemDTO(
                item.getId(),
                item.getProductId(),
                item.getProductName(),
                item.getQuantity(),
                item.getLineTotal()
        );
    }
}
