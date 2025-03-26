import type { RequestHandler } from "express";
import impacting_personRepository from "./impacting_personRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const requestId = Number(req.params.requestId);
    const impactingPersons = await impacting_personRepository.read(requestId);

    if (impactingPersons == null) {
      res.sendStatus(404);
    } else {
      res.json(impactingPersons);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { read };
