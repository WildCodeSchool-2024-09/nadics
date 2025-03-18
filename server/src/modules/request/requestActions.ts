import { type NextFunction, type RequestHandler, request } from "express";
import impacted_personRepository from "./impacted_personRepository";
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

    // Create the user
    const insertId = await requestRepository.create(newRequest);

    const impactedPersonIds = req.body.impactedPersonIds;

    const insertImpactId = await impacted_personRepository.create(
      insertId,
      impactedPersonIds,
    );

    if (!insertId) {
      throw new Error("Failed to create program.");
    }
    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId, insertImpactId });
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
    const requestId = Number(req.params.id);
    const userId = Number(req.user.id);
    const request = await requestRepository.read(requestId);
    if (request.user_id !== userId) {
      res
        .status(403)
        .json({ message: "Forbidden: You are not the owner of this request" });
      return;
    }

    // Si tout est ok, passe au middleware suivant
    next();
  } catch (err) {
    next(err); // En cas d'erreur, passe l'erreur au middleware d'erreur
  }
};

export default { browse, read, edit, add, destroy, isPoster };
