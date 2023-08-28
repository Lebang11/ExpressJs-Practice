const { Router } = require('express');

const router = Router();

const supermarkets = [
    {
        id: 1,
        store: 'Whole Foods',
        miles: 0.6,
    },
    {
        id: 2,
        store: 'Trader Joes',
        miles: 1,
    },
    {
        id: 3,
        store: 'Albertsons',
        miles: 2.8,
    },
    {
        id: 4,
        store: 'Trader Joes',
        miles: 3.5,
    },
    {
        id: 5,
        store: 'Albertsons',
        miles: 1.8,
    },
    
]

router.get('/', (req, res) => {
    const {miles} = req.query;
    const parsedMiles = parseInt(miles);
    if (!isNaN(parsedMiles)) {
        const filteredStores = supermarkets.filter((store) => store.miles <= parsedMiles);
        res.send(filteredStores);
    } else res.send(supermarkets);
    console.log({miles});
    console.log(req.query);
});



module.exports = router