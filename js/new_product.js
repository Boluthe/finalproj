let product_form=document.querySelector("#product_form");
let message=document.querySelector(".message");
let product_data=document.querySelectorAll("#data");



product_form.addEventListener("submit", (e)=>{
    e.preventDefault();

   const form_data=new FormData(product_form);


   fetch("new_product.php", {
    method: 'POST',
    body: form_data
})

.then(response=>response.json())
.then(data=>{
    if(data.status==="success"){
        message.style.display="flex"
       message.textContent="item inserted";

       cat_h4.textContent="category";
       img_label.textContent="product image"

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

        product_data[5].value="";
    }



    else if(data.status==="past_date"){
        message.style.display="flex";
        message.textContent="date cannot be past"
        setTimeout(()=>{
            message.style.display="none";
        }, 7000);

        product_data[5].value="";
    }


    else if(data.status==="quantity_invalid"){
        message.style.display="flex";
        message.textContent="invalid quantity"
        setTimeout(()=>{
            message.style.disabled="none";
        }, 7000);

        product_data[2].value="";
    }
})
})





fileInput.addEventListener("change", ()=>{
    const file = fileInput.files[0]; // Get the first file

    img_label.textContent = `${file.name}`;
    document.querySelector(".img_input").value=`${file.name}`

    const event = new Event("input", { bubbles: true });
    document.querySelector(".img_input").dispatchEvent(event);
        // sale_submit.disabled=false;
 
})


