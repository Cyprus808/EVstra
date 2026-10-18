# EVstra

A minimal, responsive EV parts storefront built with Vite and vanilla JavaScript. Includes eight vehicle makes, dependent model selection, four parts categories, a persistent shopping bag, and a clearly labelled demo checkout. Fonts and illustrations are served locally.

## Development

Requires Node.js 20.19+ or 22.12+ (validated with Node 24).

```sh
npm ci
npm run dev -- --port 5173
```

## Validation

```sh
npm run build
npm test
```

Run the development server before `npm test`. The browser integration test uses Chromium at `/usr/bin/chromium`; set `CHROMIUM_PATH` for a different installation and `TEST_BASE_URL` for a different server URL. It exercises every make/model list, vehicle selection, category filtering, cart totals, quantity changes, persistence, the demo checkout, and mobile overflow checks.

## Before selling

This is a storefront prototype. Products, prices, and compatibility are samples; selecting a vehicle does not establish real fitment. Currency currently defaults to EUR. No orders or payments are processed.

A production shop needs a real catalogue with year/trim/fitment data, inventory, a server-side order and payment integration with verified webhooks, shipping and tax calculations, and business-specific returns/privacy/terms content. Never place payment secrets in client code. Configure these once the selling region, provider, catalogue, and business policies are known.
