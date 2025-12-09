package eindproject.webshop.model.product;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("iphone")
public class Iphone extends Product {
}
