/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();
const { addPosting, deletePosting, fetchPosting, fetchAllPostings, markAsSold } = require('../db/queries/postings');

//-----------GET

router.get('/', (req, res) => {
  const userId = req.session.userId;
  const email = req.session.email;
  fetchPosting(userId)
    .then((response) => {
      const templateVars = {data: response, userId, email};
      res.render('mypostings', templateVars);
    });
});

router.get('/new', (req, res) => {
  const userId = req.session.userId;
  const email = req.session.email;
  const templateVars = {userId, email}

  res.render('newposting', templateVars);
});

/////-----------POST

router.post('/mypostings', (req, res) => {
  const userId = req.session.userId;
  const email = req.session.email;
  const templateVars = {data: response, userId, email};
  res.render('mypostings', templateVars);
});

router.post('/:id/delete', (req, res) => {
  const postingId = req.params.id;
  const userId = req.session.userId;

  deletePosting(userId, postingId)
  .then(() => {
    res.redirect('/postings')
  });
});

router.post('/:id/sold', (req, res) => {


  deletePosting(postingId)
    .then(() => {
      res.render('mypostings');
    });
  res.render('/');
});


// Create a new posting
router.post('/new', (req, res) => {

  const sellerId = req.session.userId;
  const title = req.body.title;
  const description = req.body.desc;
  const photoUrl = req.body.photourl;
  const price = req.body.price;
  const condition = req.body.condition;


  addPosting(sellerId, title, description, photoUrl, price, condition)
    .then(() => {
      res.redirect('/postings');
    });
});

//Mark as sold
router.post('/sold', (req, res) => {
  const posting_id = '';
  const userId = req.session.userId;
  const email = req.session.email;

  markAsSold(posting_id)
  .then((response) => {
    const templateVars = {data: response, userId, email};
    res.render('mypostings', templateVars);
  })
});


module.exports = router;
