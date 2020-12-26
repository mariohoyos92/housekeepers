import { NextApiResponse } from "next";
import { ResponseFormat } from "./common";
import { UserModel } from "./_models/user";
import { getUserById } from "./_repository/user-repository";
import requireAuth from "./_require-auth";

export default requireAuth(async (req, res: NextApiResponse<ResponseFormat<UserModel>>) => {
  const authUser = req.user;
  const { uid } = req.query;

  // Prevent access to user other than yourself
  // Note: You may want to remove this depending on your needs
  if (uid !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot access user other than yourself",
    });
  }

  // Fetch user from database here
  // For now we'll just return a fake user
  const user = await getUserById(uid);

  res.send({
    status: "success",
    data: user,
  });
});
