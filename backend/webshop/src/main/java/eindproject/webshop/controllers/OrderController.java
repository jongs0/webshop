package eindproject.webshop.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<OrderDTO> checkout(
            @PathVariable Long appUserId,
            @RequestParam PaymentMethod paymentMethod
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(checkOutService.checkout(appUserId, paymentMethod));
    }


    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable Long orderId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.getOrderById(orderId));
    }


    @GetMapping("/user/{appUserId}")
    public ResponseEntity<List<OrderDTO>> getOrdersForUser(@PathVariable Long appUserId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.getOrdersForUser(appUserId));
    }


    @GetMapping // deze moeten we met sec. config. permission based maken
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.getAllOrders());
    }
}
