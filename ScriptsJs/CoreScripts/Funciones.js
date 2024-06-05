let Page=1;
class CreateDom{
    //Forma de crear contenido html de forma sencilla y directa
    //Pd: console.logs deshabilitados
    constructor(TagName,Class,TextContent,ParentID,ID){
        this.TagName=TagName;
        this.Class=Class;
        this.TextContent=TextContent;
        this.ParentID=ParentID;
        this.ID=ID;
        this.Element=null;
    	//this.TextContent=TextContent.match(/\n/)
    }
    Create(){
        
        //creacion de elemento
        if (this.TagName) {
            this.Element = document.createElement(this.TagName.toLowerCase());
        } else {
            //console.error("TagName no proporcionado");
            return;
        } 
        if (this.ID){
            this.Element.id=this.ID;
        }else{
            //console.warn("id no proporcionada")
        }
        //asignacion de clase
		this.Element.classList.add("slide-right");
		
        if (this.Class){
            if(this.Class instanceof Array){
                this.Element.className=this.Class.join(" ").toString()
            }else{
                this.Element.className=this.Class;
            }
            
            
        }else{
            //console.log("Clase no proporcionada")
        }
        //asignacion de texto

        if (this.TextContent){
        	
            this.Element.textContent=this.TextContent;
        }
        //asignacion de padre
        this.Parent(this.ParentID);
        if (this.TagName.toLowerCase() === 'img') {
        	this.Element.setAttribute('loading',"lazy");
            this.Element.onerror = () => {
                this.Element.src = this.Element.src;
            };
        }
        return this;
    }
    Parent(father){
    	
    	if (father){

        	let Parent=document.getElementById(father);

        	if(father instanceof Node){
        		Parent=father;
        	}else if(father instanceof Object){
        		Parent=father.Element
        	}
        	Parent.appendChild(this.Element);
        	
        }else{
            console.error("ID no proporcionada")
        }
    }
    //agregacion de atributos
    NewAttribute(name,value){
        if(!(this.Element)){//valida que el elemento exista
            return console.error("undefined element, property cannot be applied");
        }
        if(name instanceof Object){
            //verifica si el primer atributo es un objeto
            let attr=name;
            for(let key in attr){//aplica los atributos: key:value 
                this.Element.setAttribute(key,attr[key]);
            } 
        }else{//si no es un objeto se sgregan las propiedades 
            this.Element.setAttribute(name,value);
        }
        return this;
    }
    //agregacion de eventos
    Events(type,script){
        if (typeof script==="function"){
            this.Element.addEventListener(type,script);
        }else{
            //console.error("El evento no es una funcion valida")
        }
        return this;
    }
    Fragment(){//en proceso 
        const fragment=document.createDocumentFragment();
        fragment.appendChild(this.Element)
        document.getElementById(this.ParentID).appendChild(fragment)
        return this;
    }
    Child(child){//en proceso 
        if(!(child instanceof Object)){
        	return
        }
        child.ParentID=this.Element;
        console.log(this.Element);
        child.Create();
        console.log(child);
        return this;
    }
}



function Calculate_Coordinates(ScreenData,range) {
    if (!(ScreenData instanceof Object)) {
        return console.error(`Argument isn't a Object, entered type: "${ typeof Element }"`);
    }
    if(!range){range=50;}
    let umbral=range;
    let DiffX=(ScreenData.start.x-ScreenData.end.x);
    let DiffY=(ScreenData.start.y-ScreenData.end.y);
    if(Math.abs(DiffX)>Math.abs(DiffY)){
        if(DiffX>umbral){
            return "izquierda";
        }else if(DiffX<-umbral){
            return "derecha";
        }
        
    }
}

function Screen_Touch_Move(Element) {
    if(!(Element instanceof Node)){
        return console.error(`Element argument isn't a node, entered type: "${ typeof Element }"`);
    } 
    
    
}

function crear(ArrProducts) {
	const fragment = document.createDocumentFragment();
	let Products = ArrProducts;
    let FromPage =(1-Page)*10; //pagina 1 menos la pagina actual multiplicado por el limite de productos por pagina
	if (!Products) {
		Products = product;
	}
	Section.innerHTML = "";

    for(let i=FromPage;i<10*Page;i++){
        let elemento=Products[i];
		elemento.Create();
		fragment.appendChild(elemento.Element);
    }
	Section.appendChild(fragment);
	new CreateDom("div", "WitheSpace", "", "Contain-Products").Create();
}