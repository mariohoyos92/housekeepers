import { NextApiResponse } from "next";
import { ResponseFormat } from "./common";
import { UserModel } from "./_models/user";
import { updateUser } from "./_repository/user-repository";
import requireAuth from "./_require-auth";

export default requireAuth(async (req, res: NextApiResponse<ResponseFormat<UserModel>>) => {
  const authUser = req.user;
  const body = req.body;
  const { uid } = req.query;

  // Make sure authenticated user can only update themself
  if (uid !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot update user other than yourself",
    });
  }

  // Update user in database here
  // For now we'll return a fake user containing data we passed in request
  const user = await updateUser(uid, body);

  res.send({
    status: "success",
    data: user,
  });
});
