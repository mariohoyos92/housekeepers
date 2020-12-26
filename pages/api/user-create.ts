import requireAuth, { AuthenticatedApiRequest } from "./_require-auth";
import { createUser } from "./_repository/user-repository";
import { UserModel } from "./_models/user";
import { NextApiResponse } from "next";
import { ResponseFormat } from "./common";

export default requireAuth(
  async (req: AuthenticatedApiRequest<Partial<UserModel>>, res: NextApiResponse<ResponseFormat<UserModel>>) => {
    const authUser = req.user;
    const body = req.body;

    // Make sure authenticated user can only create themself in the database
    if (body.uid !== authUser.uid) {
      return res.send({
        status: "error",
        message: "Created user must have the same uid as authenticated user",
      });
    }

    // Create user in database here
    // For now we'll return a fake user containing data we passed in request
    const user = await createUser(req.body);

    res.send({
      status: "success",
      data: user,
    });
  }
);
