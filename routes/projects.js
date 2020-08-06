const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Project = require('../models/Project');

//routes

//@route POST /api/projects
//@desc Post a new Project link
//@access Private
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('body', 'Description of project is required').not().isEmpty(),
    check('link', 'Link is required').not().isEmpty(),
    //username is already available as it is a private route
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Pulling out
    const { name, body, link, isCompleted } = req.body;
    try {
      const user = await User.findById(req.user.id);
      const username = user.username;

      //creating  adoc to add to database
      const newProject = new Project({
        name,
        body,
        username,
        isCompleted,
        link,
        date: Date.now(),
      });
      //saving the doc to database
      const project = await newProject.save();
      //sending client
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route UPDATE /api/projects
//@desc Update Project link
//@access Private
router.put(
  '/:id',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('body', 'Description of project is required').not().isEmpty(),
    check('link', 'Link is required').not().isEmpty(),

    //username is already available as it is a private route
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Pulling out
    const { name, body, isCompleted, link } = req.body;

    try {
      let project = await Project.findById(req.params.id);
      let user;
      try {
        user = await User.findById(req.user.id);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
      const setProject = {
        name,
        body,
        isCompleted,
        link,
        username: user.username,
        date: Date.now(),
      };
      if (!project)
        return res.status(400).json({ msg: 'Project doesnt exist' });

      project = await Project.findByIdAndUpdate(
        req.params.id,
        {
          $set: setProject,
        },
        { new: true }
      );

      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE /api/projects
//@desc DELETE Project link
//@access Private
router.delete(
  '/:id',

  auth,
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(400).json({ msg: 'Project not found' });

      await Project.findByIdAndRemove(req.params.id);
      res.json({ msg: `Project ${project.name} is deleted` });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route GET /api/projects
//@desc Get Project link
//@access Public
router.get('/', async (req, res) => {
  try {
    projects = await Project.find().sort({ date: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//notie no message is being sent in json format
module.exports = router;
