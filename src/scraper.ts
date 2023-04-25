import { WishlistItem } from './wishlist-item.interface';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { amazonSelector, mamasandpapasSelector, ounassSelector, supportedDomain } from './enum';
import { setError, ErrorMessage } from './error';
import { AxiosRequestConfig } from 'axios';

export class Scraper {
  constructor() { }

  async mamasandpapasScraper(url: URL, axiosConfig?: AxiosRequestConfig): Promise<WishlistItem[] | ErrorMessage> {
    const wishlistItems: WishlistItem[] = [];

    try {
      // fetch html of the page we want to scrape
      const { data } = await axios.get(url.toString(), axiosConfig);

      // Load html we fetched in the previous line
      const $ = cheerio.load(data);

      // select all the list wishlistItem in b-tab-content b-toggle__content m-expanded class
      const list = $(mamasandpapasSelector.BASE_SELECTOR);

      // use .each method to loop through the selected css
      list.each((i, el) => {
        wishlistItems.push({
          item_name: $(el).find(mamasandpapasSelector.ITEM_NAME_SELECTOR).text(),
          item_price: $(el).find(mamasandpapasSelector.ITEM_PRICE_SELECTOR).attr('content').toString(),
          item_img: $(el).find(mamasandpapasSelector.ITEM_IMG_SELECTOR).attr('src').toString(),
          item_url: new URL(url.origin + $(el).find(mamasandpapasSelector.ITEM_URL_SELECTOR).attr('href').toString()).toString(),
        });
      });

      return wishlistItems;
    } catch (error) {
      return setError('Error encountred during fetching ');
    }
  }

  async amazonScraper(url: URL, axiosConfig?: AxiosRequestConfig): Promise<WishlistItem[] | ErrorMessage> {
    const wishlistItems: WishlistItem[] = [];

    try {
      // fetch html of the page we want to scrape
      const { data } = await axios.get(url.toString(), axiosConfig);


      // Load html we fetched in the previous line
      const $ = cheerio.load(data);

      const list = $(amazonSelector.BASE_SELECTOR);

      // use .each method to loop through the selected css
      list.each((i, el) => {
        wishlistItems.push({
          item_name: $(el).find(amazonSelector.ITEM_NAME_SELECTOR).attr('title').toString(),
          item_price: $(el).find(amazonSelector.ITEM_PRICE_SELECTOR).text(),
          item_img: $(el).find(amazonSelector.ITEM_IMG_SELECTOR).attr('src').toString(),
          item_url: new URL(url.origin + $(el).find(amazonSelector.ITEM_URL_SELECTOR).attr('href').toString()).toString(),
        });
      });
      return wishlistItems;
    } catch (error) {
      return setError('Error encountred during fetching ');
    }
  }

  async ounassScraper(url: URL, axiosConfig?: AxiosRequestConfig): Promise<WishlistItem[] | ErrorMessage> {
    const wishlistItems: WishlistItem[] = [];

    try {
      // fetch html of the page we want to scrape
      const { data } = await axios.get(url.toString(), axiosConfig);

      // Load html we fetched in the previous line
      const $ = cheerio.load(data);

      const list = $(ounassSelector.BASE_SELECTOR);

      // use .each method to loop through the selected css
      list.each((i, el) => {
        wishlistItems.push({
          item_name: $(el).find(ounassSelector.ITEM_NAME_SELECTOR).text(),
          item_price: $(el).find(ounassSelector.ITEM_PRICE_SELECTOR).text(),
          item_img: new URL(url.protocol + $(el).find(ounassSelector.ITEM_IMG_SELECTOR).attr('src').toString().substring(1)).toString(), // repalce the '//' at first with the protocol
          item_url: new URL(url.origin + $(el).find(ounassSelector.ITEM_URL_SELECTOR).attr('href').toString()).toString(), // add the origin to the url path to get the full url
        });
      });

      return wishlistItems;
    } catch (error) {
      return setError('Error encountred during fetching ');
    }
  }

  // validate url format method & call scraping method based on the domain
  async wishlistScraper(url: string, axiosConfig?: AxiosRequestConfig): Promise<WishlistItem[] | ErrorMessage | any> {
    try {
      const wishlistUrl = new URL(url);
      const requestConfig = axiosConfig ?? {};
      if (wishlistUrl.hostname.includes(supportedDomain.MAMAS_PAPAS_DOMAIN)) {
        return await this.mamasandpapasScraper(wishlistUrl, requestConfig);
      }
      if (wishlistUrl.hostname.includes(supportedDomain.AMAZON_DOMAIN)) {
        return await this.amazonScraper(wishlistUrl, requestConfig);
      }
      if (wishlistUrl.hostname.includes(supportedDomain.OUNASS_DOMAIN)) {
        return await this.ounassScraper(wishlistUrl, requestConfig);
      }

      return setError('Domain not supported');
    } catch (e) {
      throw new Error('Invalid Url');
    }
  }
}
