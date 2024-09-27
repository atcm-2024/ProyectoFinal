const form =document.querySelector("form")

const inputPrincipal = document.querySelector("#principal")
const inputTerm = document.querySelector("#term")
const inputRate = document.querySelector("#rate")
 /* ----------------- div derechos ---------------------------*/
 const showResult = document.querySelector("#div-resultado")
 const sinResultado = document.querySelector("#div-muestra")
/** ---  Valida la cantidad de prestamo --- */
inputPrincipal.addEventListener('input',()=>
    {
        inputPrincipal.value=inputPrincipal.value.replace(/[^0-9\.]/g,"")
        inputPrincipal.value=inputPrincipal.value.replace(/\B(?=(\d{3})+(?!\d))/g,",")
        inputPrincipal.value=inputPrincipal.value.replace(/\./g, (c => _ => c++ ? '' : '.')(0));
    })
/** ---  Valida cantidad de años del préstamo --- */
inputTerm.addEventListener('input',()=>
    {
        inputTerm.value=inputTerm.value.replace(/[^0-9]/,"")
    })
/* valida el interes */
inputRate.addEventListener('input',()=>
    {
        inputRate.value=inputRate.value.replace(/[^0-9\.]/g,"")
        inputRate.value=inputRate.value.replace(/\./g, (c => _ => c++ ? '' : '.')(0));
    })
/* ---------------- evento submit -----------------------*/
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const formData = new FormData(form)
    const amount=formData.get('amount')
    const years=formData.get('years')
    const interest=formData.get('interest')
    const optType=formData.get('optType')

    /** variables para cambiar color los textinput por error de ingreso  */
    const inpError2=document.querySelector('.inpError2') 
    const inpError3=document.querySelector('.inpError3')
    const inpError5=document.querySelector('.inpError5')
    /** variables para cambiar color los span por error de ingreso  */
    const inpError1=document.querySelector('.inpError1')
    const inpError4=document.querySelector('.inpError4')
    const inpError6=document.querySelector('.inpError6')
     /** variables para mostrar los mensajes de errores por mal ingreso  */
    const principalempty = document.querySelector(".principalEmpty")
    const termempty= document.querySelector(".termEmpty")
    const rateempty= document.querySelector(".rateEmpty")
    const radioerror =  document.querySelector(".radioError")
   
    /*------------------------------------------------*/
    let estado=false;
      
    if (amount.trim()==="")
        {   
            inpError2.classList.add("errorTextInput");
            inpError1.classList.add("errorSpan");
            principalempty.classList.remove("NoMostrar");
            principalempty.classList.add("showMsjError");
            estado=true;
        } 
        else{
            inpError2.classList.remove("errorTextInput")
            inpError1.classList.remove("errorSpan")
            principalempty.classList.add("NoMostrar");
            principalempty.classList.remove("showMsjError")
        }

    if (years.trim()==="")
            {
                inpError3.classList.add("errorTextInput")
                inpError4.classList.add("errorSpan")
                termempty.classList.remove("NoMostrar");
                termempty.classList.add("showMsjError") 
                estado=true;            
            } 
            else{
                inpError3.classList.remove("errorTextInput")
                termempty.classList.add("NoMostrar");
                inpError4.classList.remove("errorSpan")          
                termempty.classList.remove("showMsjError")    
            }
    
    if (interest.trim()==="")
            {
                inpError5.classList.add("errorTextInput")
                inpError6.classList.add("errorSpan")
                rateempty.classList.remove("NoMostrar");
                rateempty.classList.add("showMsjError")
                estado=true;
            } 
            else{
                inpError5.classList.remove("errorTextInput")
                inpError6.classList.remove("errorSpan")
                rateempty.classList.add("NoMostrar");
                rateempty.classList.remove("showMsjError")
            }
    
    if (optType===null )
        {   radioerror.classList.remove("NoMostrar");
            radioerror.classList.add('showMsjError');
            estado=true;
        } 
        else{
            radioerror.classList.add("NoMostrar");
            radioerror.classList.remove('showMsjError');
        }
        /* --------------- verificar div derechos *************/
        if (estado)
        {
            showResult.classList.add("MostrarResultados")
            sinResultado.classList.remove("NoResultados")
        }
        /* -- varianbles para los calculos ------*/
        const amountMonto =parseFloat(amount.replace(",", ""));    
        const amountyears =parseInt(years);
        const amountinterest =parseFloat(interest);
        /** -------- Validacióon e inicio calculo de  Mortgage -----*/
       
    if ((amount.trim()!=="" && amountMonto>0 ) && (years.trim()!=="" && amountyears>0 ) && (interest.trim()!=="" && amountinterest>0) && (optType!==null))
    {    estado=false;

        /* ---------------------------------------------------*/
        const n = 12; /* meses del año*/
        const p = amountMonto /*monto ´préstamo*/
        const t = amountyears
        const r = amountinterest

        let rate = (r / 100) / n;
        let m = ((p * rate) / (1 - (1 / Math.pow((1 + rate), (n * t))))).toFixed(2);
        let totalPay = (m * n * t).toFixed(2);
        let interest = (totalPay - p).toFixed(2);
        
        showResult.classList.remove("d-none")
        sinResultado.classList.add("d-none")

        if (optType==='Repayment')
           {document.querySelector("#span-tInterest").classList.add('NoResultados')
            document.querySelector("#show-tinterest").classList.add('NoResultados')
            document.querySelector("#span-month").classList.remove('NoResultados')
            document.querySelector("#show-result").classList.remove('NoResultados')
            /**--------------------------------------------- */
            document.querySelector("#span-month").setAttribute("style", "font-size: 14px;");
            document.querySelector("#show-result").setAttribute("style", "font-size: 34px;")
            document.querySelector("#show-result").textContent= `£ ${m}`;
            document.querySelector("#total-pay").textContent= `£ ${totalPay}`;}
          else
          {
            document.querySelector("#span-tInterest").classList.remove('NoResultados')
            document.querySelector("#show-tinterest").classList.remove('NoResultados')
            document.querySelector("#span-month").classList.add('NoResultados')
            document.querySelector("#show-result").classList.add('NoResultados')
            /**--------------------------------------------- */
            document.querySelector("#span-tInterest").setAttribute("style", "font-size: 14px;");
            document.querySelector("#show-tinterest").setAttribute("style", "font-size: 34px;")
            document.querySelector("#show-tinterest").textContent= `£ ${interest}`;
            document.querySelector("#total-pay").textContent= `£ ${totalPay}`;}}
})

function limpiarAll(){
    form.reset();
    showResult.classList.add("d-none")
    sinResultado.classList.remove("d-none")
}


