<h1 align="center">Wishlist Importer</h1>
<h5 align="center">The greate library for scraping and importing sharable wishlist data.</h5>
<br>


## Installation

`npm install wishlist-importer`

## Features
Wishlist Importer provide wishlist data for the supported domains in the library. Wishlist Importer
manipulate HTML and fetch the data for the given sharable wishlist Url, given you a clean items data
where you can import and use in your system.

## Supporter Domains

For now wishlist-importer supports three Domains
- `mamasandpapas`
- `amazon`
- `ounass`

## Usage

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
