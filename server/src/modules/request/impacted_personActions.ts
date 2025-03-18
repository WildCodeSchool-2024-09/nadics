import type { RequestHandler } from "express";
import impacted_personRepository from "./impacted_personRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const requestId = Number(req.params.requestId);
    console.info(requestId);
    const impactedPersons = await impacted_personRepository.read(requestId);

    if (impactedPersons == null) {
      res.sendStatus(404);
    } else {
      res.json(impactedPersons);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { read };
