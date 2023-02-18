import { Request, Response } from "express";
import config from "config";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid credentials!");
  }

  const session = await createSession(user._id, req.get("user-agent") || "");
  const object = {
    userId: user._id,
    email: user.email,
    name: user.name,
    password: user.comparePassword,
    createdAt: user.createdAt,
    session: session._id,
  };
  const accessToken = signJwt(
    { object },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
  );

  const refreshToken = signJwt(
    { object },
    { expiresIn: config.get("refreshTokenTtl") } // 1 year
  );

  res.status(200).json({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user.object.object.userId;

  const sessions = await findSessions({ user: userId, valid: true });
  res.status(200).json(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.object.object.session;
  await updateSession({ _id: sessionId }, { valid: false });
  res.status(200).json({
    accessToken: null,
    refreshToken: null,
  });
}
