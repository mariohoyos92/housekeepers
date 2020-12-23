const requireAuth = require("./_require-auth.js");
const { createUser } = require("./_repository/user-repository.js");

export default requireAuth(async (req, res) => {
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
});
