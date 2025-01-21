import type { RequestHandler } from "express";

// Import access to data
import userRepository from "./userRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all users
    const users = await userRepository.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific user based on the provided ID
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific category based on the provided ID
    const user = {
      id: Number(req.params.id),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday,
      email: req.body.email,
      password: req.body.password,
      hashed_password: req.body.hashed_password,
    };

    const affectedRows = await userRepository.update(user);

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
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday,
      email: req.body.email,
      // password: req.body.password,
      hashed_password: req.body.hashed_password,
    };

    // Create the user
    const insertId = await userRepository.create(newUser);

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

export default { browse, read, edit, add };
