const router = require('express').Router();
const Sequelize = require('sequelize');
const {Blog} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  const author = req.query.author || {};

  if (author.length) {
    Blog.findAll({ where: { userId: author } })
      .then(blogs => {
        res.send(blogs)
      })
      .catch(next)
  }
  else {
    Blog.findAll() //where author?
      .then((blogs) => {
        res.send(blogs)
      })
      .catch(next)
  }
});

router.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      res.send(blog)
    })
    .catch(next)
});

router.post('/', (req, res, next) => {
  Blog.create(req.body)
    .then(newBlog => res.status(201).json(newBlog))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  Blog.update(req.body, {
    where: { id: req.params.id }
  })
    .then(updatedBlog => res.json(updatedBlog))
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  Blog.destroy({
    where: { id: req.params.id }
  })
    .then(() => res.sendStatus(202))
    .catch(next);
})
