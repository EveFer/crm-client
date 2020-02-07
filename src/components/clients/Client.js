import React from 'react';

const Client = ({client}) => {
    const {_id, name, last_name, company, email, phone} = client
    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{`${name} ${last_name}`}</p>
                <p className="empresa">{company}</p>
                <p>{email}</p>
                <p>Tel: {phone}</p>
            </div>
            <div className="acciones">
                <a href="#" className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </a>
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    );
};

export default Client;