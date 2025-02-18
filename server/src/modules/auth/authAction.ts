import type { RequestHandler } from "express";

import argon2 from "argon2";
import jwt from "jsonwebtoken";
import userRepository from "../users/userRepository";
// Import access to data
const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await userRepository.readByEmailWithPassword(req.body.email);
    if (user === null) {
      res.sendStatus(422);
      return;
    }
    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password,
    );
    if (verified) {
      const { hashed_password, ...userWithoutHashedPassword } = user;

      const myPayload: MyPayload = {
        id: user.id.toString(),
        firstname: user.firstname,
        lastname: user.lastname,
        birthday: user.birthday,
        avatar: user.avatar,
      };

      const token = await jwt.sign(
        myPayload,
        process.env.APP_SECRET as string,
        {
          expiresIn: "1h",
        },
      );
      res.cookie("token", token, {
        httpOnly: true, // Empêche l'accès depuis JavaScript
        secure: process.env.NODE_ENV === "production", // Active HTTPS en prod
        sameSite: "strict", // Protège contre les attaques CSRF
        maxAge: 3600000, // Expiration dans 1h
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

const me: RequestHandler = (req, res) => {
  const token = req.cookies.token;
  // Récupère le cookie contenant le token
  if (!token) {
    res.status(401).json({ message: "Not authentified" });
  }

  try {
    const user = jwt.verify(token, process.env.APP_SECRET as string);
    res.json(user); // Renvoie les infos de l'utilisateur
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

const logout: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Deconnected" });
  } catch (err) {
    next(err);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};
const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    // Extraction du mot de passe de la requête
    const { password } = req.body;
    // Hachage du mot de passe avec les options spécifiées
    const hashedPassword = await argon2.hash(password, hashingOptions);
    // Remplacement du mot de passe non haché par le mot de passe haché dans la requête
    req.body.hashed_password = hashedPassword;
    // Oubli du mot de passe non haché de la requête : il restera un secret même pour notre code dans les autres actions
    req.body.password = undefined;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "You are not alloweds" });
  }
  try {
    // Vérifier la validité du token (son authenticité et sa date d'expériation)
    // En cas de succès, le payload est extrait et décodé
    const user = jwt.verify(
      token,
      process.env.APP_SECRET as string,
    ) as MyPayload;

    req.user = user; // Attacher l'utilisateur à la requête
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

export default { login, hashPassword, verifyToken, logout, me };
