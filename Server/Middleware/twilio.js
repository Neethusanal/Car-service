let env=require('dotenv').config()
const serviceSid=process.env.SERVICE_SID
const accountSid=process.env.ACCOUNT_SID
const authToken=process.env.AUTH_TOKEN
const client = require("twilio")(accountSid, authToken);

function sentOtp(phone){
   
    return client.verify.v2.services(serviceSid)
    .verifications
    .create({to:`+91${phone}`, channel: 'sms'})
     
}

function verifyOtp(otp,phone){
    return new Promise((resolve,reject)=>{
        client.verify.v2.services(serviceSid)
      .verificationChecks
      .create({to: `+91${phone}`, code: otp})
      .then((verification_check) =>{ console.log(verification_check.status)
      resolve(verification_check)
    });
    }).catch((verification_check) =>{ console.log(verification_check.status)
        resolve(verification_check)})
}
  


module.exports={sentOtp,verifyOtp}
