const jsonwebtoken = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  try {
    console.log(req.headers.accesstoken);
    const header = req.headers.accesstoken.replace("Bearer ", "");
    console.log(header);
    if (!header) {
      console.log("aaa");
      res.status(401).json({ status: "Unauthorized" });
      return;
    }

    const isVerified = await jsonwebtoken.verify(
      header,
      process.env.JWTSECRETKEY
    );
    if (!isVerified) {
      console.log("aa");
      res.status(401).json({ status: "Unauthorized" });
      return;
    }
    req.user = isVerified;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ status: "Unauthorized" });
  }
};
module.exports = isAuthenticated;
