package eindproject.webshop.model.product;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("iwatch")
public class Iwatch extends Product {
}
