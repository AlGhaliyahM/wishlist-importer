import { Scraper } from './scraper';
import { Wishlist } from './wishlist.interface';
import { amazonSelector, mamasandpapasSelector, ounassSelector } from './enum';
async function main(url: string): Promise<Wishlist[] | any> {
  let wishlist__product;
  const scraper = new Scraper(url);
  let Url = new URL(url);
  let domain = Url.hostname;
  console.log(domain);
  if (domain == amazonSelector.DOMAIN) wishlist__product = await scraper.amazonScraper();
  if (domain == mamasandpapasSelector.DOMAIN) wishlist__product = await scraper.mamasandpapasScraper();
  if (domain == ounassSelector.DOMAIN) wishlist__product = await scraper.ounassScraper();

  console.log(wishlist__product);
  // return wishlist__product;
}
export { main };
