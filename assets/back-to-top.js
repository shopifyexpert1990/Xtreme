if (!customElements.get("back-to-top")) {
    class BackToTop extends HTMLElement {
        constructor() {
            super(), this.pageHeight = window.innerHeight
        }
        connectedCallback() {
            this.addEventListener("click", this.onClick), this.addEventListener("touchstart", this.onClick, {
                passive: !0
            }), window.addEventListener("scroll", this.checkVisible.bind(this))
        }
        checkVisible(event) {
            window.requestAnimationFrame(() => {
                window.scrollY > this.pageHeight ? this.classList.add("back-to-top--active") : this.classList.remove("back-to-top--active")
            })
        }
        onClick() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            })
        }
    }
    customElements.define("back-to-top", BackToTop)
}
