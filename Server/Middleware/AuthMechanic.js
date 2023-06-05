const jwt=require('jsonwebtoken');
const MechanicModel=require('../Models/MechanicModel')


module.exports.VerifyMechanic = (req, res, next) => {
    const token = req.cookies.jwt;
    
     console.log(token,"llllll")
    if (token) {
      jwt.verify(token, "secretdata", async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
        } else {
          const Mechanic = await MechanicModel.findById({ _id: decodedToken.id });
          if (Mechanic) {
             res.json({status:true,mechanic:mechanic});
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