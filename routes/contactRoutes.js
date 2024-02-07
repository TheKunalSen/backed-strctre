const express = require('express');
const router = express.Router();
const {getContact,createContact,getContactOf,updateContactOf,deleteContactOf} = require('../controllers/contactController');
const validateTokenHandler = require("../middleware/validateTokenHandler");

router.use(validateTokenHandler);
router.route('/').get(getContact).post(createContact);

router.route('/:id').get(getContactOf).put(updateContactOf).delete(deleteContactOf);;


module.exports = router;