let Page = 1;
class CreateDom {
    //Forma de crear contenido html de forma sencilla y directa
    //Pd: console.logs deshabilitados
    constructor(TagName, Class, TextContent, ParentID, ID) {
        this.TagName = TagName;
        this.Class = Class;
        this.TextContent = TextContent;
        this.ParentID = ParentID;
        this.ID = ID;
        this.Element = null;
        //this.TextContent=TextContent.match(/\n/)
    }
    Create() {

        //creacion de elemento
        if (this.TagName) {
            this.Element = document.createElement(this.TagName.toLowerCase());
        } else {
            //console.error("TagName no proporcionado");
            return;
        }
        if (this.ID) {
            this.Element.id = this.ID;
        } else {
            //console.warn("id no proporcionada")
        }
        //asignacion de clase
        this.Element.classList.add("slide-right");

        if (this.Class) {
            if (this.Class instanceof Array) {
                this.Element.className = this.Class.join(" ").toString()
            } else {
                this.Element.className = this.Class;
            }


        } else {
            //console.log("Clase no proporcionada")
        }
        //asignacion de texto

        if (this.TextContent) {

            this.Element.textContent = this.TextContent;
        }
        //asignacion de padre
        this.Parent(this.ParentID);
        if (this.TagName.toLowerCase() === 'img') {
            this.Element.setAttribute('loading', "lazy");
            this.Element.onerror = () => {
                this.Element.src = this.Element.src;
            };
        }
        return this;
    }
    Parent(father) {

        if (father) {

            let Parent = document.getElementById(father);

            if (father instanceof Node) {
                Parent = father;
            } else if (father instanceof Object) {
                Parent = father.Element
            }
            Parent.appendChild(this.Element);

        } else {
            console.error("ID no proporcionada")
        }
    }
    //agregacion de atributos
    NewAttribute(name, value) {
        if (!(this.Element)) {//valida que el elemento exista
            return console.error("undefined element, property cannot be applied");
        }
        if (name instanceof Object) {
            //verifica si el primer atributo es un objeto
            let attr = name;
            for (let key in attr) {//aplica los atributos: key:value 
                this.Element.setAttribute(key, attr[key]);
            }
        } else {//si no es un objeto se sgregan las propiedades 
            this.Element.setAttribute(name, value);
        }
        return this;
    }
    //agregacion de eventos
    Events(type, script) {
        if (typeof script === "function") {
            this.Element.addEventListener(type, script);
        } else {
            //console.error("El evento no es una funcion valida")
        }
        return this;
    }
    Fragment() {//en proceso 
        const fragment = document.createDocumentFragment();
        fragment.appendChild(this.Element)
        document.getElementById(this.ParentID).appendChild(fragment)
        return this;
    }
    Child(child) {//en proceso 
        if (!(child instanceof Object)) {
            return
        }
        child.ParentID = this.Element;
        console.log(this.Element);
        child.Create();
        console.log(child);
        return this;
    }
}



function Calculate_Coordinates(ScreenData, range) {
    if (!(ScreenData instanceof Object)) {
        return console.error(`Argument isn't a Object, entered type: "${typeof Element}"`);
    }
    if (!range) { range = 50; }
    let umbral = range;
    let DiffX = (ScreenData.start.x - ScreenData.end.x);
    let DiffY = (ScreenData.start.y - ScreenData.end.y);
    if (Math.abs(DiffX) > Math.abs(DiffY)) {
        if (DiffX > umbral) {
            return "izquierda";
        } else if (DiffX < -umbral) {
            return "derecha";
        }

    }
}

function Screen_Touch_Move(Element) {
    if (!(Element instanceof Node)) {
        return console.error(`Element argument isn't a node, entered type: "${typeof Element}"`);
    }


}

function crear(ArrProducts) {
    const fragment = document.createDocumentFragment();
    let Products = ArrProducts;
    let FromPage = (Page - 1) * 10; //pagina 1 menos la pagina actual multiplicado por el limite de productos por pagina
    if (!Products) {
        Products = product;
    }
    Section.innerHTML = "";

    for (let i = FromPage; i < 10 * Page; i++) {
        let elemento = Products[i];
        if (elemento) {
            elemento.Create();
            fragment.appendChild(elemento.Element);
        }

    }
    Section.appendChild(fragment);
    CreatePagination(ArrProducts)
}

function CreatePagination(ArrProducts) {
    const div = new CreateDom('div', 'pagination', '', "Contain-Products").Create();
    const ul = new CreateDom('ul', '', '', div.Element).Create();
    const limitPage = Math.ceil(ArrProducts.length / 10); // Ajustado para redondear hacia arriba

    notification("Valid", limitPage);

    let LimitCardsLI = Math.min(Math.max(1, 6), 6); // Cartas a mostrar, siempre entre 1 y 6
    let initialLoop = Page > 6 ? Page - 5 : 1; // Primer carta

    if (Page > 1) {
        new CreateDom('li', '', '<', ul.Element).Create().Events('click', () => {
            Page -= 1;
            crear(ArrProducts);
            ScrollUp();
        });
    }

    for (let i = 0; i < LimitCardsLI; i++) {
        let pageIndex = i + initialLoop;

        if (pageIndex > limitPage) {
            break;
        }

        let li = new CreateDom('li', '', pageIndex, ul.Element).Create().Events('click', () => {
            Page = pageIndex;
            crear(ArrProducts);
        });

        if (pageIndex == Page) {
            li.Element.classList.add('InPage');
        }
    }

    if (limitPage > Page) {
        new CreateDom('li', '', '>', ul.Element).Create().Events('click', () => {
            Page += 1;
            crear(ArrProducts);
            ScrollUp();
        });
    }
}

function ScrollUp() {
    document.scrollingElement.scrollTop = 0;
    Section.scrollTop = 0;
}





