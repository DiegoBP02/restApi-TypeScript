import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import config from "config";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean(); // lean is a method that improves performance, it tells mongoose to return plain js object instead of mongoose documents
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);
  if (!decoded || !get(decoded, "object.object.session")) return false;

  const session = await SessionModel.findById(
    get(decoded, "object.object.session")
  );

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

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

  return accessToken;
}
