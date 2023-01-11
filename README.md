# Introduction

This project is created with Nuxt 3, when this project started Nuxt 3 is just released its RC1 version.

This project is created using Nuxt 3 capabilities and mixed with Pinia

## Demo: [Take me there](http://dickopokedex.vercel.app "Let's Go")

Please understand the slowness of any SSR function in the demo because I'm using the free Vercel tier to deploy, there are some limitations with the free tier, especially the serverless function being so slow.

# Guide

1. MongoDB Atlas
2. Nuxt 3

# MongoDB Atlas

[Website](https://www.mongodb.com/atlas/database "Atlas")

1. Please register/login to MongoDB Atlas
2. Create a cluster
3. Create a user for access
4. Rename .env.example to .env
5. Fill the information needed with your MongoDB Atlas Database

# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

When first running the application please be patient with the init load, because the apps will populate the MongoDB.

> Please do refresh multiple times, right now there are around 1k pokemon in the poke-api but, the API won't let you get all the pokemon in one go. I already make the api to repopulate again if needed (only the needed item).

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment) for more information. 
