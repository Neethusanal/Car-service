const jwt = require("jsonwebtoken");

module.exports.VerifyAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.send({ auth: false, status: "failed", message: "You need token" });
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          console.log(err);
          res.json({
            auth: false,
            status: "failed",
            message: "failed to authenticate",
          });
        } else {
          req.adminId = decoded.adminId;
          next();
        }
      });
    }
  } catch (error) {
    res.json({ auth: false, status: "failed", message: error.message });
  }
};

module.exports.VerifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.send({ auth: false, status: "failed", message: "You need token" });
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          console.log(err);
          res.json({
            auth: false,
            status: "failed",
            message: "failed to authenticate user",
          });
        } else {
          req.userId = decoded.userId;
          next();
        }
      });
    }
  } catch (error) {
    res.json({ auth: false, status: "failed", message: error.message });
  }
};
module.exports.VerifyMechanic = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.send({ auth: false, status: "failed", message: "You need token" });
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          console.log(err);
          res.json({
            auth: false,
            status: "failed",
            message: "failed to authenticate",
          });
        } else {
          req.mechanicId = decoded.mechanicId;
          next();
        }
      });
    }
  } catch (error) {
    res.json({ auth: false, status: "failed", message: error.message });
  }
};
