//CSS selector is assgined based on the wishlist domain [amazon.sa, mamasandpapas.sa]
enum mamasandpapasSelector {
  BASE_SELECTOR = '#tab-item-all.b-tab-content.b-toggle__content.m-expanded div.b-wishlist__product.col-6.col-md-4.col-lg-3',
  ITEM_NAME_SELECTOR = 'div.b-wishlist-tile__name',
  ITEM_PRICE_SELECTOR = 'span.b-price__value',
  ITEM_IMG_SELECTOR = '.b-product-tile__image-img.tile-image.js-product__image',
  ITEM_URL_SELECTOR = '.b-wishlist-tile__image-link',
}

enum amazonSelector {
  BASE_SELECTOR = '#content-right.a-fixed-left-grid-col.a-col-right ul.a-unordered-list.a-nostyle.a-vertical.a-spacing-none.g-items-section.ui-sortable li.a-spacing-none.g-item-sortable',
  ITEM_NAME_SELECTOR = 'h2.a-size-base a.a-link-normal',
  ITEM_PRICE_SELECTOR = 'span.a-price span.a-offscreen',
  ITEM_IMG_SELECTOR = 'a.a-link-normal img',
  ITEM_URL_SELECTOR = 'a.a-link-normal',
}

enum ounassSelector {
  BASE_SELECTOR = 'div.WishList-products div.WishListItemDesktop',
  ITEM_NAME_SELECTOR = 'div.WishListItemDesktop-name',
  ITEM_PRICE_SELECTOR = 'span.WishListItemDesktop-minPrice',
  ITEM_IMG_SELECTOR = 'img.WishListItemDesktop-image',
  ITEM_URL_SELECTOR = 'a.WishListItemDesktop-link',
}

enum supportedDomain {
  MAMAS_PAPAS_Domain = 'mamasandpapas.com.sa',
  AMAZON_DOMAIN = 'amazon.sa',
  OUNASS_DOMAIN = 'ounass.com',
}
export { mamasandpapasSelector, amazonSelector, ounassSelector, supportedDomain };
