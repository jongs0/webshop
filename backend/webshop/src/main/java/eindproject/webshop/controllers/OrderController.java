package eindproject.webshop.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import eindproject.webshop.dto.order.OrderCreateDTO;
import eindproject.webshop.dto.order.OrderDTO;
import eindproject.webshop.model.enums.PaymentMethod;
import eindproject.webshop.service.CheckOutService;
import eindproject.webshop.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;
    private final CheckOutService checkOutService;

    public OrderController(OrderService orderService,
                           CheckOutService checkOutService) {
        this.orderService = orderService;
        this.checkOutService = checkOutService;
    }

    @PostMapping("/{appUserId}/checkout")
    public OrderDTO checkout(
            @PathVariable Long appUserId,
            @RequestParam PaymentMethod paymentMethod
    ) {
        return checkOutService.checkout(appUserId, paymentMethod);
    }


    @GetMapping("/{orderId}")
    public OrderDTO getOrder(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId);
    }


    @GetMapping("/user/{appUserId}")
    public List<OrderDTO> getOrdersForUser(@PathVariable Long appUserId) {
        return orderService.getOrdersForUser(appUserId);
    }


    @GetMapping // deze moeten we met sec. config. permission based maken
    public List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }
}
