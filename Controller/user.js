// const db = require('../Model/signup');
// const Sequelize = require('sequelize');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


// const login=async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     try {
//        const user = await db.findOne({ where: { email } });
//        if (!user) {
//           return res.status(404).json({ success: false, message: 'User not found' });
//        }
//        bcrypt.compare(password, user.password, (err, result) => {
//           if (err)
//              throw new Error('Something went wrong');
//           if (result == true) {
//              const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
//              return res.status(200).json({ success: true, message: 'User login Successfull', token: token })
//           }
//           else {
//              return res.status(401).json({ success: false, message: 'Password is incorrect' })
//           }
//        })
//     } catch (err) {
//        res.status(500).json({ success: false, message: 'Internal server error' })
//     }
//  }

//  const signup=(req, res) => {
//     const name = req.body.name
//     const email = req.body.email
//     const password = req.body.password
 
//     try {
//        const saltrounds = 10;
//        bcrypt.hash(password, saltrounds, async (err, hash) => {
//           await db.create({
//              name: name,
//              email: email,
//              password: hash,
 
//           })
//           res.status(200).json({ message: 'Database created successfully' })
//        })
 
 
//     } catch (error) {
//        if (error instanceof Sequelize.UniqueConstraintError) {
//           res.status(409).json({ error: 'Email already exists' });
//        } else {
//           res.status(500).json({ error: 'Internal server error' });
//        }
//        console.log("Error in creating database...");
//     }
//  }

//  module.exports={login,signup}


const authService = require('../services/userServices');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await authService.login(email, password);
        res.status(200).json({ success: true, message: 'User login successful', token });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await authService.signup(name, email, password);
        res.status(200).json({ success: true, message: 'User signed up successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { login, signup };
