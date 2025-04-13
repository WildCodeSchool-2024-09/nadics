import path from "node:path";
import type { RequestHandler } from "express";
import multer from "multer";
import userRepository from "./userRepository";

// Fonction pour nettoyer le nom du fichier
const sanitizeFilename = (filename: string) => {
  return filename.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
};

// Configuration de stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../public/uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const safeFilename = sanitizeFilename(baseName);
    cb(null, `${Date.now()}-${safeFilename}${ext}`);
  },
});

// Filtrage du type MIME AVANT enregistrement
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/bmp",
    "image/gif",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

// Final: configuration complète de Multer
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 Mo max
  fileFilter,
});

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
      message: "Avatar uploaded succecfully",
      avatar: avatarPath,
    });
  } catch (err) {
    // En cas d'erreur, utiliser next() pour transmettre l'erreur au middleware global
    console.error(err);
    next(err); // Ceci transfère l'erreur au middleware d'erreur global
  }
};
export default { upload, addAvatar };
