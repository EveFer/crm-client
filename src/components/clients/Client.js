import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';

const Client = ({client}) => {
    const {_id, name, last_name, company, email, phone} = client

    // eliminar client
    const handleClick = idClient => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un cliente ya no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                // llamado a axios
                clientAxios.delete(`/clients/${idClient}`)
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
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{`${name} ${last_name}`}</p>
                <p className="empresa">{company}</p>
                <p>{email}</p>
                <p>Tel: {phone}</p>
            </div>
            <div className="acciones">
                <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
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

export default Client;