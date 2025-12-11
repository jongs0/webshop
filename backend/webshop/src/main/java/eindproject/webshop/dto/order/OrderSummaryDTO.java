package eindproject.webshop.dto.order;

import eindproject.webshop.model.enums.PaymentMethod;
import eindproject.webshop.model.order.Order;

public record OrderSummaryDTO(
        Long id,
        Long userId,
        Double totalSum,
        PaymentMethod paymentMethod
) {
    public static OrderSummaryDTO fromEntity(Order order) {
        return new OrderSummaryDTO(
                order.getId(),
                order.getAppUser().getId(),
                order.getTotalSum(),
                order.getPaymentMethod()
        );
    }
}