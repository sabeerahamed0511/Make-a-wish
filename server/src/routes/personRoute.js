const express = require("express");
const router = express.Router();
const { createPerson, getAllPerson, getSinglePerson, deleteSinglePerson } = require("../controllers/personController");

router.post("/:id/new", createPerson);
router.get("/:id", getAllPerson);
router.get("/person/:id", getSinglePerson)
router.delete("/person/:id", deleteSinglePerson)




module.exports = router;