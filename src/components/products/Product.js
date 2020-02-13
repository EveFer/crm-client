import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios'

const Product = ({product}) => {
    const {_id, name, price, image} = product

    // Eliminar un producto
    const handleClick = id => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "El producto ya no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
          }).then(async (result) => {
            if (result.value) {
                // llamado a axios
                await clientAxios.delete(`/products/${id}`)
                    .then(res => {
                        Swal.fire(
                            'Eliminado!',
                            res.data.message,
                            'success'
                        )
                    })
              
            }
          })
    }

    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{name}</p>
                <p className="precio">$ {price}</p>
                {image ? (
                    <img src={`http://localhost:5000/${image}`} alt="imagen" />
                ) : null }
                
            </div>
            <div className="acciones">
                <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => handleClick(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    );
};

export default Product;