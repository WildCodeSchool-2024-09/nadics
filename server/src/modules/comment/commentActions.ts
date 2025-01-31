import type { RequestHandler } from "express";
import commentRepository from "./commentRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all comments
    const requestId = Number(req.params.request_id);
    const comments = await commentRepository.readAll(requestId);

    // Respond with the comments in JSON format
    res.json(comments);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific comment based on the provided ID
    const insertId = Number.parseInt(req.params.id);
    const comment = await commentRepository.read(insertId);

    // If the comment is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the comment in JSON format
    if (comment == null) {
      res.sendStatus(404);
    } else {
      res.json(comment);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const add: RequestHandler = async (req, res, next) => {
  try {
    const newComment = {
      details: req.body.details,
      user_id: Number(req.body.user_id),
      request_id: Number(req.body.request_id),
    };

    // Create the user
    const insertId = await commentRepository.create(newComment);

    if (!insertId) {
      throw new Error("Failed to create comment.");
    }
    // Respond with HTTP 201 (Created) and the ID of the newly inserted comment
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const comment = {
      id: Number(req.params.id),
      details: req.body.details,
      date: req.body.date,
    };

    const affectedRows = await commentRepository.update(comment);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add };
