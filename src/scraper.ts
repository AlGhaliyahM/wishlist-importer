import { Wishlist } from './wishlist.interface';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { amazonSelector, mamasandpapasSelector } from './enum';

export class Scraper {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  async mamasandpapasScraper(): Promise<Wishlist[] | any> {
    console.log('INSIDE MAMA&PAPAS');
    let Url = new URL(this.url);
    let domain = Url.hostname;
    const wishlists: Wishlist[] = [];

    if (this.isValidUrl()) {
      try {
        // fetch html of the page we want to scrape
        const { data } = await axios.get(this.url);

        // Load html we fetched in the previous line
        const $ = cheerio.load(data);
        // select all the list items in b-tab-content b-toggle__content m-expanded class
        const wishlistItems = $(mamasandpapasSelector.BASE_SELECTOR);

        // use .each method to loop through the selected css
        wishlistItems.each((i, el) => {
          wishlists.push({
            item_name: $(el).find(mamasandpapasSelector.ITEM_NAME_SELECTOR).text(),
            item_price: $(el).find(mamasandpapasSelector.ITEM_PRICE_SELECTOR).attr('content') + '',
            item_img: $(el).find(mamasandpapasSelector.ITEM_IMG_SELECTOR).attr('src') + '',
            item_url:
              'https://' +
              mamasandpapasSelector.DOMAIN +
              $(el).find(mamasandpapasSelector.ITEM_URL_SELECTOR).attr('href'),
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

  async amazonScraper(): Promise<Wishlist[] | any> {
    console.log('INSIDE AMAZON SCRAPING METHOD');
    let Url = new URL(this.url);
    let domain = Url.hostname;
    const wishlists: Wishlist[] = [];

    if (this.isValidUrl()) {
      try {
        // fetch html of the page we want to scrape
        const { data } = await axios.get(this.url);

        // Load html we fetched in the previous line
        const $ = cheerio.load(data);

        const wishlistItems = $(amazonSelector.BASE_SELECTOR);

        // use .each method to loop through the selected css
        wishlistItems.each((i, el) => {
          wishlists.push({
            item_name: $(el).find(amazonSelector.ITEM_NAME_SELECTOR).attr('title') + '',
            item_price: $(el).find(amazonSelector.ITEM_PRICE_SELECTOR).text(),
            item_img: $(el).find(amazonSelector.ITEM_IMG_SELECTOR).attr('src') + '',
            item_url:
              'https://' + amazonSelector.DOMAIN + $(el).find(amazonSelector.ITEM_URL_SELECTOR).attr('href') + '',
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

  //validate url format method
  isValidUrl() {
    try {
      let Url = new URL(this.url);
      return Boolean(Url);
    } catch (e) {
      return false;
    }
  }
}
