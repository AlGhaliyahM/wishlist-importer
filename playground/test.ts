import { Scraper } from '../src/index';

async function test(url: string) {
  let wishlist__product;
  const scraper = new Scraper();
  wishlist__product = await scraper.wishlistScraper(url);
  console.log(wishlist__product);
  return wishlist__product;
}

//assign wishlist urls in urls[] array to test
const urls = ['https://en.mamasandpapas.com.sa/wishlist/shared?id=2d78c422df527b4a77bb283fb7'];
const start = () => {
  urls.forEach((url) => {
    test(url);
  });
};

start();
export { start };
