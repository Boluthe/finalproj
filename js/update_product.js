let product_form=document.querySelector("#product_form");
let message=document.querySelector(".message");
let product_data=document.querySelectorAll("#data");



product_form.addEventListener("submit", (e)=>{
    e.preventDefault();

   const form_data=new FormData(product_form);


   fetch("update_product.php", {
    method: 'POST',
    body: form_data
})

.then(response=>response.json())
.then(data=>{
    if(data.status==="success"){
        message.style.display="flex"
       message.textContent="Updated Successfully";

    

       setTimeout(() => {
        message.style.display='none';
        }, 7000);
        
        sale_submit.disabled = true;

        product_data.forEach((datum, i)=> {

            datum.value="";        
           
        });
    }

    else if(data.status==="invalid_date"){
        message.style.display="flex";
        message.textContent="invalid date"
        setTimeout(()=>{
            message.style.display="none";
        }, 7000);

        product_data[3].value="";
    }


    else if(data.status==="past_date"){
        message.style.display="flex";
        message.textContent="date cannot be past"
        setTimeout(()=>{
            message.style.display="none";
        }, 7000);

        product_data[3].value="";
    }

    else if(data.status==="quantity_invalid"){
        message.style.display="flex";
        message.textContent="invalid quantity"
        setTimeout(()=>{
            message.style.disabled="none";
        }, 7000);

        product_data[1].value="";
    }
})
})

function decodeHtml(html) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
}


const urlParams = new URLSearchParams(window.location.search);


const branchId = urlParams.get('q');


fetch(`get_inventory.php?q=${branchId}`, {
    method:"GET"
}).then(res=>res.json()).then(data=>{
    data.forEach((datum, i)=>{
        document.querySelector(".name").value=decodeHtml(datum.name) 
        document.querySelector(".date").value=datum.date
        document.querySelector(".quantity").value=datum.quantity
        document.querySelector(".id").value=datum.id
        document.querySelector("#target").textContent=decodeHtml(datum.name) 

    })
})





