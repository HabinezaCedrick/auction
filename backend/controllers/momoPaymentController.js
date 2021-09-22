const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const Flutterwave = require('flutterwave-node-v3')(process.env.FLUTTERWAVE_SECRET_KEY);


//Process flutterwave payments => /api/v1/payment/process
exports.processMomoPayment = catchAsyncErrors(async (req, res, next) => {

    const paymentIntent = await Flutterwave.paymentIntents.create({
        amount: req.body.amount,
        currency: 'RWF',

        metadata: { integration_check: 'accept_a_momo_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

// Send flutterwave API Key   =>   /api/v1/flutterwaveapi
exports.sendFlutterwaveApi = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        flutterwaveApiKey: process.env.FLUTTERWAVE_API_KEY
    })

})