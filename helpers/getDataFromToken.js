import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("No token provided");
    const decryptToken = jwt.verify(token, process.env.JWT_SECRET);
    return decryptToken;
  } catch (error) {
    throw new Error(error.message);
  }
};
