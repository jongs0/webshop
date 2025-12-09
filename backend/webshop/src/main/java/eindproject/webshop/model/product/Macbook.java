package eindproject.webshop.model.product;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("macbook")
public class Macbook extends Product {
}
