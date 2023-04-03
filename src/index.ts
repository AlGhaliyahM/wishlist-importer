import { Scraper } from './scraper';
import { WishlistData } from './wishlistData.interface';

async function main(url: string): Promise<WishlistData[] | any> {
  const scraper = new Scraper();
  let wishlist__product;
  wishlist__product = await scraper.mamasandpapasScraper(url);
  console.log('insise main');
  console.log(wishlist__product);

  return wishlist__product;
}
export { main };
