import { Scraper } from '../src/index';
import * as fs from 'fs';

describe('Scraping wishlist Url', () => {
  const scraper = new Scraper();

  //read sample data
  const sampleData = JSON.parse(
    fs.readFileSync(`./data/wishlist-data.json`, 'utf-8'),
  );

  const mamasandpapasData = sampleData[0].mamasandpapas_Data;

  //note: amazon data for item_price is changing frequently
  const amazonData = sampleData[1].amazon_Data;

  const ounassData = sampleData[2].ounass_Data;

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
      'https://en-saudi.ounass.com/wishlist/shared/d781e740-e68f-11ed-8a10-7ff9ae1ee681',
    );
    expect(data).toStrictEqual(ounassData);
  });

  test('test unsupprted domain', async () => {
    const data = await scraper.wishlistScraper('https://farfetch.com');
    expect(data).toStrictEqual({ message: 'Domain not supported' });
  });

  test('Scraping mamas&papas wishlist with custom headers', async () => {
    const data = await scraper.wishlistScraper(
      'https://en.mamasandpapas.com.sa/wishlist/shared?id=2d78c422df527b4a77bb283fb7',
      {
        proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
        },
      },
    );
    expect(data).toStrictEqual({
      message: 'Error encountred during fetching ',
    }); // this is the error implies that the request failed because we added invalid request config
  });
});
