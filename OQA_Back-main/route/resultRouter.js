const express = require("express")
const router = express.Router();
const {
    saveScore,
    yourScores
} = require('../controller/resultController')


router.route('/myaccount').post(yourScores) 
router.route('/play/Quiz/:id/result').post(saveScore)


module.exports = router;
