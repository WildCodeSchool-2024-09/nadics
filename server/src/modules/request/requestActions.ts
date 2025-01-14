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

export default { browse };
