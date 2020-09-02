import express from "express";
import db from "../db/database";
import PurchaseHistory from "../queries/purchase_history";
import config from '../configuration/config';
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var _ = require('lodash');
const moment = require('moment');
import Util from "../common/util";

router.post("/new", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const userDetails = Util.getUserDetails(req);
  const newUser = new User(userDetails.customer_id, userDetails.customer_name, userDetails.pin, userDetails.created_at, userDetails.updated_at);
  db.query(newUser.addUserSQL(), (err, data) => {
    if (!err) {
      res.status(200).json({
        message: "User added successfully."
      });
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }

  });

});

router.post("/delete", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const customer_id = _.get(req, 'body.customer_id');
  db.query(User.deleteUserByCustomerIdSQL(customer_id), (err, data) => {
    if (!err) {
      res.status(200).json({
        message: "User deleted successfully."
      });
    } else {
      res.status(400).json({
        message: "Bad request"
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
        message: "User updated successfully."
      });
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }
  });
});

router.post("/:customer_id", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  let customer_id = _.get(req, 'params.customer_id');
  db.query(PurchaseHistory.getPurchaseHistoryByCustomerId(customer_id), (err, data) => {
    if (!err) {
      let response = [];
      if (data) {
        response = data;
      }
      res.status(200).json(response);
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }
  });
});

router.post("/:customer_id/:purchase_date", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  let customer_id = _.get(req, 'params.customer_id');
  let purchase_date = _.get(req, 'params.purchase_date');
  db.query(PurchaseHistory.getPurhaseHistoryByCustomerIdAndDate(customer_id, purchase_date), (err, data) => {
    if (!err) {
      let response = [];
      if (data) {
        response = data;
      }
      res.status(200).json(response);
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }
  });
});

module.exports = router;