import express from "express";
import db from "../db/database";
import User from "../queries/user";
import config from '../configuration/config';
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var _ = require('lodash');
const moment = require('moment');
import Util from "../common/util";
router.post("/login", (req, res, next) => {
  const customer_id = _.get(req, 'body.customer_id');
  const pin = _.get(req, 'body.pin');
  const sql = User.getUserByCustomerIdPinSQL(customer_id, pin);
  db.query(sql, (err, data) => {
    const userDetails = _.find(data, { 'customer_id': customer_id });
    if (userDetails) {
      let payload = { customer_id: userDetails.customer_id, customer_name: userDetails.customer_name };
      let token = jwt.sign(payload, config.jwtOptions.secretOrKey);
      res.status(200).json({ statusCode: '0000', msg: 'User successly authenticated', token: token, customer_name: userDetails.customer_name, customer_id: userDetails.customer_id });
    } else {
      res.status(200).json({
        statusCode:'4004',
        msg: "Invalid customer id & pin"
      });
    }
  });
});
router.post("/new", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const userDetails = Util.getUserDetails(req);
  const newUser = new User(userDetails.customer_id, userDetails.customer_name, userDetails.pin, userDetails.created_at, userDetails.updated_at);
  db.query(newUser.addUserSQL(), (err, data) => {
    if (!err) {
      res.status(200).json({
        statusCode:'0000',
        msg: "User added successfully."
      });
    } else {
      res.status(400).json({
        statusCode:'4004',
        msg: "Bad request"
      });
    }

  });

});

router.post("/delete", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const customer_id = _.get(req, 'body.customer_id');
  db.query(User.deleteUserByCustomerIdSQL(customer_id), (err, data) => {
    if (!err) {
      res.status(200).json({
        statusCode:'0000',
        msg: "User deleted successfully."
      });
    } else {
      res.status(400).json({
        statusCode:'4004',
        msg: "Bad request"
      });
    }
  });
});

router.post("/update", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const userDetails = Util.getUserDetails(req);
  const user = new User(userDetails.customer_id, userDetails.customer_name, userDetails.pin, userDetails.created_at, userDetails.updated_at);
  const customer_id = _.get(req, 'body.customer_id');
  db.query(user.updateUserByCustomerIdSQL(customer_id), (err, data) => {
    if (!err) {
      res.status(200).json({
        statusCode:'0000',
        msg: "User updated successfully."
      });
    } else {
      res.status(400).json({
        statusCode:'4004',
        msg: "Bad request"
      });
    }
  });
});

router.post("/:customer_id", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  let customer_id = _.get(req, 'params.customer_id');
  db.query(User.getUserByCustomerId(customer_id), (err, data) => {
    if (!err) {
      res.status(200).json({
        statusCode:'0000',
        userDetails:data[0]
      });
    } else {
      res.status(400).json({
        statusCode:'0000',
        msg: "Bad request"
      });
    }
  });
});

module.exports = router;