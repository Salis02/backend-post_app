const prisma = require('../lib/prisma');

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { 
        user: {
          select:{
            username: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      message: 'Posts retrieved successfully',
      data: posts,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch posts',
    });
  }
};

const createPost = async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: { 
        title, 
        content, 
        userId: req.user.userId 
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Post created successfully',
      data: newPost,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updated = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content },
    });

    res.status(200).json({
      status: 'success',
      message: 'Post updated successfully',
      data: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update post',
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      status: 'success',
      message: 'Post deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete post',
    });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};
