const express = require('express');
const router = express.Router();

const Food = require('../models/food');
const User = require('../models/user');

const { isAuthenticated  } = require("../middleware/authenticated")

const { Types: { ObjectId }} = require('mongoose');

router.get('/', isAuthenticated, async (req, res) => {
    const { id: userId } = await User.findOne({ email: req.user.email });
    const foods = await Food.aggregate([
        {
            $lookup: {
                from: 'favoritefoods',
                localField: '_id',
                foreignField: 'food',
                as: 'favorite'
            }
        },
        {
            $addFields: {
                id: '$_id',
                isFavorite: {
                    $cond: {
                        if: {
                            $in: [ ObjectId.createFromHexString(userId), '$favorite.user']
                        },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                favorite: 0,
                _id: 0
            }
        }
    ]);
    res.json(foods);
});

router.get('/:id', isAuthenticated, async (req, res) => {
    const food = await Food.findById(req.params.id);
    if (!food) {
        return res.status(404).send({ message: 'Food not found' });
    }
    res.json(food);
});

router.get('/category/:category', isAuthenticated, async (req, res) => {
    const foods = await Food.find({ category: req.params.category });
    res.json(foods);
});

module.exports = router;