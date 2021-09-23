const express = require('express')
const router = express.Router();

const {
    processMomoPayment,
    sendFlutterwaveApi
} = require('../controllers/momoPaymentController')

const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/payment/process').post(isAuthenticatedUser, processMomoPayment);
router.route('/flutterwaveapi').get(isAuthenticatedUser, sendFlutterwaveApi);

module.exports = router;