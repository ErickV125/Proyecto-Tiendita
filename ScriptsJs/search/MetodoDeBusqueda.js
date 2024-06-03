const CheckBox=document.getElementById("Checkbox-inputs");
const Icon_S=document.getElementById("Icon-s");
const DivSelectionI=document.getElementById("Div-b-i");
CheckBox.addEventListener("change",()=>{// evento que activa las funciones de busqueda 
    if(CheckBox.checked){
        DivSelectionI.classList.add("Checked");
        input.classList.add("ver");
        Icon_S.classList.add("animated");
        
        input.removeAttribute("disabled");
        
    }else{
        DivSelectionI.classList.remove("Checked");
        input.classList.remove("ver");
        Icon_S.classList.remove("animated");
        Options.classList.remove("Activar-etiquetas"); 
        if(!CheckBox.hasAttribute("disabled")){
            input.setAttribute('disabled','');
        }  
    }
    
});