<h1 align="center">✨Wishlist Importer</h1>
<h5 align="center">The greate library for scraping and importing sharable wishlist data.</h5>

## Features

Wishlist Importer provide wishlist items data for the supported domains in the library. the library manipulate HTML and fetch the data for the given sharable wishlist Url, given you a clean items data
where you can import and use in your code.

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
import { Scraper } from 'wishlist-importer';

// pass your sharable wishlist url to get the data..
const scraper = new Scraper();
const wishlistItems = await scraper.wishlistScraper('https://example.com');

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

## Contributing

You are welcome to contribute to ✨wishlist-importer! you can add more domain to be supported by the library. Please check the guidline below.

### Guideline

You should fork the repository, make changes in your own fork, and then submit a pull request.
Ensure the new code changes have associated unit tests. Additionally, for adding new domain
the new code should follow the structure implemented. First you can add in (src/enum) css selector
for the added domain, next you can add the logic in (src/scraper), and lastly add the test case to
validate the new code.

NOTE:
cheerio library is used for parsing and manipulating HTML and does not support XPath.
