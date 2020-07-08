customElements.define('counter-app',
    class extends HTMLElement {
        constructor() {
            super();

            const countValue = document.createElement('div');
            countValue.setAttribute('class', 'count'); 
            this.appendChild(countValue);

            const btn = document.createElement('button');
            btn.addEventListener('click', () => this.count++);
            btn.textContent = `Increment`;
            this.appendChild(btn);
        }
        
        get count() { return this.getAttribute('count') }

        set count(value) { this.setAttribute('count', value) }

        static get observedAttributes() { return ['count'] }

        attributeChangedCallback(name) {
            document.querySelector('.' + name).textContent = this.count;
        }
});