import { Scraper } from '../src/index';
import * as fs from 'fs';

describe('Scraping wishlist Url', () => {
  const scraper = new Scraper();

  //read sample data
  let sampleData = JSON.parse(fs.readFileSync(`./data/wishlist-data.json`, 'utf-8'));

  let mamasandpapasData = sampleData[0].mamasandpapas_Data;

  //note: amazon data for item_price is changing frequently
  let amazonData = sampleData[1].amazon_Data;

  let ounassData = sampleData[2].ounass_Data;

  test('Scraping mamas&papas wishlist', async () => {
    const data = await scraper.wishlistScraper(
      'https://en.mamasandpapas.com.sa/wishlist/shared?id=2d78c422df527b4a77bb283fb7',
    );

    expect(data).toStrictEqual(mamasandpapasData);
  });

  test('Scraping Amazon wishlist', async () => {
    const data = await scraper.wishlistScraper(
      'https://www.amazon.sa/-/en/hz/wishlist/ls/3HNOX1XHXP6X6?ref_=wl_fv_le&viewType=list',
    );

    expect(data).toStrictEqual(amazonData);
  });

  test('Scraping Ounass wishlist', async () => {
    const data = await scraper.wishlistScraper(
      'https://en-saudi.ounass.com/wishlist/shared/0cfa1b20-d32d-11ed-948c-db4d3a08f2f3',
    );
    expect(data).toStrictEqual(ounassData);
  });

  test('test unsupprted domain', async () => {
    const data = await scraper.wishlistScraper('https://farfetch.com');
    expect(data).toStrictEqual({ message: 'Domain not supported' });
  });
});
