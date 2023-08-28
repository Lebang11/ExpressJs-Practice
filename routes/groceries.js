const {Router} = require('express');
const router = Router();

const groceryList = [
    {
        item: 'milk',
        quantity: 2
    },
    {
        item: 'cereal',
        quantity: 1
    },
    {
        item: 'pop-tarts',
        quantity: 1
    }
];

router.get('/groceries', (req, res) => {
    res.send(groceryList);
});

router.get('/groceries/:item', (req, res) => {
    const {item} = req.params;
    const groceryItem = groceryList.find((g) => item === g.item);
    res.send(groceryItem);
});

router.post('/groceries', (req, res) =>{
    console.log(req.body);
    groceryList.push(req.body);
    req.send(201);
});

module.exports = router;