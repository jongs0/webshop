package eindproject.webshop.dto.order;

import eindproject.webshop.dto.adress.AdressDTO;
import eindproject.webshop.model.enums.PaymentMethod;

import java.util.List;

public record OrderCreateDTO(
        Long userId,
        PaymentMethod paymentMethod,
        List<OrderItemDTO> items
) { }

