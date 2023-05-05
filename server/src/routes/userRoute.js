const express = require("express");
const router = express.Router();
const { userLogin, userRegister, userSecretCheck, userPasswordReset } = require("../controllers/userController");

router.post("/user/register", userRegister);
router.post("/user/login", userLogin);
router.post("/user/secret-check", userSecretCheck);
router.put("/user/password-reset", userPasswordReset);



module.exports = router;