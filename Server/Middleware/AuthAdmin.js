const jwt=require('jsonwebtoken');
const AdminModel=require('../Models/AdminModel')


module.exports.VerifyAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    
     console.log(token,"llllll")
    if (token) {
      jwt.verify(token, "secret", async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
        } else {
          const admin = await AdminModel.findById({ _id: decodedToken.id });
          if (admin) {
             res.json({status:true,admin:admin});
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