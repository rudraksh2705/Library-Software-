const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};

//httpOnly: true ensures your JWT token is safer, since it can’t be grabbed from the browser using JavaScript.

module.exports = sendToken;
