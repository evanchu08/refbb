const express = require('express');
const router = express.Router();
// file upload need formidable
const formidable = require('express-formidable');
const SHA1 = require("crypto-js/sha1");
const async = require('async');
const moment = require('moment');
const mongoose = require('mongoose');

//mail
const { sendEmail } = require('../mail/index');

const { User } = require('../models/user');
const { Payment } = require('../models/payment');
const { Product } = require('../models/product')
// Middlewares
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.post('/reset_user', (req, res) => {
    User.findOne(
        { 'email': req.body.email },
        (err, user) => {
            if (!user) return res.json({ success: false, message: 'Email not found, please register' })
            user.generateResetToken((err, user) => {
                sendEmail(user.email, user.name, null, "resetPassword", user);
                if (err) return res.json({ success: false, err })
                return res.json({ success: true })
            })
        })
})

router.post('/reset_password', (req, res) => {
    var today = moment().startOf('day').valueOf();
    User.findOne({
        resetToken: req.body.resetToken,
        resetTokenExp: {
            $gte: today
        }
    }, (err, user) => {
        if (!user) return res.json({ success: false, message: 'Token is bad, reset password one more time' })
        user.password = req.body.password;
        user.resetToken = '';
        user.resetTokenExp = '';
        user.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json({ success: true })
        })
    })
})


router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})

router.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        sendEmail(doc.email, doc.name, null, "welcome");
        res.status(200).json({
            success: true
        })
    })
});

router.post('/login', (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) return res.json({ loginSuccess: false, message: 'Auth failed, email not found' });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: 'Wrong password' });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                })
            })
        })
    })
})


router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: '' },
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        }
    )
})

router.post('/uploadimage', auth, admin, formidable(), (req, res) => {
    // client: formData.routerend("file", files[0]); because call file
    cloudinary.uploader.upload(req.files.file.path, (result) => {
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    }, {
            public_id: `${Date.now()}`,
            resource_type: 'auto'
        })
})

// don't need formidable because no update
router.get('/removeimage', auth, admin, (req, res) => {
    let image_id = req.query.public_id;

    cloudinary.uploader.destroy(image_id, (error, result) => {
        if (error) return res.json({ success: false, error });
        res.status(200).send('ok')
    })
})

router.post('/addToCart', auth, (req, res) => {

    User.findOne({ _id: req.user._id }, (err, doc) => {
        let duplicate = false;

        doc.cart.forEach((item) => {
            if (item.id == req.query.productId) {
                duplicate = true;
            }
        })

        if (duplicate) {
            User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": mongoose.Types.ObjectId(req.query.productId) },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                () => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(doc.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: mongoose.Types.ObjectId(req.query.productId),
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, doc) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(doc.cart)
                }
            )
        }
    })
})

router.get('/removeFromCart', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": mongoose.Types.ObjectId(req.query._id) } }
        },
        { new: true },
        (err, doc) => {
            let cart = doc.cart;
            let array = cart.map(item => {
                return mongoose.Types.ObjectId(item.id)
            });
            Product.
                find({ '_id': { $in: array } }).
                populate('brand').
                populate('wood').
                exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                })
        })
})

router.post('/successBuy', auth, (req, res) => {
    let history = [];
    let transactionData = {}

    const date = new Date()
    const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1("req.user._id")
        .toString().substring(0, 8)}`
    // user history
    req.body.cartDetail.forEach(item =>
        history.push({
            poorder: po,
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    )

    // PAYMENTS DASH
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }
    transactionData.data = {
        ...req.body.paymentData,
        poorder: po
    }
    transactionData.product = history;

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err });

            const payment = new Payment(transactionData);
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err });
                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })

                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.json({ success: false, err })
                    sendEmail(user.email, user.name, null, "purchase", transactionData);
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                })
            });
        }
    )
})

router.post('/update_profile', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { "$set": req.body },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        }
    )
})

module.exports = router;