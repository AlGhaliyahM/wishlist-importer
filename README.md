<h1 align="center">Wishlist Importer</h1>
<h5 align="center">The greate library to import your wishlist.</h5>

# Wishlist importer

```js
import {Scraper} from 'wishlist-importer'

// pass your sharable wishlist url to get the data..

const wishlistItems = await scraper.wishlistScraper(url);

/*
expected output 
{
    item_name: '...',
    item_price: '...',
    item_img: '...',
    item_url: '...'
  }
*/


```

## Installation

`npm install wishlist-importer`
