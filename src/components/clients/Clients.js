import React, {useEffect, useState, Fragment} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import clienteAxios from '../../config/axios'
import Client from './Client'
import Spinner from '../layout/Spinner'

const Clients = () => {
    const [clients, setClients] = useState([])
    // Estas variable se crearon para
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source()

    const consultaAPI = async () => {
        try {
            const clients = await clienteAxios.get('/clients', {cancelToken: source.token})
            // colocar el result en el state
            setClients(clients.data)
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("cancelled");
            } else {
            throw error;
            }
        }
    }
    // use effect es similar a componentdidmount y willmount
    useEffect(() => {
        consultaAPI();
        return () => {
         source.cancel();
        };
    }, [clients]);
     /* colocamos clients en entre los corchetes del useEffect pa realizar la recarga del componente 
    para cuando se actualizen los clientss( elimino)c*/

    // spinner de carga
    if(!clients.length) return <Spinner />


    return (
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {clients.map(client => (
                    <Client 
                        key={client._id}
                        client={client}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default Clients;