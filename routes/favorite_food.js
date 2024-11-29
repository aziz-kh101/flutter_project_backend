const router = require('express').Router();

const FavoriteFood = require('../models/favorite_food');
const User = require('../models/user');

const { isAuthenticated } = require('../middleware/authenticated');

const {Types: {ObjectId}} = require('mongoose');   

router.get('/', isAuthenticated, async (req, res) => {
    const favoriteFoods = await FavoriteFood.find().populate('food');
    res.json(favoriteFoods);
});

router.post('/', isAuthenticated, async (req, res) => {
    const { food } = req.body;
    console.log(req.body);
    const { id: userId } = await User.findOne({ email: req.user.email });
    console.log(userId, food);
    const favoriteFood = new FavoriteFood({ user: ObjectId.createFromHexString(userId), food:  ObjectId.createFromHexString(food) });
    await favoriteFood.save();
    res.status(201).json(favoriteFood);
});

router.delete('/food/:id', isAuthenticated, async (req, res) => {
    const { id: userId } = (await User.findOne({ email: req.user.email })).toJSON();
    
    const favoriteFood = await FavoriteFood.findOneAndDelete({ user:  ObjectId.createFromHexString(userId), food:  ObjectId.createFromHexString(req.params.id)  });
    if (!favoriteFood) {
        return res.status(404).send({ message: 'Favorite food not found' });
    }
    res.json(favoriteFood);
});

module.exports = router;