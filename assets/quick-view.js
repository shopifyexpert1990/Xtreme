class QuickView extends HTMLElement {
  constructor() {
    super();
    this.init()
  }

 init() {
   if(this.querySelector("[data-quickview-action]")){
      this.querySelector("[data-quickview-action]").addEventListener('click', (event) => {
        event.preventDefault();
        const drawer = document.querySelector('#product-quic-kview');
        if (drawer) {
          this.setupEventListener(event,drawer)  
        }
        else if (this.dataset.productUrl) {
          window.location.href = this.dataset.productUrl;
        }
         
      });   
   }
  
  }
  setupEventListener(event,drawer) {
    const selector = '.quickview-body-content';
    const drawerContent = this.querySelector(selector);
    const drawerSelector = document.querySelector(".quickview-body-content");
     drawerSelector.classList.add("loading");
    this.querySelector("[data-quickview-action]").classList.add("loading")
    this.querySelector("[data-quickview-action]").querySelector(".quick-view-icon").classList.add("hidden")
    this.querySelector("[data-quickview-action]").querySelector(".quick-view-loader").classList.remove("hidden")
    drawerSelector.innerHTML = '';
    const productUrl = this.dataset.productUrl.split('?')[0];
    const sectionUrl = `${productUrl}?section_id=quick-view`;
    fetch(sectionUrl)
      .then(response => response.text())
      .then(responseText => {
          const responseHTML = new DOMParser().parseFromString(responseText, 'text/html');
          const productElement = responseHTML.querySelector(selector);
         drawerSelector.classList.remove("loading")
         
          drawerSelector.innerHTML = productElement.innerHTML; 
          drawer.classList.add("active")
          document.querySelector("body").classList.add("no-scroll");
          this.querySelector("[data-quickview-action]").classList.remove("loading")
          this.querySelector("[data-quickview-action]").querySelector(".quick-view-icon").classList.remove("hidden")
          this.querySelector("[data-quickview-action]").querySelector(".quick-view-loader").classList.add("hidden")
          if (window.Shopify && Shopify.PaymentButton) {
            Shopify.PaymentButton.init();
          }
          themeSlidersInit($("#featured-product-quick-view"));
          themeSlidersInit($("#featured-product-thumbnail-quick-view"));
          var code = (event.keyCode ? event.keyCode : event.which);
           if(code == 13) {
             setTimeout(function(){
                  focusElement == "" && (focusElement = drawerContent)
                  trapFocusElements(drawer) 
    
            },500)
           }
         if (window.ProductModel)  window.ProductModel.loadShopifyXR();
      })
      .catch(e => {
        console.error(e);
      });
  }
 
}
customElements.define('quick-view', QuickView);