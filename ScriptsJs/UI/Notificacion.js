const Notification=document.getElementById("Notification");
const Notification_P=document.getElementById("Notification_P");

Notification.addEventListener("click",()=>{
    Notification.classList.remove("Activar-Notificacion");
    document.getElementById("carro-boton").click();
    clearTimeout(notificationTimeOut);
})


let colors={
    Valid:"#18FF93",
    Error:"#EF665B"
}
let notificationTimeOut;
function notification(validation, message,time){
    //sistema de notificaciones
    Notification.classList.remove("desactivar-derecha");
    Notification.classList.remove("desactivar-izquierda");
    let Time=time;
    if(!Time){
        Time=2000
    }
    if(notificationTimeOut){
        clearInterval(notificationTimeOut)
    }
    if(validation in colors){
        Notification.style.background=colors[validation];
        Notification_P.textContent=message;
    }else{
        Notification.style.background=colors.Error;
        Notification_P.textContent="Error de validación";
    }
    
    
    Notification.classList.add("Activar-Notificacion")
    
    notificationTimeOut=setTimeout(()=>{
        Notification.classList.remove("Activar-Notificacion")
    },Time);
    
    let ScreenData={start:{x:0,y:0},end:{x:0,y:0}} 
    
    let slide;
    
    Notification.addEventListener("touchstart",(event)=>{
        ScreenData.start.x = event.touches[0].screenX;
        ScreenData.start.y = event.touches[0].screenY;
    });
    Notification.addEventListener("touchend",(event)=>{
        ScreenData.end.x = event.changedTouches[0].screenX;
        ScreenData.end.y = event.changedTouches[0].screenY;
        slide=Calculate_Coordinates(ScreenData,30);
        if (slide === "derecha") {
            Notification.classList.add("desactivar-derecha");
            clearInterval(notificationTimeOut);
        }else if(slide === "izquierda"){
            Notification.classList.add("desactivar-izquierda");
            clearInterval(notificationTimeOut);
            }
    });
} 