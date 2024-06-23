import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(`<div class="products-grid"></div>`);
    this.updateFilter();
  }

  renderProduct() {

    const productGridInner = createElement(`<div class="products-grid__inner"></div>`);
    this.elem.append(productGridInner);

    for (const product of this.filterProduct) {
      const productNewCard = new ProductCard(product);
      productGridInner.append(productNewCard.render());
    }

    return this.elem;
  }

  removeProduct() {
    const productGridInner = this.elem.querySelector(`.products-grid__inner`);

    if (productGridInner) {
      productGridInner.remove();
    }
  }

  updateFilter(filters) {
    for (const filter in filters) {
      this.filters[filter] = filters[filter];
    }

    if (Object.keys(this.filters).length === 0) {
      this.filterProduct = this.products;
    }

    const filterProductNuts = this.products.filter(({nuts}) => {
      if (!this.filters.noNuts || this.filters.noNuts == undefined) {
        return true;
      } else {
        if (this.filters.noNuts && !nuts) {
          return true;
        }
        return false;
      }
    });

    const filterProductVegaterian = filterProductNuts.filter(({vegeterian}) => {
      if (!this.filters.vegeterianOnly || this.filters.vegeterianOnly == undefined) {
        return true;
      } else {
        if (this.filters.vegeterianOnly && vegeterian) {
          return true;
        }
        return false;
      }
    });

    const filterProductSpiciness = filterProductVegaterian.filter(({spiciness}) => {
      if (spiciness <= this.filters.maxSpiciness || this.filters.maxSpiciness == undefined) {
        return true;
      } else {
        return false;
      }
    });

    this.filterProduct = filterProductSpiciness.filter(({category}) => {
      if (!this.filters.category || this.filters.category == undefined) {
        return true;
      } else { 
        if (category == this.filters.category) {
          return true;
        }
        return false;
      }
    });

    this.removeProduct();
    this.renderProduct();
  }
}
