import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/register',
  [
    check('firstName', 'O primeiro nome é obrigatório').isString(),
    check('lastName', 'O último nome é obrigatório').isString(),
    check('email', 'O email é obrigatório').isEmail(),
    check(
      'password',
      'É obrigatório a senha com 6 ou mais caracteres',
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Retorna um objeto JSON com a propriedade "errors"
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: 'Este usuário já existe' }); // Retorna um objeto JSON com a propriedade "message"
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: '1d',
        },
      );

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      });
      return res
        .status(200)
        .json({ message: 'Registro realizado com sucesso' }); // Retorna um objeto JSON com a propriedade "message"
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: 'Desculpa. Mas algo deu errado...' }); // Retorna um objeto JSON com a propriedade "message"
    }
  },
);

export default router;
