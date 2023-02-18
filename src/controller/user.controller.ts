import { Request, Response } from "express";
import { omit } from "lodash";
import { createUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    res.status(200).json(omit(user, "password"));
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
