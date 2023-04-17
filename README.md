<h1 align="center">Wishlist Importer</h1>
<h5 align="center">The greate library for scraping and importing sharable wishlist data.</h5>

## Features
Wishlist Importer provide wishlist data for the supported domains in the library. Wishlist Importer
manipulate HTML and fetch the data for the given sharable wishlist Url, given you a clean items data
where you can import and use in your system.

## Installation

`npm install wishlist-importer`

### Test

Test your code with Jest framework:

```bash
npm run test
```
### Build

Build production (distribution) files in your **dist** folder:

```bash
npm run build
```

## Usage

```js
import {Scraper} from 'wishlist-importer'

// pass your sharable wishlist url to get the data..
const scraper = new Scraper();
const wishlistItems = await scraper.wishlistScraper("https://example.com");

/*
expected output >> array of items
[
  {
    item_name: '...',
    item_price: '...',
    item_img: '...',
    item_url: '...'
  }
  ,
  {
    item_name: '...',
    item_price: '...',
    item_img: '...',
    item_url: '...'
  }
]

*/


```

## Supported Domains

For now wishlist-importer supports three Domains
- `mamasandpapas`
- `amazon`
- `ounass`

