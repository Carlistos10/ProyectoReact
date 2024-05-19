import mongoose from 'mongoose'

/*
En este apartado indicamos las caracteristicas que deben 
tener el usuario, email y contraseña del usuario
Que sean tipo String, que sean necesarios, 
el trim sirve para eliminar los espacios en blanco, 
y que sea el correo unico, es decir, que no exista ya en la bd
*/

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true
    }

)

export default mongoose.model('User', userSchema)