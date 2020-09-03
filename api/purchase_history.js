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
router.post("/:customer_id", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  let customer_id = _.get(req, 'params.customer_id');
  db.query(PurchaseHistory.getPurchaseHistoryByCustomerId(customer_id), (err, data) => {
    if (!err) {
      let response = [];
      if (data) {
        response = data;
      }
      res.status(200).json({
        statusCode:'0000',
        history:response
      });
    } else {
      res.status(400).json({
        statusCode:'4004',
        msg: "Bad request"
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
      res.status(200).json({
        statusCode:'0000',
        historyDetails:response
      });
    } else {
      res.status(400).json({
        statusCode:'4004',
        msg: "Bad request"
      });
    }
  });
});

module.exports = router;