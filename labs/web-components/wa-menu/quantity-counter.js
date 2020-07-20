customElements.define('quantity-counter',
    class extends HTMLElement {
        constructor() {
            super();

            this.innerHTML = 
                `<button class="up"><div class="up"></div></button>
                 <div class="quantity"><span class="quantity">0<span></div>
                 <button class="down"><div class="down"></div></button>`;

            const upButton = this.querySelector('button.up');
            upButton.addEventListener('click', () => {
                this.count++;

                this.dispatchEvent(new CustomEvent('adjustCart', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        item: this.getAttribute('food-item'),
                        quantity: 1,
                        price: this.getAttribute('price'),
                        currency: this.getAttribute('currency')
                    }
                }));
            });
            const downButton = this.querySelector('button.down');
            downButton.addEventListener('click', () => {
                if (!parseInt(this.count)) {
                    this.count = 0;
                } else {
                    this.count--;
                    this.dispatchEvent(new CustomEvent('adjustCart', {
                        bubbles: true,
                        composed: true,
                        detail: {
                            item: this.getAttribute('food-item'),
                            quantity: -1,
                            price: this.getAttribute('price'),
                            currency: this.getAttribute('currency')
                        }
                    }));
                }
            });
        }

        get count() { return this.getAttribute('quantity') }

        set count(value) { this.setAttribute('quantity', value) }

        static get observedAttributes() { return ['quantity'] }

        attributeChangedCallback(name) {
            this.querySelector('.' + name).textContent = this.count;
        }
    }
);
