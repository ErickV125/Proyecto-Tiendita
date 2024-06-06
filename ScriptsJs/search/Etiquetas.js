const TagButton=document.getElementById("OnTag");
const SectionTags=document.getElementById("Buscador-etiquetas");
const TagF=document.getElementById("Tags-F");
TagButton.addEventListener("click",()=>{
    Options.classList.add("Activar-etiquetas");   
    SectionTags.classList.toggle("Activar-etiquetas");
});
let tags=[];
function tag_filtering(selected){//funcion de busqueda por etiqueta
    Page=1;
    if(tags.includes(selected)){//algoritmo para evitar dupicacion de busqueda y/o eliminar etiqueta
        tags.splice(tags.findIndex(e=>e==selected),1);
    }else{
        tags.push(selected);
    }
    //--busqueda--//
    Data_Base_products=product;
    tags.forEach(t=>{
        Data_Base_products=Data_Base_products.filter(product=>product.Tags.includes(t));
    });
    crear(Data_Base_products) 
}
function TagManager(tag,index){
    new CreateDom("input","","","Tags-F",`check-tb-${index}`).Create().NewAttribute("type","checkbox").Events("click",()=>{
            tag_filtering(tag)
    });
    new CreateDom("label","",tag,"Tags-F").Create().NewAttribute("for",`check-tb-${index}`);
}
function AllTags(){//mini base de datos de etiquetas
    let Tag=[];
    product.forEach(e=>{
        e.Tags.forEach(a=>{
            if (!(Tag.indexOf(a)>=0) && a!=""){
                Tag.push(a)
            }
        })
    })
    
    Tag.forEach((t,i)=>{//se encarga de agregar las etiquetas al buscador
        TagManager(t,i);
    }) 
}
AllTags()