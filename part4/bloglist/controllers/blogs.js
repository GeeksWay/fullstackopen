
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// Create a new blog
blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0, // Default likes to 0 if not provided
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

// Delete a blog by ID
blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.status(400).send({ error: 'malformatted id' });
  }
});

module.exports = blogsRouter;
