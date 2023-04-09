import { Scraper } from '../src/scraper';

async function test(url: string) {
  let wishlist__product;
  const scraper = new Scraper();
  wishlist__product = await scraper.wishlistScraper(url);
  console.log(wishlist__product);
  return wishlist__product;
}
const urls = [
  'https://en.mamasandpapas.com.sa/wishlist/shared?id=2d78c422df527b4a77bb283fb7',
  'https://www.amazon.sa/-/en/hz/wishlist/ls/3HNOX1XHXP6X6?ref_=wl_fv_le&viewType=list',
  'https://en-saudi.ounass.com/wishlist/shared/0cfa1b20-d32d-11ed-948c-db4d3a08f2f3',
];
const start = () => {
  urls.forEach((url) => {
    test(url);
  });
};

start();
export { start };
