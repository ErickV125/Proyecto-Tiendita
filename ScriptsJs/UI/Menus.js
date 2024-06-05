const MenusDataBase = {
	Cuenta: AccountSection,
	Carro: Car,
	ajustes: settings
}
const nav_menu = document.getElementById("Menu");
const Seccion_menu = document.getElementById("Seccion-menu");
let auxElement;
nav_menu.addEventListener("change", (event) => {
	if (event.target.value === "Inicio") {
		crear(product);
		let Scroll = Section.scrollTop;
		SaveHistory({ Event: 'Home', Scroll: Scroll }, '#Home');
		Seccion_menu.classList.remove("Seccion-menu-abierta");
		return;

	}
	if (auxElement && auxElement != event.target) {
		auxElement = event.target;
		MenuEvent(auxElement.value);
	} else if (!Seccion_menu.classList.contains("Seccion-menu-abierta")) {
		Seccion_menu.classList.add("Seccion-menu-abierta");
		auxElement = event.target;
		MenuEvent(auxElement.value);
	} else if (Seccion_menu.classList.contains("Seccion-menu-abierta") && auxElement == event.target) {
		Seccion_menu.classList.remove("Seccion-menu-abierta");
		auxElement = null;
	}
})

function MenuEvent(type) {
	Seccion_menu.innerHTML = "";
	if (type && type in MenusDataBase) {
		MenusDataBase[type]();
	}
}



function AccountSection() {


}

function Car() {
	let Products_in_Car = product.filter(P => P.Quantity_in_cart > 0);
	let total_products = 0;
	Products_in_Car.forEach(p => {
		total_products += p.Quantity_in_cart;
	});
	new CreateDom('div', 'CardOneSetting', '', 'Seccion-menu', '').Create().Child(new CreateDom("h1","","Carrito"));
	/*'h1', '', 'Carrito'*/
	if (Products_in_Car.length === 0) {
		new CreateDom('img', 'DefaultCar-img', '', 'Seccion-menu').Create().NewAttribute({ src: "Iconos/carrito-de-compras  .png" });
		new CreateDom('div', 'DefaultCar', '', 'Seccion-menu', 'DefaultCar').Create();
		new CreateDom('h4', '', 'Tu carrito está vacío en este momento.\n', "DefaultCar").Create().Child(new CreateDom("span","","\n !Agrega algunos productos para empezar a comprar¡")).Events("click", function() {
			crear(product);
			let Scroll = Section.scrollTop;
			SaveHistory({ Event: 'Home', Scroll: Scroll }, '#Home');
			auxElement.click();
		});
		return;
	}
	Products_in_Car.forEach((e, i) => {
		MiniatureProduct(e, i)
	})
}

function MiniatureProduct(e, i) {
	new CreateDom("div", "MiniatureProduct", "", "Seccion-menu", `Miniature-${i}`).Create();
	new CreateDom("div", "MiniatureProduct-img", "", `Miniature-${i}`, `Miniature-Img${i}`).Create();
	new CreateDom("img", "", "", `Miniature-Img${i}`, "").Create().NewAttribute("src", e.IMG[0]).Events("click", function() {
		auxElement.click();
		PreviwProduct(e)
	});
	new CreateDom("div", "MiniatureTextZone", "", `Miniature-${i}`, `Miniature-Text-Zone-${i}`).Create();
	new CreateDom("h4", "", `${e.Name}`, `Miniature-Text-Zone-${i}`, "").Create();
	new CreateDom("h4", "", `$${e.Price}`, `Miniature-Text-Zone-${i}`, "").Create();
	new CreateDom("div", "Miniature-Button-zone", "", `Miniature-${i}`, `Miniature-Button-zone-${i}`).Create();
	new CreateDom("div", "Miniature-Button-zone-button", "<", `Miniature-Button-zone-${i}`, "").Create().NewAttribute({ type: "button" }).Events("click", function(event) {
		e.AddToCart(-1);
		event.stopPropagation();
		document.getElementById(`Miniature-Button-zone>input-${i}`).value = e.Quantity_in_cart;
	});
	new CreateDom("label", "", "", `Miniature-Button-zone-${i}`, `Miniature-Button-zone>label${i}`).Create()
	new CreateDom("input", "", "", `Miniature-Button-zone>label${i}`, `Miniature-Button-zone>input-${i}`).Create().NewAttribute({ value: e.Quantity_in_cart, type: "number", max: e.Stock, min: 0 }).Events('input', function() {
		if (this.value > e.Stock) {
			this.value = e.Stock;
		}
		if (this.value <= 0) {
			this.value = 0;
		}

		e.Quantity_in_cart = parseInt(this.value)
	})
	new CreateDom("div", "Miniature-Button-zone-button", ">", `Miniature-Button-zone-${i}`, "").Create().NewAttribute({ type: "button" }).Events("click", function(event) {
		e.AddToCart(1);
		event.stopPropagation();

		document.getElementById(`Miniature-Button-zone>input-${i}`).value = e.Quantity_in_cart;
	});
}

function settings() {
	let elem = new CreateDom("div", "CardOneSetting", "", "Seccion-menu").Create().Events("click", function() {})
	new CreateDom("h2", "", "Ajustes", elem).Create();


	let SCE = new CreateDom("div", "SectionCardsOne", "", "Seccion-menu", "").Create();
	// Define la función de manejo de click
	function handleClick(event) {
		console.log("Clicked on:", event.target.textContent);
		// Aquí puedes agregar la lógica específica para cada click
	}

	// Podrías replicar esta estructura con los demás elementos. Inicia aquí
	let card1 = new CreateDom("div", "card0", "", SCE.Element, "")
		.Create()
		.Events("click", cuenta);
	new CreateDom("img", "", "", card1, "").Create().NewAttribute({ src: "Iconos/usuario.png" });
	new CreateDom("h3", "", "Mi cuenta", card1).Create();
	// Termina aquí 

	// Replicando la estructura para los demás elementos
	let card2 = new CreateDom("div", "card0", "", SCE.Element, "")
		.Create()
		.Events("click", handleClick);
	new CreateDom("img", "", "", card2, "").Create().NewAttribute({ src: "Iconos/bolsa-de-la-compra (1).png" });
	new CreateDom("h3", "", "Mis Compras", card2).Create();

	let card3 = new CreateDom("div", "card0", "", SCE.Element, "")
		.Create()
		.Events("click", handleClick);
	new CreateDom("img", "", "", card3, "").Create().NewAttribute({ src: "Iconos/reloj.png" });
	new CreateDom("h3", "", "Historial", card3).Create();

	let card4 = new CreateDom("div", "card0", "", SCE.Element, "")
		.Create()
		.Events("click", handleClick);
	new CreateDom("img", "", "", card4, "").Create().NewAttribute({ src: "Iconos/notificacion.png" });
	new CreateDom("h3", "", "Notificaciones", card4).Create();

	let card5 = new CreateDom("div", "card0", "", SCE.Element, "")
		.Create()
		.Events("click", handleClick);
	new CreateDom("img", "", "", card5, "").Create().NewAttribute({ src: "Iconos/cepillo-de-pintura.png" });
	new CreateDom("h3", "", "Temas", card5).Create();

	let card6 = new CreateDom("div", "card0", "", SCE.Element, "")
		.Create()
		.Events("click", handleClick);
	new CreateDom("img", "", "", card6, "").Create().NewAttribute({ src: "Iconos/centro-de-llamadas.png" });
	new CreateDom("h3", "", "Soporte", card6).Create();
}