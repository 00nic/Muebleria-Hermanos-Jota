import './App.css';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Notification from './components/Notification';
import { useState, useEffect} from 'react';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([
    {
        id: '1',
        nombre: 'Aparador Uspallata',
        info: 'Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón.',
        descripción: 'Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.',
        imagenUrl: 'img/productos/Aparador Uspallata.png',
        detalle: { 
                medidas: '180 × 45 × 75 cm',
                materiales: 'Nogal macizo FSC®, herrajes de latón',
                acabado: 'Aceite natural ecológico',
                peso: '68 kg',
                capacidad: '6 compartimentos interiores',
                precio: '$450.000'
            },
        destacado: true, 
    },
    {
        id: '2',
        nombre: 'Biblioteca Recoleta',
        descripción: 'Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.',
        imagenUrl: 'img/productos/Biblioteca Recoleta.png',
        detalle: { 
                medidas: '100 × 35 × 200 cm',
                materiales: 'Estructura de acero, estantes de roble',
                acabado: 'Laca mate ecológica',
                peso: '45 kg por estante',
                capacidad: '5 estantes ajustables',
                precio: '$380.000'
            } 
    },
    {
        id: '3',
        nombre: 'Butaca Mendoza',
        descripción: 'Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.',
        imagenUrl: 'img/productos/Butaca Mendoza.png',
        detalle: { 
                medidas: '80 × 75 × 85 cm',
                materiales: 'Guatambú macizo, tela bouclé',
                acabado: 'Cera vegetal, tapizado premium',
                tapizado: 'Repelente al agua y manchas',
                confort: 'Espuma alta densidad',
                precio: '$150.000'
            } 
    },
    {
        id: '4',
        nombre: 'Sillón Copacabana',
        info: 'Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna',
        descripción: 'Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.',
        imagenUrl: 'img/productos/Sillón Copacabana.png',
        detalle: { 
                medidas: '90 × 85 × 95 cm',
                materiales: 'Cuero curtido vegetal, acero pintado',
                acabado: 'Cuero anilina premium',
                rotacion: '360° silenciosa y suave',
                garantia: '10 años en estructura',
                precio: '$220.000'
            },
        destacado: true,
    },
    {
        id: '5',
        nombre: 'Mesa de Centro Araucaria',
        descripción: 'Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.',
        imagenUrl: 'img/productos/Mesa de Centro Araucaria.png',
        detalle: { 
                medidas: '90 × 90 × 45 cm',
                materiales: 'Sobre de mármol Patagonia, patas de nogal',
                acabado: 'Barniz mate de poliuretanoMármol pulido, aceite natural en madera',
                peso: '42 kg',
                cargaMaxima: '25 kg distribuidos',
                precio: '$110.000'
            } 
    },
    {
        id: '6',
        nombre: 'Mesa de Noche Aconcagua',
        descripción: 'Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.',
        imagenUrl: 'img/productos/Mesa de Noche Aconcagua.png',
        detalle: { 
                medidas: '45 × 35 × 60 cm',
                materiales: 'Roble macizo FSC®, herrajes soft-close',
                acabado: 'Barniz mate de poliuretano',
                almacenamiento: '1 cajón + repisa inferior',
                caracteristicas: 'Cajón con cierre suave',
                precio: '$75.000'
            } 
    }, 
]);
  const [message, setMessage]= useState("")
/*   const getProduct = async () => {
        try{
            const response = await fetch("http://localhost:3000/api/productos");
            const data = await response.json();
            console.log(data);
            setProducts(data);
        }
        catch(error){
            console.error("Error fetching products:", error);
            setMessage("Error fetching products");
            setTimeout(() => {
                setMessage("");
            }, 5000);
        }
    }
  useEffect(() => {
        getProduct();
    }, []);
 */
  return (
    <div className="App">
      <h1>Muebleria Hermanos Jota</h1>
      <h2>Productos</h2>
      <Notification message={message} />
      {products.length === 0 ? (
        <p>Cargando productos...</p>
      ) : !selectedProduct ? (
        <div className="product-list">
          {products.map(product => (
            <ProductCard key={product.id} className={`product-card ${product.nombre}`} product={product} onClick={() => setSelectedProduct(product)}/>
          ))}
        </div>
      ) : (
        <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)}/>
      )}
    </div>
  );
}

export default App;
