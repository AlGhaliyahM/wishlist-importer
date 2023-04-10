import { Scraper } from '../src/scraper';

async function test(url: string) {
  let wishlist__product;
  const scraper = new Scraper();
  wishlist__product = await scraper.wishlistScraper(url);
  console.log(wishlist__product);
  return wishlist__product;
}

//assign wishlist urls in urls[] array to test
const urls = [''];
const start = () => {
  urls.forEach((url) => {
    test(url);
  });
};

start();
export { start };
