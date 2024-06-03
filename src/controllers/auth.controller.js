import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {

        const passwordHash = await bcrypt.hash(password, 10)

        //creamos el usuario

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save()

        //creamos un token para el usuario
        jwt.sign(
            {
                id: userSaved._id,
            },
            "Token_Secreto",
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) console.log(err);
                res.cookie('token', token)
            }
        );


        //ofrecemos solo los datos del usuario que va a manejar el front

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }


};
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email o contraseña incorrectos' });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email o contraseña incorrectos' });
        }

        // Crear el token
        const token = jwt.sign(
            {
                id: user._id,
            },
            "Token_Secreto",
            {
                expiresIn: "1d"
            }
        );

        // Enviar la respuesta con el token
        res.cookie('token', token, { httpOnly: true });
        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};