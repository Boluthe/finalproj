let delay
let product_data=document.querySelectorAll("#data");
let message=document.querySelector(".message");
let sale_form=document.querySelector("#sale_form")


fetch("get_inventory.php", {
    method:"GET",
})

.then(res=>res.json())
.then(data=>{
  

    data.forEach((datum)=>{
        console.log(datum)



        document.querySelector(".items ul").innerHTML+=`
         <li>${datum.name}</li>
        `

        
    })

  


    let itemss=document.querySelectorAll(".items ul li");


    data.forEach((datum)=>{
       

        itemss.forEach((item, i)=>{
            item.addEventListener("click", ()=>{
                document.querySelector("#supplier_input").value=data[i].supplier;
                document.querySelector("#supplier_id").value=data[i].id;
            })
        })

          

        
    })
    



    itemss.forEach((item, i)=>{
        item_sel.addEventListener("mouseleave", ()=>{

            if (delay) clearTimeout(delay);
          delay= setTimeout(()=>{
                document.querySelector(".items").style.display="none";
        
            
        
          
                item.style.display="none";
            }, 200)
         
            
        
        })
    })

    itemss.forEach((item, i)=>{
        item_sel.addEventListener("mouseenter", ()=>{

            if (delay) clearTimeout(delay);
          
            document.querySelector(".items").style.display="block";
        
            
        
            setTimeout(() => {
                item.style.display="block";
            }, i*100);
        
        })
    })
    
    
    



    document.querySelector(".items").addEventListener("mouseenter", ()=>{
        document.querySelector(".items").style.display="block";
    })
    
    
    itemss.forEach((item, i) => {
        item.addEventListener("click", ()=>{
            let item_data=item.textContent;
            // item_h4.classList.add("animate-text");
            product.value=item_data;
            const event = new Event("input", { bubbles: true });
    
            product.dispatchEvent(event);
            item_h4.textContent=item_data;
    
            item_h4.classList.remove("animate-text");
    
            void item_h4.offsetWidth;
            item_h4.classList.add("animate-text");
    
            document.querySelector(".items").style.display="none";
        })
    
    
       
    });

 
})




sale_form.addEventListener("submit", (e)=>{
    e.preventDefault();


    const form_data= new FormData(sale_form)

    fetch("sell.php", {
        method: "POST",
        body:form_data
    })

    .then(res=>res.json())
    .then(data=>{
        if(data.status==="success"){
            sale_submit.disabled=true;
            item_h4.textContent="Select Product"
 
             product_data.forEach(datum=>{
                datum.value="";
             })
 
 
             message.style.display="flex"
             message.textContent="Record Updated";
 
 
             setTimeout(() => {
                 message.style.display='none';
                 }, 7000);
        }
    })
})



setInterval(() => {
    fetch("get_sales_records.php", {
        method:"GET"
    })
    
    .then(res=>res.json())
    .then(data=>{

        document.querySelector("#tbody").innerHTML=""
        if(data.status==="no_record"){
           
        }
    
    
        else{
            data.forEach((datum, i)=>{
                document.querySelector("#tbody").innerHTML+=`
    
                  <tr>
                                <td>${datum.name}</td>
                                <td>${datum.quantity}</td>
                                <td>${datum.date}</td>
                                <td>${datum.customer}</td>
                                <td > <div class="in-stock">${datum.current_stock}</div></td>
                              </tr>
                `
            })
        }
    
       
    })
    
}, 100);




