import { lemonSqueezySetup, createCheckout } from '@lemonsqueezy/lemonsqueezy.js';
import User from '../models/User.js';
import crypto from 'crypto';

// Setup Lemon Squeezy with the API key from environment variables
// It will silently fail on boot if missing, but we handle it in the endpoint
const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
if (apiKey) {
  lemonSqueezySetup({
    apiKey: apiKey,
    onError: (error) => console.error("Lemon Squeezy Error:", error),
  });
}

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.userId;
    
    // We need the Store ID and Variant ID to create a checkout
    // These will come from your Lemon Squeezy dashboard!
    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
    const variantId = process.env.LEMON_SQUEEZY_VARIANT_ID; // The ID of your "GrowO Pro" product

    if (!storeId || !variantId || !process.env.LEMON_SQUEEZY_API_KEY) {
      console.warn("Lemon Squeezy keys are missing! Simulating a 500 error so the frontend catches it gracefully.");
      return res.status(500).json({ success: false, message: 'Payment gateway not fully configured yet.' });
    }

    const { data, error } = await createCheckout(storeId, variantId, {
      checkoutData: {
        custom: {
          user_id: userId.toString(), // We pass the MongoDB user ID so the webhook knows who paid
        },
      },
      checkoutOptions: {
        embed: false, // We'll just redirect them to the hosted page for now
      }
    });

    if (error) {
      console.error('Lemon Squeezy Checkout Error:', error);
      return res.status(500).json({ success: false, message: 'Could not create checkout session' });
    }

    res.json({ success: true, url: data.data.attributes.url });
  } catch (error) {
    console.error('Lemon Squeezy Checkout Exception:', error);
    res.status(500).json({ success: false, message: 'Could not create checkout session' });
  }
};

export const handleWebhook = async (req, res) => {
  try {
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
    const signature = req.headers['x-signature'];

    if (!secret) {
        return res.status(500).send('Webhook secret missing');
    }

    // Verify the Lemon Squeezy signature using HMAC SHA256
    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(req.body).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature || '', 'utf8');

    if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
      console.error('Lemon Squeezy Webhook signature verification failed');
      return res.status(400).send('Webhook signature verification failed');
    }

    // Parse the JSON now that we've verified it
    const event = JSON.parse(req.body.toString());

    // Handle the subscription created event
    if (event.meta.event_name === 'subscription_created') {
      const customData = event.meta.custom_data;
      const userId = customData?.user_id;
      const customerId = event.data.attributes.customer_id; // Lemon Squeezy Customer ID

      if (userId) {
        // UPGRADE THE USER!
        await User.findByIdAndUpdate(userId, { 
          plan: 'pro',
          stripeCustomerId: customerId.toString() // We can reuse this field for LS Customer ID
        });
        console.log(`User ${userId} successfully upgraded to PRO via Lemon Squeezy!`);
      }
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
