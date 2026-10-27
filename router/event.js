const express = require('express');
const  router =  express.Router();

const  {getAllEvent,singelEvent}  = require('../controllers/eventController');

router.get('/', getAllEvent);
router.get('/:id',  singelEvent)

module.exports= router;