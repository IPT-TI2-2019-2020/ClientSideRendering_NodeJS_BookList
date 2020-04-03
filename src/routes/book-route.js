const router = require ('express').Router ();
const bookController = require ('../controllers/book-controller.js');

router.get ('', bookController.getBooks);
router.get ('/:id', bookController.getBook);
router.post ('', bookController.insertBook);
router.put ('/:id', bookController.updateBook);
router.delete ('/:id', bookController.removeBook);

module.exports = router;
