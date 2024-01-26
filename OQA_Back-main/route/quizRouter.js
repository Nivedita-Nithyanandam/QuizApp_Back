const express = require("express")
const router = express.Router();
const {
    getAllQuiz,
    createQuiz,
    getQuestions,
    deleteQuiz,
    getQuizAndQues,
    updateQuizAndQues,
    getOptionSolution
} = require('../controller/quizController')


router.route('').get(getAllQuiz)
router.route('/adminQuiz').post(createQuiz)
router.route('/adminEditQuiz/:id').get(getQuizAndQues).put(updateQuizAndQues)
router.route('/Quiz/:id').get(getQuestions).delete(deleteQuiz)
router.route('/Quiz/:id/result').get(getOptionSolution)



module.exports = router;


