import {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'

// en pag productos c¿que cada producto sea un Link q lleve a esta ruta
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
                <img src></img>
            </div>
        )
}