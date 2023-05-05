const router = require("express").Router();
const controller = require("../controllers/wishController");

router.get("/wish/:id", controller.getWishes);

router.delete("/wish/:id", controller.deleteWishes);

router.post("/wish", controller.addWish);

module.exports = router;