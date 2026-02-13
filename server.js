const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY_HERE'); 
app.use(express.json());
app.use(express.static('.')); 

app.post('/create-checkout-session', async (req, res) => {
    const { item, price } = req.body;
    
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item,
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success.html', 
            cancel_url: 'http://localhost:3000/index.html', 
        });
        
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});