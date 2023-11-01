const ticketModel = require("../models/ticketModel");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.updateTickets = (req, res) => {
  const { _id } = req.params;
  const respond = req.body.respond;

  ticketModel
    .findByIdAndUpdate(_id, { respond: respond })
    .then((data) => {
      console.log(data);
      console.log('The data updated successfully');

      
      const transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.APP_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.USER,
        to: data.email, 
        subject: 'Ticket Update',
        text:  respond
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ error: error, message: 'An error occurred while sending the email.' });
        } else {
          console.log('Email sent:', info.response);
          res.json({ message: 'Ticket updated successfully!' });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err, msg: 'Something went wrong!' });
    });
};

module.exports.getTickets = async (req, res) => {
  try {
    const tickets = await ticketModel.find();
    res.send(tickets);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, msg: "Something went wrong!" });
  }
};

module.exports.getOneTickets = async (req, res) => {
  const { _id } = req.params;

  try {
    const ticket = await ticketModel.findById(_id); 
    if (!ticket) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(ticket);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, msg: "Something went wrong!" });
  }
};



module.exports.saveTickets = (req, res) => {
  const { fullName, email, phoneNumber, problemDescription, respond } = req.body;

  const ticket = new ticketModel({
    fullName,
    email,
    phoneNumber,
    problemDescription,
    respond
  });

  ticket.save()
    .then((savedTicket) => {
     
      const transporter = nodemailer.createTransport({
        
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.APP_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.USER,
        to: req.body.email,
        subject: 'Ticket Created Successfully',
        html: `
          <html>
            <body>
              <p>Dear ${fullName},</p>
              <p>Thank you for contacting us! Your inquiry is important to us. we will reaview your request and replay to you within 2 business days.</p>
              <p>reference number for this inquiry is: ${savedTicket._id}</p>
              <p>Thank you!</p>
            </body>
          </html>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ error: error, message: 'An error occurred while sending the email.' });
        } else {
          console.log('Email sent:', info.response);
          res.json({ message: 'Ticket created successfully!', id: savedTicket._id });
        }
      });
    })
    .catch((error) => {
      console.error('Error saving ticket:', error);
      res.status(500).json({ error: error, message: 'An error occurred while saving the ticket.' });
    });
};
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  const hardcodedUsername = 'admin';
  const hardcodedPassword = 'password';

  if (email !== hardcodedUsername || password !== hardcodedPassword) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ email }, 'secret-key');

  // Send the token to the client
  res.json({ token });
};


module.exports.deleteTickets = (req, res) => {
  const { _id } = req.params;

  ticketModel.findByIdAndDelete(_id)
    .then((data) => {
      console.log("The data deleted successfully");
      res.status(201).json({ message: 'Ticket deleted successfully!' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err, msg: "Something went wrong!" });
    });
};