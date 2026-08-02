import Stripe from 'stripe';
import User from '../models/User.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.userId;

    // We create an inline price dynamically for the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      client_reference_id: userId.toString(),
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'GrowO Pro Subscription',
              description: 'Unlock unlimited AI Coaching and Pattern Insights',
            },
            unit_amount: 900, // $9.00/month
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard?success=true`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/pricing?canceled=true`,
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    res.status(500).json({ success: false, message: 'Could not create checkout session' });
  }
};

export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // req.body must be the RAW buffer here for Stripe to verify the signature!
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.client_reference_id;
    const customerId = session.customer;

    if (userId) {
      // UPGRADE THE USER!
      await User.findByIdAndUpdate(userId, {
        plan: 'pro',
        stripeCustomerId: customerId,
      });
      console.log(`User ${userId} successfully upgraded to PRO!`);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};
