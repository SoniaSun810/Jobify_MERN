import jwt from "jsonwebtoken";
import UnAuthenticatedError from "../errors/unauthenticated.js";

UnAuthenticatedError;
const auth = async (req, res, next) => {
  console.log(req.cookies)
  // use cookie 
  const token = req.cookies.token
  if(!token){
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith("Bearer")) {
  //   throw new UnAuthenticatedError("Authentication Invalid");
  // }
  // const token = authHeader.split(" ")[1];

  // console.log(token);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = { userId: payload.userId };
    const testUser = payload.userId === "63bcc3c6e81bcaa183c62253";
    req.user = {userId: payload.userId, testUser}
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
