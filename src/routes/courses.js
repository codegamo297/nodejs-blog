const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

// router.get('/create', function(req, res, next) {
//     if(req.query.ve === 'vevip') return next()
//     res.status(403).json({ message: "Access denied" })
// }, courseController.create);
router.get('/create', courseController.create)
router.post('/store', courseController.store);
router.post('/handle-form-actions', courseController.handleFormActions)
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.forceDelete);
router.get('/:slug', courseController.show);

module.exports = router;
