const helper = require('./test_helper');
const Blog = require('../models/blog');

describe('when there are initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({});

        for (let blog of helper.initialBlogs) {
            let blogObject = new Blog(blog);
            await blogObject.save();
        }
    });

    test('blogs are returned as JSON', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body.length).toBe(helper.initialBlogs.length);
    });

    // More tests using helper functions as needed
});

// Example usage of nonExistingId and blogsInDb
test('a specific blog can be fetched', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
});

// Example usage of usersInDb
test('users are returned as JSON', async () => {
    const response = await api.get('/api/users');
    expect(response.body.length).toBe(helper.usersInDb().length);
});
