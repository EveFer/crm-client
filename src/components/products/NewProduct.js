import React, {useState} from 'react';

const NewProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
    })
    const [file, setFile] = useState('')

    // leer datos del form
    const handleChange = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    // coloca la imagen en el state
    const readFile = e => {
        setFile(e.target.files[0])
    }

    return (
        <>
            <h2>Nuevo Producto</h2>
            <form>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="name"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="price" 
                        min="0.00" 
                        step="0.01" 
                        placeholder="Precio" 
                        onChange={handleChange}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input 
                        type="file"  
                        name="image" 
                        onChange={readFile}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
                </div>
            </form>
        </>
    );
};

export default NewProduct;