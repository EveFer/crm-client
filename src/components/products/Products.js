import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import clienteAxios from '../../config/axios.js'
import Product from './Product'
import Spinner from '../layout/Spinner'

const Products = () => {
    const [products, setProducts] = useState([])
    
    // useeffect para consultar la pai para cuando cargue
    useEffect(()=> {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source()
        // request a la api
        const consultaAPI = async () => {
            try {
                const producsConsult = await clienteAxios.get('/products', {cancelToken: source.token})
                setProducts(producsConsult.data)
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("cancelled");
                } else {
                throw error;
                }
            }
        };
        consultaAPI();
        return () => {
         source.cancel();
        };
    }, [products]);
    /* colocamos products en entre los corchetes del useEffect pa realizar la recarga del componente 
    para cuando se actualizen los products( elimino)c*/

    // spinner de carga
    if(!products.length) return (<Spinner />)

    return (
        <>
            <h2>Productos</h2>
            <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {products.map(product => (
                    <Product 
                        key={product._id}
                        product={product}
                    />
                ))}
            </ul>

        </>
    );
};

export default Products;