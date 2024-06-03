EventStore={//posibles eventos a invocar por postate
    "Home":crear,
    "ViewProduct":PreviwProduct,
    'Busqueda':(a)=>{crear(Busqueda(a));input.value=a},
}

function SaveHistory(state,url,){//guardado de "pestanas"
    
    if(!url){
        console.error("es necesario una url")
        return
    }
    let urlFormat=url.startsWith("#")? url: `#${url}`;//asegura que tenga: "#" al inicio de la url
    history.pushState(state,"",urlFormat) //agregua al historial
}

// state es un --objeto--

window.addEventListener("popstate",(event)=>{//cuando se retrocede en la pagina
    Options.classList.remove("Activar-etiquetas");
    
    if(event.state && event.state.Event){
        let handler=EventStore[event.state.Event];
        if(handler && event.state.arguments){//verifica si el evento tiene argumentos 
            handler(event.state.arguments)
        }else{
            handler()
        }
    }
    if (event.state && "Scroll" in event.state) {
    Section.scrollTop = event.state.Scroll;
    }
}) 