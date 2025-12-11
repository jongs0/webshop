package eindproject.webshop.dto.order;

import eindproject.webshop.model.enums.PaymentMethod;

public record OrderUpdateDTO(
        PaymentMethod paymentMethod,
        Long addressId
) {}