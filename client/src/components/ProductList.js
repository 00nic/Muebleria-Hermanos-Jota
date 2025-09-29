import ProductCard from "./ProductCard";

function ProductList({catalogo, onClick}){
    return(
        <div className="product-list">
          {catalogo.map(product => (
            <ProductCard 
            key={product.id} 
            className={`product-card ${product.nombre}`} 
            product={product} 
            onClick={() => onClick(product)}/>
          ))}
        </div>
    )
};

export default ProductList;
