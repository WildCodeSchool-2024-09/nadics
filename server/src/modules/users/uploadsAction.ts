import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const addAvatar: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.id);
  // Vérifier si un fichier est bien reçu
  if (!req.file) {
    res.status(400).json({ message: "Aucun fichier reçu" });
  }

  const file = req.file as Express.Multer.File;
  const avatarPath = `uploads/${file.filename}`;

  try {
    // Appeler le repository pour mettre à jour l'avatar dans la base de données
    await userRepository.createAvatar(userId, avatarPath);
    // Réponse après mise à jour de l'avatar
    res.json({
      message: "Avatar mis à jour avec succès",
      avatar: avatarPath,
    });
  } catch (err) {
    // En cas d'erreur, utiliser next() pour transmettre l'erreur au middleware global
    console.error(err);
    next(err); // Ceci transfère l'erreur au middleware d'erreur global
  }
};

export default { addAvatar };
