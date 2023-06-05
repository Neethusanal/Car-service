const jwt =require('jsonwebtoken')
const UserModel = require('../Models/UserModel');


module.exports.VerifyUser = (req, res, next) => {
    // console.log("jjjjjj");
    // console.log(req.cookies,"jjjhgggffff");
    const token = req.cookies.jwt;
    
    // console.log(token,"llllll")
    if (token) {
      jwt.verify(token, "secret key", async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
        } else {
          const user = await UserModel.findById({ _id: decodedToken.id });
          if (user) {
            // res.json({status:true,user:user});
            next();
          } else {
            res.json({ status: false });
          }
        }
      });
    } else {
      res.json({ status: false });
    }
  };
  