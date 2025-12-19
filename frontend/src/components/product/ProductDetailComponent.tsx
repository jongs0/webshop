import type { ProductDTO } from "../../types/models"


const ProductDetailComponent = ({ product }: { product: ProductDTO}) => {

return ( 
    <section>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
    </section>
)

}

export default ProductDetailComponent