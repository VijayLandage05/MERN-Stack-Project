const express = require('express')
const router = express.Router()

//to send data from backend to frontend
router.post('/foodData', (req, res)=>{
    try {
        res.send([global.food_items,global.foodCategory])
    } catch (error) {
        console.log(error.message);
        res.send("Server Error")
    }
})

module.exports = router;