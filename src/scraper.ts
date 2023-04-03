import { WishlistData } from './wishlistData.interface';
import * as cheerio from 'cheerio';
import axios from 'axios';

export class Scraper {
  constructor() {}

  async mamasandpapasScraper(url: string): Promise<WishlistData[] | any> {
    console.log('inside mama&papaas');
    let Url = new URL(url);
    let domain = Url.hostname;
    const wishlists: WishlistData[] = [];

    if (this.isValidUrl(url)) {
      try {
        // Fetch HTML of the page we want to scrape
        const { data } = await axios.get(url);

        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data);
        // Select all the list items in b-tab-content b-toggle__content m-expanded class
        const wishlistItems = $(mamasandpapasCSS.BASE_SELECTOR);

        // Use .each method to loop through the selected css
        wishlistItems.each((i, el) => {
          wishlists.push({
            item_name: $(el).find(mamasandpapasCSS.ITEM_NAME_SELECTOR).text(),
            item_price: $(el).find(mamasandpapasCSS.ITEM_PRICE_SELECTOR).attr('content') + '',
            item_img: $(el).find(mamasandpapasCSS.ITEM_IMG_SELECTOR).attr('src') + '',
            item_url: 'https://' + domain + $(el).find(mamasandpapasCSS.ITEM_URL_SELECTOR).attr('href'),
          });
        });

        return {
          items: wishlists,
        };
      } catch (error) {
        return { error: 'error encountred during fetching ' };
      }
    } else {
      return { error: 'URL is not valid' };
    }
  }

  async amazonScraper(url: string) {}

  //Validate Url format method
  isValidUrl(url: string) {
    console.log('URL Validation');
    try {
      let Url = new URL(url);
      return Boolean(Url);
    } catch (e) {
      return false;
    }
  }
}

enum mamasandpapasCSS {
  BASE_SELECTOR = '#tab-item-all.b-tab-content.b-toggle__content.m-expanded div.b-wishlist__product.col-6.col-md-4.col-lg-3',
  ITEM_NAME_SELECTOR = 'div.b-wishlist-tile__name',
  ITEM_PRICE_SELECTOR = 'span.b-price__value',
  ITEM_IMG_SELECTOR = '.b-product-tile__image-img.tile-image.js-product__image',
  ITEM_URL_SELECTOR = '.b-wishlist-tile__image-link',
  DOMAIN = 'en.mamasandpapas.com.sa',
}
