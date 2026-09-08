import Usuario from "../Models/Usuario.js";
import argon2 from "argon2";

export default class UsuarioController {
  static async registrarUsuario(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(422)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    try {
      const hashPassword = await argon2.hash(senha);

      const usuario = new Usuario({
        nome,
        email,
        senha: hashPassword,
      });

      const novoUsuario = await usuario.save();

      return res
        .status(200)
        .json({ message: "Usuário cadastrado com sucesso.", novoUsuario });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao cadastrar usuário.", error });
    }
  }

  static async LoginUsuario(req, res){
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(422)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    try{
      const usuario = await Usuario.findOne({ email }).select("+senha");

      if(!usuario){
        return res.status(404).json({message: "Dados inválidos"});
      }

      const senhaValida = await argon2.verify(usuario.senha, senha);

      if(!senhaValida){
        return res.status(400).json({message: "Credenciais inválidas"});
      }

      const tokenPayLoad = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      };

      const token = jwt.sign(tokenPayLoad, process.env.JWT_SECRET, 
        {expireIn: "2h"
        });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: process.env.JWT_EXPIRATION_MS || 3600000 
      });
    
      return res 
        .status(200)
        .json({ message: "Login efetuado com sucesso",  
          usuario : {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
          },
          token
        },
        )
    } catch(error){
        return res
        .status(500)
        .json({ message: "Erro ao Fazer login.", error });
    }
  }
  static async Profile (req, res){

  }

  static async getAllExceptionLogged(req, res) {
    try {
      const usuarioLogado = req.user.id;
      const usuarios = await Usuario.find({_id:{$ne:usuarioLogado}})
      .select("nome")
      .sort({nome: 1});

      return res.status(200).json(usuarios);
    } catch(error){
      return res
      .status(500)
        .json({ message: "Erro ao Fazer login.", error });
    }
  }
}