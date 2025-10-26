## Afribloc

Democratizing African Real Estate Investment

## Track

Onchain Finance & Real-World Assets (RWA)

Sub-track 2: Asset Tokenization

## Vision

AfriBloc is a compliant real-estate tokenization platform built on Hedera, enabling fractional ownership of professionally managed rental properties across Africa's fastest-growing markets. Starting with Lagos, Nigeria, we combine institutional-grade property operations with blockchain transparency to unlock access for everyday investors from $25.

- Minimum investment: $25 USD
- Target annual yield: 8-12% (rental income)
- Investment horizon: 3-5 years (capital appreciation at exit)
- Monthly distributions: HBAR (on-chain, auditable)
- Launch market: Lagos, Nigeria (21M population, <2% vacancy rate)

## Architecture

![afribloc-arch](/img/afribloc-arch.png)

## Why Hedera

1. **Hedera Token Service (HTS)**
   We mint a **restricted per-deal token (“bloc”)** with **KYC** and **Freeze** keys enabled. Investors are whitelisted (KYC-approved) and then **TokenAssociate** before receiving blocs. Freeze/Wipe allow issuer controls for redemptions or compliance actions. This gives us **regulatory-friendly transfer restrictions** without custom contracts.

2. **Scheduled Transactions**
   Monthly distributions run as time-boxed payout batches in **HBAR**. We snapshot holders, compute pro-rata amounts, and submit a **ScheduleCreate** → **ScheduleSign** sequence until all signatures (treasury/custodian) collect.

3. **Mirror Node**
   We read cap-table state, token transfer history, and payout receipts from the Mirror Node to render **verifiable receipts** in the investor dashboard (and include links in monthly performance emails).

4. **(Custody) Fireblocks + Hedera Custodian SDK**
   Post-KYC, we provision a **custodial Hedera account** per user via Fireblocks + the Hedera Custodian SDK. Accounts are **whitelisted** to hold the bloc token; no MetaMask/HashPack is required for optimal UX.

### Transaction Types (explicit)

- `TokenCreateTransaction` — create per-deal HTS token (treasury = custodian/issuer).
- `TokenUpdateTransaction` — set/rotate keys (KYC/Freeze/Wipe as needed).
- `TokenAssociateTransaction` — associate investor account to the token.
- `TokenGrantKycTransaction` / `TokenRevokeKycTransaction` — whitelist controls.
- `TokenFreezeTransaction` / `TokenUnfreezeTransaction` — transfer gating where required.
- `TokenMintTransaction` — issue blocs on subscription.
- `CryptoTransferTransaction` — deliver blocs / move HBAR for payouts.
- `ScheduleCreateTransaction` + `ScheduleSignTransaction` — automate batched HBAR distributions.

### Economic Justification

- **Sub-cent, predictable fees** + **fast finality** make **$25 minimums** and **monthly HBAR payouts** financially viable.
- HTS primitives (KYC/Freeze) remove the need for heavy custom contracts, lowering **audit surface** and **operational risk**.
- Mirror Node gives a built-in **audit trail** so support and investor relations don’t rely on off-chain ledgers.

## Testnet Properties

| Property                                      | Token ID                                                     |
| --------------------------------------------- | ------------------------------------------------------------ |
| 4 Bedroom Terrace Duplex (VGC, Lagos)         | [0.0.6837475](https://hashscan.io/testnet/token/0.0.6837475) |
| 4 Bedroom Terrace Duplex (Orchid Road, Lekki) | [0.0.6837476](https://hashscan.io/testnet/token/0.0.6837476) |
| 3 Bedroom Terrace Duplex (Ikota, Lekki)       | [0.0.6837477](https://hashscan.io/testnet/token/0.0.6837477) |

## Codebase

|                |                                                                      |
| -------------- | -------------------------------------------------------------------- |
| `backend-main` | Nodejs setup with Fireblocks & Hedera custodial service SDK          |
| `dapp-main`    | Nextjs setup for Dapp, Email login, Marketplace, Porfolio Management |

## Setup

### Requirements

- Fireblocks account to obtain key and secret
- Sumsub account to obtain app token and secret key
- Imagekit account to obtain public and private keys
- CoinGecko account to api key
- Resend account to api key and email
- PostgreSQL database
- Redis database
- Nodejs >v18.0 installed
- Git installed

### Steps

- Clone repository
- cd `backend-main`
- copy `.env.example` to `.env` and replace the values
- run `npm i`
- To start server, run `npm start:dev`
- Next, cd into `dapp-main`
- copy `.env.example` to `.env` and replace the values
- run `npm i`
- run `npm run dev`

```
//.env.example
BASE_URL=https://backend-main-url
NEXT_PUBLIC_BASE_URL=https://backend-main-url
SECRET_KEY={AUTH_SECRET}

//backend .env.example
APP_ENV=development
APP_NAME=AfriBloc
PORT=
APP_SECRET=(generate a strong random string)
ADMIN_EMAIL=
CLIENT_URL=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
MAIL_FROM=
MAIL_FROM_NAME=
RESEND_API_KEY=
SUMSUB_BASE_URL=
SUMSUB_APP_TOKEN=
SUMSUB_SECRET_KEY=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
FIREBLOCKS_API_KEY=
FIREBLOCKS_ADMIN_KEY=
FIREBLOCKS_ADMIN_ID=
COIN_GECKO_API_KEY=
```
