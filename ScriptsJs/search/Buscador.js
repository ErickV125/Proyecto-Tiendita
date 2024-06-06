const FormInputS=document.getElementById('Form-input-s');
const input = document.getElementById("buscador");
const Options=document.getElementById("Buscador-sugerencias");
function Sugerencias(filtred){
    filtred.forEach((product)=>{
        new CreateDom("li","","","Buscador-lista",`li-${product.ID}`).Create().Events("click",()=>{         
            Options.classList.remove("Activar-etiquetas"); 
            input.value=product.Name;
            ConfirmarBusqueda();
        });
        new CreateDom("div","Icon-S","",`li-${product.ID}`).Create()
        new CreateDom("h4","",product.Name,`li-${product.ID}`).Create();
    });
}
function Busqueda(keyword){
    Options.classList.add("Activar-etiquetas");   
    document.getElementById("Buscador-lista").innerHTML="";
    let filtred=product.filter((product)=>product.Name.toLowerCase().includes(keyword.toLowerCase()));
    Sugerencias(filtred);
    return filtred;
}
function ConfirmarBusqueda(){
    Page=1;
    let Scroll=Section.scrollTop;
    SaveHistory({Event:"Busqueda",arguments:input.value,Scroll:Scroll},"#Search");
    crear(Busqueda(input.value));
    document.scrollingElement.scrollTop=0;
    Section.scrollTop=0;
}
input.addEventListener("input", () => {//evento que manda a llamar a funcion de busqueda
    let keyword=input.value;
    Busqueda(keyword);
});
FormInputS.addEventListener('submit',(event)=>{
    event.preventDefault()
    ConfirmarBusqueda();
});