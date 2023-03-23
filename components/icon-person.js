class iconPerson extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
      
    <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-fill">
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  </svg>
    
      ${this.getStyles()}
    `;
		return template;
	}

	getStyles() {
		return `
    `;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-person', iconPerson);

class iconLock extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
      
    <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387A7.731 7.731 0 0 0 7.1 19h5.8a7.68 7.68 0 0 0 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8zM12 8H8V5.199C8 3.754 8.797 3 10 3s2 .754 2 2.199V8z"/></svg>
    
      ${this.getStyles()}
    `;
		return template;
	}

	getStyles() {
		return `
    <style>
    * {
    padding: 0%;
    margin: 0%;
    box-sizing: border-box;
  }
    </style>
    `;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-lock', iconLock);

class iconHome extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
      
        <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M18.672 11H17v6c0 .445-.194 1-1 1h-4v-6H8v6H4c-.806 0-1-.555-1-1v-6H1.328c-.598 0-.47-.324-.06-.748L9.292 2.22c.195-.202.451-.302.708-.312.257.01.513.109.708.312l8.023 8.031c.411.425.539.749-.059.749z"/></svg>
    
      ${this.getStyles()}
    `;
		return template;
	}

	getStyles() {
		return `
    <style>
    * {
    padding: 0%;
    margin: 0%;
    box-sizing: border-box;
  }
    </style>
    `;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-home', iconHome);

class iconEye extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
      
    <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    
      ${this.getStyles()}
    `;
		return template;
	}

	getStyles() {
		return `
    <style>
    * {
    padding: 0%;
    margin: 0%;
    box-sizing: border-box;
  }
    </style>
    `;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-eye', iconEye);

class iconUpdate extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
      
    <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path fill="none" stroke="currentColor" stroke-width="2" d="M1.7507,16.0022 C3.3517,20.0982 7.3367,23.0002 11.9997,23.0002 C18.0747,23.0002 22.9997,18.0752 22.9997,12.0002 M22.2497,7.9982 C20.6487,3.9012 16.6627,1.0002 11.9997,1.0002 C5.9247,1.0002 0.9997,5.9252 0.9997,12.0002 M8.9997,16.0002 L0.9997,16.0002 L0.9997,24.0002 M22.9997,0.0002 L22.9997,8.0002 L14.9997,8.0002"/>
  </svg>
  
    
      ${this.getStyles()}
    `;
		return template;
	}

	getStyles() {
		return `
    <style>
    * {
    padding: 0%;
    margin: 0%;
    box-sizing: border-box;
  }
    </style>
    `;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-update', iconUpdate);

class iconDelete extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
      
    <svg width="20px" height="20px" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;}</style></defs><title>trash-can</title><rect x="12" y="12" width="2" height="12"/><rect x="18" y="12" width="2" height="12"/><path d="M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z"/><rect x="12" y="2" width="8" height="2"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>

    
      ${this.getStyles()}
    `;
		return template;
	}

	getStyles() {
		return `
    <style>
    * {
    padding: 0%;
    margin: 0%;
    box-sizing: border-box;
  }
    </style>
    `;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-delete', iconDelete);

class iconCheck extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
    
    <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724a1.392 1.392 0 0 1 .27-1.951 1.392 1.392 0 0 1 1.953.27l2.351 3.104 5.911-9.492a1.396 1.396 0 0 1 1.921-.445c.653.406.854 1.266.446 1.92L9.478 16.34a1.39 1.39 0 0 1-1.12.656c-.022.002-.042.002-.064.002z"/></svg>
    
      ${this.getStyles()}
    `;
		return template;
	}

	getStyles() {
		return `
    <style>
    * {
    padding: 0%;
    margin: 0%;
    box-sizing: border-box;
  }
    </style>
    `;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-check', iconCheck);

class iconClean extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
      
    <svg width="20px" height="20px" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .cls-1 {
        fill: none;
      }
    </style>
  </defs>
  <title>clean</title>
  <rect x="20" y="18" width="6" height="2" transform="translate(46 38) rotate(-180)"/>
  <rect x="24" y="26" width="6" height="2" transform="translate(54 54) rotate(-180)"/>
  <rect x="22" y="22" width="6" height="2" transform="translate(50 46) rotate(-180)"/>
  <path d="M17.0029,20a4.8952,4.8952,0,0,0-2.4044-4.1729L22,3,20.2691,2,12.6933,15.126A5.6988,5.6988,0,0,0,7.45,16.6289C3.7064,20.24,3.9963,28.6821,4.01,29.04a1,1,0,0,0,1,.96H20.0012a1,1,0,0,0,.6-1.8C17.0615,25.5439,17.0029,20.0537,17.0029,20ZM11.93,16.9971A3.11,3.11,0,0,1,15.0041,20c0,.0381.0019.208.0168.4688L9.1215,17.8452A3.8,3.8,0,0,1,11.93,16.9971ZM15.4494,28A5.2,5.2,0,0,1,14,25H12a6.4993,6.4993,0,0,0,.9684,3H10.7451A16.6166,16.6166,0,0,1,10,24H8a17.3424,17.3424,0,0,0,.6652,4H6c.031-1.8364.29-5.8921,1.8027-8.5527l7.533,3.35A13.0253,13.0253,0,0,0,17.5968,28Z"/>
  <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/>
</svg>

    
      ${this.getStyles()}
    `;
		return template;
	}

	getStyles() {
		return `
    <style>
    * {
    padding: 0%;
    margin: 0%;
    box-sizing: border-box;
  }
    </style>
    `;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-clean', iconClean);

class iconSave extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
    <svg width="20px" height="20px" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"/></svg>
    `;
		return template;
	}

	getStyles() {
		return `
    <style>
      * {
        padding: 0%;
        margin: 0%;
        box-sizing: border-box;
      }
    </style>
  `;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-save', iconSave);

class iconSearch extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
    <svg width="20px" height="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
    `;
		return template;
	}

	getStyles() {
		return `
      <style>
        * {
          padding: 0%;
          margin: 0%;
          box-sizing: border-box;
        }
      </style>
    `;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-search', iconSearch);

class buyIcon extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
		<?xml version="1.0" encoding="utf-8"?>
<!-- Uploaded to SVGRepo https://www.svgrepo.com -->
<!-- License: CC0. Made by SVG Repo: https://www.svgrepo.com/svg/308863/shopping-bag-buy-purchase-shopping -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="19px" height="19px" viewBox="0 0 196 260" enable-background="new 0 0 196 260" xml:space="preserve" fill="currentColor">
<path d="M174.8,66H142V45.778C142,21.639,122.361,2,98.223,2h-0.445C73.639,2,54,21.639,54,45.778V66H21.2L2,258h192L174.8,66z
	 M66,45.778C66,28.255,80.255,14,97.778,14h0.445C115.745,14,130,28.255,130,45.778V66H66V45.778z M60,107.18c-7.18,0-13-5.82-13-13
	c0-5.014,2.843-9.357,7-11.526V93c0,3.313,2.687,6,6,6s6-2.687,6-6V82.654c4.157,2.169,7,6.512,7,11.526
	C73,101.36,67.18,107.18,60,107.18z M136,106.68c-6.9,0-12.5-5.59-12.5-12.5c0-4.726,2.628-8.84,6.5-10.964V93c0,3.313,2.687,6,6,6
	s6-2.687,6-6v-9.784c3.872,2.125,6.5,6.239,6.5,10.964C148.5,101.09,142.9,106.68,136,106.68z"/>
</svg>
		`;
		return template;
	}

	getStyles() {
		return `
			<style>
				* {
					padding: 0%;
					margin: 0%;
					box-sizing: border-box;
				}
			</style>
		`;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('buy-icon', buyIcon);

class glassIcon extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
		<svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M2 14C2 16.2091 3.79086 18 6 18C8.20914 18 10 16.2091 10 14C10 11.7909 8.20914 10 6 10C3.79086 10 2 11.7909 2 14ZM2 14V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M22 14C22 16.2091 20.2091 18 18 18C15.7909 18 14 16.2091 14 14C14 11.7909 15.7909 10 18 10C20.2091 10 22 11.7909 22 14ZM22 14V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M14 14H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		`;
		return template;
	}

	getStyles() {
		return `
			<style>
				* {
					padding: 0%;
					margin: 0%;
					box-sizing: border-box;
				}
			</style>
		`;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}
customElements.define('glass-icon', glassIcon);

class iconTest extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		fill="currentColor" width="20px" height="20px" viewBox="0 0 248 256" enable-background="new 0 0 248 256" xml:space="preserve">
 <path d="M118,31v194l128,29V2L118,31z M130,40.59l104-23.57v221.96l-104-23.57V40.59z M2,30v224h39v-30h12
	 c18.085,0,31.965-15.162,31.965-33.346v-19.666h14.033c3.755,0,6.72-2.965,6.72-6.621c0-0.889-0.099-1.779-0.494-2.569
	 l-19.468-47.435c0,0-1.779-18.085-3.36-25.002C75.181,58.132,40.751,30,3,30C2.704,30,2.988,30,2,30z M54.824,116.635
	 c0-4.941,3.953-8.894,8.894-8.894s8.894,3.953,8.894,8.894c0,4.941-3.953,8.894-8.894,8.894S54.824,121.576,54.824,116.635z
		M187.753,93.085c0,8.688,7.989,15.48,18.183,15.126c8.703-0.303,16.317-5.684,18.794-12.826l-7.128,0.417
	 c-2.101,3.898-6.586,6.722-11.666,6.955c-6.845,0.314-12.273-4.208-12.273-10.074c0-5.866,5.428-11.125,12.273-11.742
	 c5.08-0.457,9.564,1.757,11.666,5.37l7.128-0.551c-2.477-6.806-10.091-11.152-18.794-10.272
	 C195.743,76.519,187.753,84.397,187.753,93.085z M154.2,80.719c-6.748,0.682-12.303,5.553-14.045,11.582l5.099-0.394
	 c1.554-3.38,4.954-5.947,8.947-6.306c5.633-0.507,10.32,3.552,10.32,9.063s-4.688,10.207-10.32,10.465
	 c-3.992,0.183-7.392-1.922-8.947-5.09l-5.099,0.299c1.742,5.792,7.297,9.908,14.045,9.674c8.5-0.296,15.663-7.349,15.663-15.71
	 S162.701,79.86,154.2,80.719z M224.73,138.695c0-5.306-5.121-9.662-11.275-9.706c-4.946-0.036-9.059,2.732-10.356,6.532l3.787,0.078
	 c1.148-2.084,3.649-3.512,6.569-3.472c4.087,0.055,7.46,2.957,7.46,6.469s-3.373,6.239-7.46,6.081
	 c-2.92-0.113-5.421-1.671-6.569-3.814l-3.787-0.119c1.297,3.867,5.41,6.849,10.356,7.07
	 C219.609,148.091,224.73,144.002,224.73,138.695z M216.89,168.334c-4.221-0.313-7.604,2.329-7.604,5.883
	 c0,2.92,2.277,5.617,5.426,6.722v-2.316c-1.726-0.857-2.917-2.463-2.917-4.188c0-2.382,2.272-4.141,5.095-3.92
	 c2.854,0.224,5.2,2.385,5.2,4.816c0,1.761-1.234,3.171-3.003,3.707v2.336c3.245-0.486,5.643-2.802,5.643-5.813
	 C224.73,171.898,221.183,168.652,216.89,168.334z M184.006,171.89c0,3.373,3.046,6.423,6.844,6.802
	 c3.166,0.316,5.881-1.315,6.753-3.837l-2.524-0.228c-0.753,1.347-2.372,2.174-4.228,1.997c-2.539-0.242-4.584-2.276-4.584-4.536
	 c0-2.26,2.045-3.939,4.584-3.74c1.856,0.145,3.476,1.253,4.228,2.731l2.524,0.21c-0.872-2.674-3.586-4.776-6.753-5.01
	 C187.052,165.997,184.006,168.517,184.006,171.89z M167.109,176.201c3.484,0.347,6.359-2.051,6.359-5.349
	 c0-2.71-1.943-5.152-4.575-6.076v2.104c1.435,0.747,2.436,2.2,2.436,3.786c0,2.189-1.902,3.788-4.22,3.568
	 c-2.294-0.218-4.143-2.142-4.143-4.291c0-1.557,0.969-2.828,2.373-3.342v-2.088c-2.561,0.525-4.416,2.617-4.416,5.253
	 C160.923,172.975,163.678,175.86,167.109,176.201z M151.075,169.743c0-3.073-2.55-5.768-5.643-6.002
	 c-2.509-0.19-4.611,1.299-5.277,3.496l1.94,0.165c0.586-1.188,1.858-1.944,3.337-1.826c2.058,0.165,3.746,1.959,3.746,4
	 s-1.688,3.537-3.746,3.337c-1.479-0.143-2.751-1.125-3.337-2.417l-1.94-0.179c0.666,2.315,2.768,4.176,5.277,4.429
	 C148.525,175.06,151.075,172.817,151.075,169.743z M148.344,144.898c3.814,0.171,7.097-2.201,8.154-5.613l-3.056-0.096
	 c-0.909,1.843-2.863,3.066-5.097,2.979c-3.047-0.117-5.494-2.629-5.494-5.602s2.447-5.358,5.494-5.317
	 c2.234,0.03,4.188,1.355,5.097,3.245l3.056,0.063c-1.057-3.467-4.34-6.01-8.154-6.038c-4.553-0.033-8.189,3.546-8.189,7.976
	 S143.791,144.694,148.344,144.898z M169.655,137.439c0,3.891,2.796,7.304,6.677,8.534v-3.097c-2.13-1.006-3.595-3.053-3.595-5.356
	 c0-3.179,2.8-5.726,6.289-5.678c3.543,0.049,6.463,2.747,6.463,6.014c0,2.367-1.538,4.362-3.738,5.224v3.133
	 c4.04-0.908,7.038-4.216,7.038-8.27c0-4.934-4.43-8.983-9.763-9.023C173.813,128.881,169.655,132.703,169.655,137.439z"/>
 </svg>
		`;
		return template;
	}

	getStyles() {
		return `
			<style>
				* {
					padding: 0%;
					margin: 0%;
					box-sizing: border-box;
				}
			</style>
		`;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-test', iconTest);

class iconMaterial extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
		<svg width="19px" height="19px" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-h</title><path d="M440.9,136.3a4,4,0,0,0,0-6.91L288.16,40.65a64.14,64.14,0,0,0-64.33,0L71.12,129.39a4,4,0,0,0,0,6.91L254,243.88a4,4,0,0,0,4.06,0Z"/><path d="M54,163.51A4,4,0,0,0,48,167V340.89a48,48,0,0,0,23.84,41.39L234,479.51a4,4,0,0,0,6-3.46V274.3a4,4,0,0,0-2-3.46Z"/><path d="M272,275v201a4,4,0,0,0,6,3.46l162.15-97.23A48,48,0,0,0,464,340.89V167a4,4,0,0,0-6-3.45l-184,108A4,4,0,0,0,272,275Z"/></svg>
		`;
		return template;
	}

	getStyles() {
		return `
			<style>
				* {
					padding: 0%;
					margin: 0%;
					box-sizing: border-box;
				}
			</style>
		`;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-material', iconMaterial);

class iconBox extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
		<svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.109.902L.4 4.457l3.911 3.279L10 4.043 6.109.902zm7.343 15.09a.44.44 0 0 1-.285-.102L10 13.262l-3.167 2.629a.447.447 0 0 1-.529.03l-2.346-1.533v.904L10 19.098l6.042-3.807v-.904l-2.346 1.533a.44.44 0 0 1-.244.072zM19.6 4.457L13.89.902 10 4.043l5.688 3.693L19.6 4.457zM10 11.291l3.528 2.928 5.641-3.688-3.481-2.795L10 11.291zm-3.528 2.928L10 11.291 4.311 7.736l-3.48 2.795 5.641 3.688z"/></svg>
		`;
		return template;
	}

	getStyles() {
		return `
			<style>
				* {
					padding: 0%;
					margin: 0%;
					box-sizing: border-box;
				}
			</style>
		`;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-box', iconBox);

class iconExit extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="19px" height="19px" viewBox="0 0 92 92" enable-background="new 0 0 92 92" xml:space="preserve" fill="currentColor">
<path id="XMLID_1456_" d="M60,60.7V79c0,2.2-1.6,4-3.8,4H4c-2.2,0-4-1.8-4-4V13c0-2.2,1.8-4,4-4h52.2c2.2,0,3.8,1.8,3.8,4v18.3
	c0,2.2-1.8,4-4,4s-4-1.8-4-4V17H8v58h44V60.7c0-2.2,1.8-4,4-4S60,58.5,60,60.7z M90.8,43L75.2,27.2c-1.6-1.6-4.1-1.6-5.7,0
	c-1.6,1.6-1.6,4.1,0,5.7l8.9,9L29.9,42c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c0,0,0,0,0,0l48.5-0.1l-8.9,9c-1.6,1.6-1.5,4.1,0,5.7
	c0.8,0.8,1.8,1.2,2.8,1.2c1,0,2.1-0.4,2.8-1.2l15.7-15.8C92.4,47.1,92.4,44.6,90.8,43z"/>
</svg>
		`;
		return template;
	}

	getStyles() {
		return `
			<style>
				* {
					padding: 0%;
					margin: 0%;
					box-sizing: border-box;
				}
			</style>
		`;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('icon-exit', iconExit);

class qualite extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
      
      <span class="qua1">QUA</span><span class="lite1">lite</span>
    
      ${this.getStyles()}
    `;
		return template;
	}

	getStyles() {
		return `
      <style>
      .qua1 {
        font-size: 24px;
        font-weight: bold;
        color: #385499;
      }
      .lite1 {
        font-size: 20px;
        font-weight: lighter;
      }
          </style>
    `;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('qualite-text', qualite);

class cosoIcon extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate() {
		const template = document.createElement('template');
		template.innerHTML = `
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" id="blobSvg">                        <defs>                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">                            <stop offset="0%" style="stop-color: rgb(0, 128, 255);"></stop>                            <stop offset="100%" style="stop-color: rgb(239, 98, 159);"></stop>                        </linearGradient>                        </defs>                        <path id="blob" fill="url(#gradient)">                            <animate attributeName="d" dur="10000ms" repeatCount="indefinite" values="M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;M453.78747,319.98894Q416.97789,389.97789,353.96683,436.87838Q290.95577,483.77887,223.95577,447.43366Q156.95577,411.08845,105.64373,365.97789Q54.33169,320.86732,62.67444,252.61056Q71.01719,184.3538,113.01965,135.21007Q155.02211,86.06634,220.52211,66.46683Q286.02211,46.86732,335.5,91.94472Q384.97789,137.02211,437.78747,193.51106Q490.59704,250,453.78747,319.98894Z;M411.39826,313.90633Q402.59677,377.81265,342.92059,407.63957Q283.24442,437.46649,215.13648,432.5428Q147.02853,427.61911,82.23325,380.9572Q17.43796,334.29529,20.45223,250.83809Q23.46649,167.38089,82.5856,115.05707Q141.70471,62.73325,212.19045,63.73015Q282.67618,64.72705,352.67308,84.79839Q422.66998,104.86972,421.43486,177.43486Q420.19974,250,411.39826,313.90633Z;M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;"></animate> </path></svg>
		
			${this.getStyles()}
		`;
		return template;
	}

	getStyles() {
		return `
			<style>
					</style>
		`;
	}

	render() {
		this.shadowRoot.appendChild(
			this.getTemplate().content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.render();
	}
}

customElements.define('coso-icon', cosoIcon);
