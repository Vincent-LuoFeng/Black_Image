const FORWARD_URL =
  process.env.STRIPE_FORWARD_URL ||
  'https://serinax.app/api/payment/notify/stripe';

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let rawBody;
  try {
    rawBody = await readRawBody(req);
  } catch (error) {
    console.error('[stripe-forward] failed to read request body', error);
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const headers = {};
  if (req.headers['stripe-signature']) {
    headers['stripe-signature'] = req.headers['stripe-signature'];
  }
  if (req.headers['content-type']) {
    headers['content-type'] = req.headers['content-type'];
  }

  try {
    const response = await fetch(FORWARD_URL, {
      method: 'POST',
      headers,
      body: rawBody,
    });

    const responseBody = await response.text();
    if (response.headers.get('content-type')) {
      res.setHeader('content-type', response.headers.get('content-type'));
    }
    return res.status(response.status).send(responseBody);
  } catch (error) {
    console.error('[stripe-forward] failed to forward request', error);
    return res.status(502).json({ error: 'Failed to forward webhook' });
  }
};

module.exports.config = {
  api: {
    bodyParser: false,
  },
};
