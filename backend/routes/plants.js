const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Plant = require('../models/Plant');
const mongoose = require('mongoose');
router.post('/', auth, async (req, res) => {
  try {
    const newPlant = new Plant({
      ...req.body,
      user: req.user.id
    });
    await newPlant.save();
    res.json(newPlant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const plants = await Plant.find({ user: req.user.id }).sort('-createdAt');
    res.json(plants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    // 1. Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid plant ID' });
    }

    // 2. Find plant
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ msg: 'Plant not found' });
    }

    // 3. Check ownership
    if (plant.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Plant.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Plant removed' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
