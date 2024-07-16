/*
const helper = require('./test_helper')
 const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
  };
const { blogsInDb, usersInDb } = require('./test_helper');


const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
  {
    title: "Async/Await in JavaScript",
    author: "Jane Doe",
    url: "https://example.com/async-await",
    likes: 15,
  },
  {
    title: "The Future of Web Development",
    author: "John Smith",
    url: "https://example.com/future-web-dev",
    likes: 20,
  },
  {
    title: "Machine Learning Basics",
    author: "Alice Johnson",
    url: "https://example.com/ml-basics",
    likes: 8,
  },
  {
    title: "Functional Programming in Python",
    author: "Bob Wilson",
    url: "https://example.com/functional-python",
    likes: 6,
  },
];

const blogsInDb = async () => {
  // Logic to populate or retrieve blogs from the database (replace with actual implementation)
  await Blog.insertMany(initialBlogs); // Assuming Blog is your model and insertMany is for adding data
  //const blogs = await Blog.find({});
  return blogs;
};

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
 initialBlogs,
  usersInDb,
  blogsInDb
}

*/

const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Author 1',
    url: 'http://example.com/1',
    likes: 1
  },
  {
    title: 'Second Blog',
    author: 'Author 2',
    url: 'http://example.com/2',
    likes: 2
  }
];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'willremovethissoon' });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
