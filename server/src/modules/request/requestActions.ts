import type { RequestHandler } from "express";
import requestRepository from "./requestRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const request = await requestRepository.readAll();
    res.json(request);
  } catch (err) {
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

export default { browse, edit };
