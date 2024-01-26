const express = require("express")
const router = express.Router()

const {
    userLogin,
    userSignup,
    myDetailsFetch,
    myDetailsUpdate
} = require("../controller/userController.js")

router.route('/login').post(userLogin)
router.route('/signup').post(userSignup)
router.route('/myaccount').put(myDetailsUpdate)
router.route('/myaccount/:loginVal').get(myDetailsFetch)

module.exports = router;
