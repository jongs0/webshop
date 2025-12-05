package eindproject.webshop.model.product;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("ipad")
public class Ipad extends Product {
}
