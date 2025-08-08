const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const authMiddleware = require('../middlewares/authMiddleware');

// inject prisma
router.use((req, res, next) => {
  const { PrismaClient } = require('@prisma/client');
  req.prisma = new PrismaClient();
  next();
});

router.get('/', getAllPosts);
router.post('/', authMiddleware ,createPost);
router.put('/:id', authMiddleware ,updatePost);
router.delete('/:id', authMiddleware ,deletePost);

module.exports = router;
