const router = require('express').Router();
const Sequelize = require('sequelize');
const {Blog} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  const author = req.query.author || null;

  if (author) {
    return Blog.findAll({ where: { userId: author } })
      .then(blogs => {
       return res.status(200).json(blogs)
      })
      .catch(next)
  }
  else {
    return Blog.findAll() //where author?
      .then((blogs) => {
        return res.status(200).json(blogs)
      })
      .catch(next)
  }
});

router.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      return res.send(blog)
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
