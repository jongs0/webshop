package eindproject.webshop.controllers;

import eindproject.webshop.dto.order.OrderDTO;
import eindproject.webshop.model.order.Order;
import eindproject.webshop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("orders")
public class OrderController {

    //1. import service hier voor order en andere zoals cart
//    final private OrderService orderService;
//
//    @Autowired
//    public OrderController(OrderService orderService) {
//        this.orderService = orderService;
//    }

    //2. waar komt de create order methode? (kan ook namelijk eerder in de flow dan hier)

    //3. Postmapping voor create
//    @PostMapping("/create/")
//    public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO dto) {
//        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(dto));
//    }

    //Notities van Mike:
//        @PostMapping("/create/{userId}")
//        public OrderDTO create(RequestBody OrderDTO order) {
//        }??

}
