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

router.get('/', (req, res) => {
    res.cookie('visited', true, {
        maxAge: 10000,
    })
    res.send(groceryList);
});

router.get('/:item', (req, res) => {
    console.log(req.cookies);
    const {item} = req.params;
    const groceryItem = groceryList.find((g) => item === g.item);
    res.send(groceryItem);
});

router.post('/', (req, res) =>{
    console.log(req.body);
    groceryList.push(req.body);
    res.send(201);
});

router.get('/shopping/cart', (req, res) => {
    const { cart } = req.session;
    if (!cart) {
        res.send('You have no cart session');
    } else {
        res.send(cart)
    }
})

router.post('/shopping/cart/item', (req, res) => {
    const {item, quantity} =req.body;
    const cartItem = {item, quantity}
    console.log(cartItem);
    //res.send(req.session);
    //res.send(req.sessionID);
    const { cart } = req.session;
    if (cart) {
        req.session.cart.items.push(cartItem);
    } else {
        req.session.cart = {
            items: [cartItem],
        }
    }

    res.send(201)
})

module.exports = router;