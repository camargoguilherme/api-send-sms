const modem = require('../models/modem').Modem;
let sms = new modem();
exports.get = (req, res, next) => {
  let response;

  res.status(201).send(
    response
  );

};

exports.post = (req, res, next) => {
  req.body.forEach(element => {
    let number = element.number;
    let message = element.message;
    sms.sendSMS(number, message);
  })

  res.status(201).send(

	);
};

  