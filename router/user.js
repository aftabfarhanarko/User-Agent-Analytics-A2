
const express = require('express');
const router = express.Router()

const {readAllUser,readSingleUser,updateUser,deleteUser, postUser} = require('../controllers/userController');

router.get('/',readAllUser);
router.get('/:id',readSingleUser);
router.post('/', postUser)
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports =  router;