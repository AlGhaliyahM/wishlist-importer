import { WishlistItem } from './wishlist-item.interface';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { amazonSelector, mamasandpapasSelector, ounassSelector, supportedDomain } from './enum';
import { setError, ErrorMessage } from './error';

export class Scraper {
  constructor() {}

  async mamasandpapasScraper(url: string): Promise<WishlistItem[] | ErrorMessage> {
    const wishlistItems: WishlistItem[] = [];

    try {
      // fetch html of the page we want to scrape
      const { data } = await axios.get(url);

      // Load html we fetched in the previous line
      const $ = cheerio.load(data);
      // select all the list wishlistItem in b-tab-content b-toggle__content m-expanded class
      const list = $(mamasandpapasSelector.BASE_SELECTOR);

      // use .each method to loop through the selected css
      list.each((i, el) => {
        wishlistItems.push({
          item_name: $(el).find(mamasandpapasSelector.ITEM_NAME_SELECTOR).text(),
          item_price: $(el).find(mamasandpapasSelector.ITEM_PRICE_SELECTOR).attr('content') + '',
          item_img: $(el).find(mamasandpapasSelector.ITEM_IMG_SELECTOR).attr('src') + '',
          item_url: $(el).find(mamasandpapasSelector.ITEM_URL_SELECTOR).attr('href') + '',
        });
      });

      return wishlistItems;
    } catch (error) {
      return setError('Error encountred during fetching ');
    }
  }

  async amazonScraper(url: string): Promise<WishlistItem[] | ErrorMessage> {
    const wishlistItems: WishlistItem[] = [];

    try {
      // fetch html of the page we want to scrape
      const { data } = await axios.get(url);

      // Load html we fetched in the previous line
      const $ = cheerio.load(data);

      const list = $(amazonSelector.BASE_SELECTOR);

      // use .each method to loop through the selected css
      list.each((i, el) => {
        wishlistItems.push({
          item_name: $(el).find(amazonSelector.ITEM_NAME_SELECTOR).attr('title') + '',
          item_price: $(el).find(amazonSelector.ITEM_PRICE_SELECTOR).text(),
          item_img: $(el).find(amazonSelector.ITEM_IMG_SELECTOR).attr('src') + '',
          item_url: $(el).find(amazonSelector.ITEM_URL_SELECTOR).attr('href') + '',
        });
      });
      return wishlistItems;
    } catch (error) {
      return setError('Error encountred during fetching ');
    }
  }

  async ounassScraper(url: string): Promise<WishlistItem[] | ErrorMessage> {
    const wishlistItems: WishlistItem[] = [];

    try {
      // fetch html of the page we want to scrape
      const { data } = await axios.get(url);

      // Load html we fetched in the previous line
      const $ = cheerio.load(data);

      const list = $(ounassSelector.BASE_SELECTOR);

      // use .each method to loop through the selected css
      list.each((i, el) => {
        wishlistItems.push({
          item_name: $(el).find(ounassSelector.ITEM_NAME_SELECTOR).text(),
          item_price: $(el).find(ounassSelector.ITEM_PRICE_SELECTOR).text(),
          item_img: $(el).find(ounassSelector.ITEM_IMG_SELECTOR).attr('src') + '',
          item_url: $(el).find(ounassSelector.ITEM_URL_SELECTOR).attr('href') + '',
        });
      });

      return wishlistItems;
    } catch (error) {
      return setError('Error encountred during fetching ');
    }
  }

  // validate url format method & call scraping method based on the domain
  async wishlistScraper(url: string): Promise<WishlistItem[] | ErrorMessage> {
    try {
      const supportedDomains = Object.values(supportedDomain);
      let flag = false;

      // check if the given domain url is supported
      for (const domain in supportedDomains) {
        if (url.includes(supportedDomains[domain]) && url.includes(supportedDomain.MAMAS_PAPAS_Domain)) {
          flag = true;
          return await this.mamasandpapasScraper(url);
        }
        if (url.includes(supportedDomains[domain]) && url.includes(supportedDomain.AMAZON_DOMAIN)) {
          flag = true;
          return await this.amazonScraper(url);
        }
        if (url.includes(supportedDomains[domain]) && url.includes(supportedDomain.OUNASS_DOMAIN)) {
          flag = true;
          return await this.ounassScraper(url);
        }
      }
      if (flag == false) return setError('Domain not supported');

      return setError('Domain not supported');
    } catch (e) {
      throw new Error('Invalid Url');
    }
  }
}
