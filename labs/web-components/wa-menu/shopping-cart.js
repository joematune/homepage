customElements.define('shopping-cart',
    class extends HTMLElement {
        constructor() {
            super();

            this.innerHTML = `
                <svg class="cart-icon" x="0px" y="0px" viewBox="0 0 512 512">
                    <path d="M214.685,402.828c-24.829,0-45.029,20.2-45.029,45.029c0,24.829,20.2,45.029,45.029,45.029s45.029-20.2,45.029-45.029
                        C259.713,423.028,239.513,402.828,214.685,402.828z M214.685,467.742c-10.966,0-19.887-8.922-19.887-19.887
                        c0-10.966,8.922-19.887,19.887-19.887s19.887,8.922,19.887,19.887C234.572,458.822,225.65,467.742,214.685,467.742z" />
                    <path d="M372.63,402.828c-24.829,0-45.029,20.2-45.029,45.029c0,24.829,20.2,45.029,45.029,45.029s45.029-20.2,45.029-45.029
                        C417.658,423.028,397.458,402.828,372.63,402.828z M372.63,467.742c-10.966,0-19.887-8.922-19.887-19.887
                        c0-10.966,8.922-19.887,19.887-19.887c10.966,0,19.887,8.922,19.887,19.887C392.517,458.822,383.595,467.742,372.63,467.742z" />
                    <!-- <path d="M383.716,165.755H203.567c-6.943,0-12.571,5.628-12.571,12.571c0,6.943,5.629,12.571,12.571,12.571h180.149
                            c6.943,0,12.571-5.628,12.571-12.571C396.287,171.382,390.659,165.755,383.716,165.755z" />
                         <path d="M373.911,231.035H213.373c-6.943,0-12.571,5.628-12.571,12.571s5.628,12.571,12.571,12.571h160.537
                            c6.943,0,12.571-5.628,12.571-12.571C386.481,236.664,380.853,231.035,373.911,231.035z" /> -->
                    <path d="M506.341,109.744c-4.794-5.884-11.898-9.258-19.489-9.258H95.278L87.37,62.097c-1.651-8.008-7.113-14.732-14.614-17.989
                        l-55.177-23.95c-6.37-2.767-13.773,0.156-16.536,6.524c-2.766,6.37,0.157,13.774,6.524,16.537L62.745,67.17l60.826,295.261
                        c2.396,11.628,12.752,20.068,24.625,20.068h301.166c6.943,0,12.571-5.628,12.571-12.571c0-6.943-5.628-12.571-12.571-12.571
                        H148.197l-7.399-35.916H451.69c11.872,0,22.229-8.44,24.624-20.068l35.163-170.675
                        C513.008,123.266,511.136,115.627,506.341,109.744z M451.69,296.301H135.619l-35.161-170.674l386.393,0.001L451.69,296.301z" />
                </svg>
            `;

            const countValue = document.createElement('div');
            countValue.setAttribute('class', 'count');
            countValue.textContent = this.getAttribute('count');
            this.appendChild(countValue);

            let plusSign = document.createElement('span');
            plusSign.classList.add('phone-input');
            this.appendChild(plusSign);
            let phoneInput = document.createElement('input');
            phoneInput.classList.add('phone-input');
            phoneInput.placeholder = '27-12-345-6789';
            phoneInput.minLength = 10;
            phoneInput.maxLength = 11;
            plusSign.appendChild(phoneInput);

            let waLink = document.createElement('a');
            waLink.classList.add('wa-link');
            waLink.setAttribute('href', '');
            waLink.setAttribute('target', '_blank');
            waLink.textContent = `WhatsApp us!`;
            this.appendChild(waLink);

            this.order = {};
        }

        get count() { return this.getAttribute('count') }
        set count(value) { this.setAttribute('count', value) }

        get phone() { return this.getAttribute('phone') }
        set phone(value) { this.setAttribute('phone', value) }

        static get observedAttributes() { return ['count', 'phone'] }

        attributeChangedCallback(name) {
            if (name === 'count') {
                this.querySelector('.count').textContent = this.count;
            } else if (name === 'phone') {
                console.log('name:', name, 'this.phone:', this.phone);
            }
        }

        connectedCallback() {
            let phoneInput = this.querySelector('input');
            phoneInput.addEventListener('input', (e) => { this.phone = e.target.value; });

            this.order.info = {
                phone: this.getAttribute('phone'),
                currency: this.getAttribute('currency')
            };
        }
    }
);