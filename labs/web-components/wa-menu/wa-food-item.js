customElements.define('wa-food-item',
    class extends HTMLElement {
        constructor() {
            super();

            let foodItem = document.createElement('strong');
            foodItem.classList.add('food-item');
            foodItem.textContent = this.getAttribute('food-item');
            this.appendChild(foodItem);
            
            let description = document.createElement('div');
            description.classList.add('description');
            description.innerHTML = this.getAttribute('description').replace(/(\S+)/g, '<span class="word">$1</span>');
            this.appendChild(description);

            let ellipsisAndPrice = document.createElement('span');
            ellipsisAndPrice.classList.add('ellipsis-price');
            description.appendChild(ellipsisAndPrice);

            let ellipsis = document.createElement('span');
            ellipsis.classList.add('ellipsis');
            ellipsisAndPrice.appendChild(ellipsis);

            let price = document.createElement('span');
            price.classList.add('price');
            price.textContent = this.getAttribute('currency') + this.getAttribute('price');
            ellipsisAndPrice.appendChild(price);
        }
    }
);
