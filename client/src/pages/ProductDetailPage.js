import {useState, useEffect, useNavigate} from 'react';
import {Link, useParams} from 'react-router-dom';
import {startCase} from 'lodash';


// funcionalidad de borrado de producto
export default function ProductDetailPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productData, setProductData]= useState(null);
    const {id} = useParams()

    useEffect(() => {
            const getProductById = async () => {
                try {
                    const response = await fetch(`/api/productos/${id}`);
                    if(!response.ok){
                        if(response.status === 404){
                            throw new Error('Producto inexistente')
                        }
                        if(response.status === 400){
                            throw new Error(`Id inválido`)
                        }
                        throw new Error('Petición no satisfactoria')
                    }
                    const data = await response.json()
                    setProductData(data)
    
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }; getProductById();
        }, [id]);

        if(loading){
            return <p>Cargando datos del producto...</p>
        }
        if(error){
            return <p>No fue posible obtener los datos: {error.message}</p>
        }
        return(
            <div>
                <Link to='/productos'>Volver al catálogo</Link>
                <div>
                    <img src={productData.imagenUrl} alt='imagen del producto'></img>
                    <h3>{productData.nombre}</h3>
                    <h4>{productData.descripcion}</h4>
                    <p>{productData.precio}</p>
                </div>
                <div>
                    {Object.entries(productData.detalle).map(([clave, valor]) => (
                        <div key={clave}>
                            <h2>{startCase(clave)}</h2>
                            <p>{valor}</p>
                        </div>
                    ))}
                </div>

            </div>
        )
}