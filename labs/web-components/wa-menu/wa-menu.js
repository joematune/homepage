customElements.define('wa-menu',
    class extends HTMLElement {
        constructor() {
            super();
            const templateContent = document.getElementById('wa-menu-template').content;
            const shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(templateContent.cloneNode(true));

            this.messageHref = ({ info, ...items }) => {
                let completeOrder = '';
                let max = 0;
                let total = 0;
                Object.keys(items).forEach(item => {
                    let { price, quantity } = items[item];
                    let itemString = `[${quantity}x] ${item} - ${info.currency}${price * quantity}
`
                    completeOrder += itemString
                    max = itemString.length > max ? itemString.length : max;
                    total += quantity * price;
                });
                completeOrder += `${''.padStart(max, '-')}
Total: ${info.currency}${total}`;

                return encodeURI(`whatsapp://send?phone=${info.phone}&text=${completeOrder}`);
            };
        }

        connectedCallback() {
            let cart = this.shadowRoot.querySelector('shopping-cart');

            // Listen for an item being clicked and send order to shopping-cart
            this.addEventListener('adjustCart', (e) => {
                let { item, price, quantity } = e.detail;
                cart.count = parseInt(cart.count) + quantity;
                if (!cart.order[item]) {
                    cart.order[item] = { quantity: quantity, price: price };
                } else {
                    cart.order[item].quantity = 
                        cart.order[item].quantity + quantity;
                }
                this.shadowRoot.querySelector('.wa-link').href = this.messageHref(cart.order);
            });
        };
    }
);