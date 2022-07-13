var express = require("express");
var router = express.Router();
const {updateget, doupdate} = require("../controllers/update");

router.get("/update", updateget);
router.post("/update", doupdate);

module.exports = router;