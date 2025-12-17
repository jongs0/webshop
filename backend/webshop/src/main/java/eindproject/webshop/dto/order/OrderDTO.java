package eindproject.webshop.dto.order;

import eindproject.webshop.dto.adress.AdressDTO;
import eindproject.webshop.model.enums.PaymentMethod;
import eindproject.webshop.model.order.Order;

import java.util.List;

public record OrderDTO(
        Long id,
        Long userId,
        Double totalSum,
        PaymentMethod paymentMethod,
        AdressDTO address,
        List<OrderItemDTO> orderItems
) {
    public static OrderDTO fromEntity(Order order) {

        List<OrderItemDTO> orderItems = order.getOrderItems() == null ? List.of()
                : order.getOrderItems().stream()
                .map(OrderItemDTO::fromEntity)
                .toList();

        AdressDTO addressDTO = order.getAddress() != null
                ? AdressDTO.fromEntity(order.getAddress())
                : null;

        return new OrderDTO(
                order.getId(),
                order.getAppUser().getId(),
                order.getTotalSum(),
                order.getPaymentMethod(),
                addressDTO,
                orderItems
        );
    }
}