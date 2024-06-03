let Section = document.getElementById("Contain-Products");
ProductStore = []
class CreateProduct { //Establece el contenido de un producto
	static Id = 0;

	constructor(Name, Price, IMG, Stock, Description, Seller, Tags, Qualify) {
		this.ID = ++CreateProduct.Id;
		this.Name = Name;
		this.Price = Price;
		this.IMG = IMG; //array
		this.Stock = Stock;
		this.Description = Description;
		this.Seller = Seller;
		this.Tags = Tags;
		this.Qualify = Qualify;
		this.Quantity_in_cart = 0;
		this.Quantity_in_cart.toFixed(2)
		this.Favorites = false;
		this.Favorites_img = "Iconos/bookmark1.png";
		this.Element = null;
		
		
		ProductStore.push(this);
		let ImgeLength = this.IMG.length;
		if (this.Qualify > 5) {
			this.Qualify = 5;
		}
		if (ImgeLength < 6) {
			for (let i = 0; i < (6 - ImgeLength); i++) {
				this.IMG.push("Default.webp");
			}
		}
	}
	Create() {
		
		let pseudoId = this;
		let IMGRandom = Math.floor(Math.random() * (this.IMG.length - 0) + 0)
		new CreateDom("div", ["Container-main-product","slide-right"], "", "Contain-Products", `Container-main-product${this.ID}`).Create().Fragment()
		new CreateDom("img", "Favorites-icon", "", `Container-main-product${this.ID}`, `Favorites-icon-${this.ID}`).Create().NewAttribute("src", this.Favorites_img).Events("click", (event) => {
			event.stopPropagation();
			this.ToggleFavorites();
			const icon = document.getElementById(`Favorites-icon-${this.ID}`).src=this.Favorites_img;

			
		});
		new CreateDom("img", "Product-img", "", `Container-main-product${this.ID}`, "").Create().NewAttribute("src", this.IMG[0]).Events("click", function() {
			PreviwProduct(pseudoId)
		});;
		new CreateDom("div","Section2P","",`Container-main-product${this.ID}`,`Section2P${this.ID}`).Create()
		new CreateDom("div", "Product-text-zone", "", `Section2P${this.ID}`, `Product-text-zone${this.ID}`).Create();
		new CreateDom("h5", "", this.Name, `Product-text-zone${this.ID}`, "").Create(); //nombre del producto
		new CreateDom("h5", "", `$${this.Price}UM`, `Product-text-zone${this.ID}`, "").Create();
		new CreateDom("p", "", `${this.Description}`, `Product-text-zone${this.ID}`, "").Create();

		new CreateDom("div", "Button-product-zone", "", `Section2P${this.ID}`, `Button-product-zone${this.ID}`).Create();

		new CreateDom("button", "AddToCar", "", `Button-product-zone${this.ID}`, `AddToCar${this.ID}`).Create().Events("click", (event) => {
			event.stopPropagation();
			this.AddToCart(1)
		});

		new CreateDom("img", "", "", `AddToCar${this.ID}`).Create().NewAttribute("src", "Iconos/carrito-de-compras.png")

		new CreateDom("h3", "", "Agregar", `AddToCar${this.ID}`).Create()

		new CreateDom("button", "DeleteToCar", "", `Button-product-zone${this.ID}`, `DeleteToCar${this.ID}`).Create().Events("click", (event) => {
			event.stopPropagation();
			this.AddToCart(-1)
		});
		if (this.Quantity_in_cart >= 1) {
			document.getElementById(`AddToCar${this.ID}`).classList.add("Active");
			document.getElementById(`DeleteToCar${this.ID}`).classList.add("Active");
		}
		new CreateDom("img", "", "", `DeleteToCar${this.ID}`).Create().NewAttribute("src", "Iconos/basura.png")
		new CreateDom("h3", "", "Eliminar", `DeleteToCar${this.ID}`).Create();
		this.Element = document.getElementById(`Container-main-product${this.ID}`);
		return this
	}
	ToggleFavorites(){
		if(!this.Favorites){
			this.Favorites=true;
			this.Favorites_img="Iconos/bookmark.png";
		}else{
			this.Favorites=false;
			this.Favorites_img="Iconos/bookmark1.png";
		}
		return this
	}
	AddToCart(n) {
		
		const btnDelete = document.getElementById(`DeleteToCar${this.ID}`);
		const btnAdd = document.getElementById(`AddToCar${this.ID}`);
		if (n < 0) {
			if (this.Quantity_in_cart >= 1) {
				this.Quantity_in_cart += n;

				notification("Error", `Producto eliminado. Cantidad:${this.Quantity_in_cart}`, 800)
			}
			if (this.Quantity_in_cart === 0 && btnAdd && btnDelete) {
				btnDelete.classList.remove("Active");
				btnAdd.classList.remove("Active");
			}
			return
		}
		if (this.Quantity_in_cart === 0) {
			notification("Valid", `Producto Añadido: ${this.Name}`)
		}

		if (this.Quantity_in_cart < this.Stock) {
			this.Quantity_in_cart += n;
		}
		if (this.Quantity_in_cart > this.Stock) {
			this.Quantity_in_cart = this.Stock;
		}
		if (this.Quantity_in_cart >= 1) {
			notification("Valid", `${this.Quantity_in_cart} ${this.Name} en carrito`);
			if (btnAdd && btnDelete) {
				btnDelete.classList.add("Active");
				btnAdd.classList.add("Active");
			}

		}

	}
}

function PreviwProduct(Product) { //vista previa de un producto
	//paginas aun no hechas------------------------------------------->Pendiente<-------------------------------
	let ProductData;

	if (typeof Product == "object" && Product.ID) {
		filter = ProductStore.filter(e => e.ID == Product.ID);
		ProductData = filter[0];
	}
	let Scroll = Section.scrollTop;

	SaveHistory({ Event: "ViewProduct", arguments: { ID: ProductData.ID }, Scroll: Scroll }, "#Product");
	Section.innerHTML = "";
	/*(TagName,Class,TextContent,ParentID,ID) */
	new CreateDom("div", ["ProducPreviw","slide-right"], "", "Contain-Products", "ProductPreviw").Create()

	new CreateDom('div', 'Title-Section-car', '', 'ProductPreviw', '').Create().Child('h3', '', `${ProductData.Name}`)
	//primer seccion
	new CreateDom("div", "Section-product", "", "ProductPreviw", `Section-product-1`).Create()

	let PrincipedImage=new CreateDom("img", "ProducPreviw-img", "", "Section-product-1", "PrincipedImage").Create().NewAttribute("src", ProductData.IMG[0]); //imagem principal
	
	new CreateDom("ul", "PP-UL", "", "Section-product-1", "PP-UL").Create(); //lista de imagenes 
	ProductData.IMG.forEach((image, i) => { //elemenos de lista 
		new CreateDom("li", "PP-LI", "", "PP-UL", `PP_list${i}`).Create();
		
		let min_img=new CreateDom("img", "Mini-Previw-image", "", `PP_list${i}`, `list_image_${i}`).Create().NewAttribute("src", image);
		if(image != "Default.webp"){
			min_img.Events("click", function() {
				PrincipedImage.Element.src = this.src;
				PrincipedImage.Element.classList.remove("slide-right");
				void PrincipedImage.Element.offsetWidth;
    
				PrincipedImage.Element.classList.add("slide-right");
				
				
			})
		}
	});
	//segunda seccion

	new CreateDom("div", "payment-selector", "", "ProductPreviw", "payment-selector").Create();
	new CreateDom("div", "qualify", "", "payment-selector", "qualify").Create();
	new CreateDom("h1", "", ProductData.Qualify, "qualify").Create();
	new CreateDom("img", "", "", "qualify").Create().NewAttribute({ src: "Iconos/estrella.png" });
	new CreateDom("div", "Favorites_zone", "", "payment-selector", "Favorites_zone").Create().Events("click", (event) => {
		event.stopPropagation();
		ProductData.ToggleFavorites();
		document.getElementById("Fav-zone-img").src=ProductData.Favorites_img;
		
	});
	new CreateDom("img", "", "", "Favorites_zone", "Fav-zone-img").Create().NewAttribute({ src: ProductData.Favorites_img });
	new CreateDom("h4", "", "Favoritos", "Favorites_zone", "").Create();
	
	new CreateDom("div","Button-Section","","payment-selector","Button-Section").Create();
	
	new CreateDom("div","","-",`Button-Section`).Create().NewAttribute({type:"button"}).Events("click",function(event){

        ProductData.AddToCart(-1);

        event.stopPropagation();
        document.getElementById(`Button-Section>input`).value=ProductData.Quantity_in_cart;
    });
    new CreateDom("label", "","",`Button-Section`,`Button-Section>Label`).Create()
    new CreateDom("input","","",`Button-Section>Label`,`Button-Section>input`).Create().NewAttribute(
        {value:ProductData.Quantity_in_cart,type:"number",max:ProductData.Stock,min:0}).Events('input',function(){
            if(this.value>ProductData.Stock){
                this.value=ProductData.Stock;
            }
            if(this.value<=0){
            	this.value=0;
            }
            
            ProductData.Quantity_in_cart=parseInt(this.value)
        })
    new CreateDom("div","","+",`Button-Section`,"").Create().NewAttribute({type:"button"}).Events("click",function(event){
        ProductData.AddToCart(1);
        event.stopPropagation();
        
        document.getElementById(`Button-Section>input`).value=ProductData.Quantity_in_cart;
    });




	new CreateDom("div", "Second-section", "", "ProductPreviw", "Second-section").Create();
	new CreateDom("h1", "title-product", `${ProductData.Name}`, "Second-section").Create();
	new CreateDom("h3", "title-product", `$${ProductData.Price} UM`, "Second-section").Create();
	new CreateDom("h4", "title-product", `${ProductData.Description}`, "Second-section").Create();

	

	document.scrollingElement.scrollTop = 0;
	Section.scrollTop = 0;
	new CreateDom("div", "WitheSpace", "", "Contain-Products").Create();
}
// Definir la media query
// Llamar a la función manualmente la primera vez
function crear(ArrProducts) {
	let Products = ArrProducts;

	if (!Products) {
		Products = product;
	}
	Section.innerHTML = "";
	const fragment = document.createDocumentFragment();
	Products.forEach((product) => {
		let elemento=product;
		elemento.Create();
		fragment.appendChild(elemento.Element);
		
	})
	Section.appendChild(fragment);
	new CreateDom("div", "WitheSpace", "", "Contain-Products").Create();
}