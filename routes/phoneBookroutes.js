const express = require("express");
const phoneBookController = require("../controller/phoneBookcontroller");

const router = express.Router();

router.post("/entries", phoneBookController.createEntry);
router.get("/entries", phoneBookController.getEntry);
router.put("/entries/:id", phoneBookController.updateEntry);
router.delete("/entries/:id", phoneBookController.deleteEntry);
router.get("/entries/search", phoneBookController.searchEntry);

module.exports = router;
