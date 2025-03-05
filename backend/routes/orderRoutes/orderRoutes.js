const express = require('express');
const { createOrder, getOrderByEmail } = require('../../controllers/orderControllers/orderController');
const router = express.Router();


//POST ORDER API
router.post('/', createOrder);

//GET BY USER EMAIL
router.get('/email/:email', getOrderByEmail);

module.exports = router;