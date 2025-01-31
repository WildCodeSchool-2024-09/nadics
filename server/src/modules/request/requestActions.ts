import { type RequestHandler, request } from "express";
import requestRepository from "./requestRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const request = await requestRepository.readAll();
    res.json(request);
  } catch (err) {
    next(err);
  }
};
const browseUser: RequestHandler = async (req, res, next) => {
  try {
    const user_id = Number(req.params.user_id);
    const request = await requestRepository.readAllUser(user_id);
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
    const request = {
      id: Number(req.params.id),
      title: req.body.title,
      date: req.body.date,
      theme: req.body.theme,
      details: req.body.details,
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
      theme: req.body.theme,
      details: req.body.details,
      user_id: req.body.user_id,
    };

    // Create the user
    const insertId = await requestRepository.create(newRequest);

    if (!insertId) {
      throw new Error("Failed to create program.");
    }
    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
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

export default { browse, read, edit, add, destroy, browseUser };
