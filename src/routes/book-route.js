const bookController = require("../controllers/book-controller");
const router = require("express").Router();
const authorize = require("../configs/authorization");
const roles = require("../helpers/roles.js");

router.get("", authorize(), bookController.getBooks);
router.get("/:id", authorize(), bookController.getBook);

router.post("", authorize(roles.Boss), bookController.insertBook);
router.put("/:id", authorize(roles.Boss), bookController.updateBook);
router.delete("/:id", authorize(roles.Boss), bookController.removeBook);

module.exports = router;
