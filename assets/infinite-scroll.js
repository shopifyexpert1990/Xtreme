class InfiniteScroll extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', this.onClickHandler.bind(this));
    this.addEventListener('keypress', function(event){
      if(event.key === "Enter"){
        this.onClickHandler()
      }
      
    });
   
  }

  onClickHandler(event) {
    console.log(event,"enter")
    if (this.classList.contains('loading') || this.classList.contains('disabled')) return;
    this.classList.add('loading');
    this.classList.add('disabled');

    const sections = InfiniteScroll.getSections();
    sections.forEach(() => {
      const url = this.dataset.url;
      InfiniteScroll.renderSectionFetch(url);
    });
  }

  handleIntersection(entries, observer) {
    if (!entries[0].isIntersecting) return;
    observer.unobserve(this);
    this.onClickHandler();
  }

  static getSections() {
    return [
      {
        section: document.getElementById('result-product-grid').dataset.id,
      }
    ]
  }

  static renderSectionFetch(url) {
    fetch(url)
      .then(response => response.text())
      .then((responseText) => {
        const html = responseText;
        InfiniteScroll.renderPagination(html);
        InfiniteScroll.renderProductGridContainer(html);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  static renderPagination(html) {
    const container = document.getElementById('ProductGridContainer').querySelector('.pagination-container');
    const pagination = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductGridContainer').querySelector('.pagination-wrapper');
    if (pagination) {
      container.innerHTML = pagination.innerHTML;
    }
    else {
      container.remove();
    }
  }

  static renderProductGridContainer(html) {
    const productsContainer = document.getElementById('result-product-grid');
    const products = new DOMParser().parseFromString(html, 'text/html').getElementById('result-product-grid');
    productsContainer.insertAdjacentHTML('beforeend', products.innerHTML);
    let querySelectorGrid=productsContainer.querySelector(".grid-row:last-child")
     setTimeout(function(){
        focusElement == "" && (focusElement = querySelectorGrid)
        let elements = getFocusableElements(querySelectorGrid);
        if (elements == !1) return !1;
        let first = elements[0];
        first.focus();
       
        },500)
    if (animationCheck) {
        if (AOS) {
             AOS.refreshHard()
          }
    }
  }
}
customElements.define('infinite-scroll', InfiniteScroll);