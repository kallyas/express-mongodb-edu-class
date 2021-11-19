const { Router } = require('express');
const router = Router();


const { register, login } = require("../controllers/authController")
const { getAllUsers } = require("../controllers/userController")

router.post('/register', register);
router.post('/login', login);

router.get("/users", getAllUsers);


/* 
// Route: /user/:id
// Route: /user/:id/delete
// Route: /user/:id/update
*/

module.exports = router;