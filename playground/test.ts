import { main } from '../src/index';
const test = (url: string) => {
  main(url);
};

const start = () => {
  test('https://en.mamasandpapas.com.sa/wishlist/shared?id=2d78c422df527b4a77bb283fb7');
};

start();
export { start };

// import { Greeter } from '../src/index';
// const test = (name: String) => {
//   console.log('====================================');
//   Greeter(name);
//   console.log('====================================');
// };

// const urls = ['1', '2', '3'];

// const start = () => {
//   urls.forEach((url) => {
//     test('Alghaliyah');
//   });
// };

// start();

// export { start };
