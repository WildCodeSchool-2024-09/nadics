import { type NextFunction, type RequestHandler, request } from "express";
import requestRepository from "./requestRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const request = await requestRepository.readAll();
    res.json(request);
  } catch (err) {
    next(err);
  }
};
const read: RequestHandler = async (req, res, next) => {
  try {
    const requestId = Number(req.params.id);
    const request = await requestRepository.read(requestId);
    if (request == null) {
      res.sendStatus(404);
    } else {
      res.json(request);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific category based on the provided ID
    console.info("couocu");
    console.info(req.body);
    const request = {
      id: Number(req.params.id),
      title: req.body.title,
      tag1: req.body.tag1,
      tag2: req.body.tag2,
      details1: req.body.details1,
      details2: req.body.details2,
      details3: req.body.details3,
    };

    const affectedRows = await requestRepository.update(request);

    // If the category is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the category in JSON format
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newRequest = {
      date: req.body.date,
      title: req.body.title,
      tag1: req.body.tag1,
      tag2: req.body.tag2,
      details1: req.body.details1,
      details2: req.body.details2,
      details3: req.body.details3,
      user_id: req.body.user_id,
    };

    // Create the request
    const insertId = await requestRepository.create(newRequest);

    if (!insertId) {
      throw new Error("Failed to create a new request.");
    }
    // Respond with HTTP 201 (Created) and the ID of the newly inserted request
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const requestId = Number(req.params.id);
    await requestRepository.delete(requestId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const isPoster: RequestHandler = async (req, res, next) => {
  try {
    const requestId = Number(req.params.id); // Récupère l’ID de la Request dans l’URL
    const userId = Number(req.user.id); // Récupère l’ID de l’utilisateur connecté (injecté par verifyToken)

    const request = await requestRepository.read(requestId); // Récupère la Request dans la base de données

    // Compare l’ID de l’utilisateur avec celui qui a posté la Request
    if (request.user_id !== userId) {
      // Si ce n’est pas le bon auteur, on bloque la requête avec une erreur 403
      res
        .status(403)
        .json({ message: "Forbidden: You are not the owner of this request" });
      return;
    }

    next(); // Si l'utilisateur est bien l’auteur, on laisse passer vers le contrôleur
  } catch (err) {
    next(err); // En cas d’erreur inattendue, on la transmet au middleware de gestion des erreurs
  }
};

export default { browse, read, edit, add, destroy, isPoster };
