let item_cont=document.querySelector(".item_cont");
let large_select=document.querySelector(".large_select");
let filter=document.querySelector(".fil");
let cat_input=document.querySelector("#cat_input")
let sup_input=document.querySelector("#sup_input")
let delay;
let datas = document.querySelectorAll(".input_data");
let filterButton = document.querySelector(".filter_button");
let form=document.querySelector("#filter_form")
let sort=document.querySelector(".sort")
let sorter=document.querySelector(".sorter");
let sort_li=document.querySelectorAll(".sort_list ul li")
let order_li=document.querySelectorAll(".order ul li")
let sort_input=document.querySelector("#sort_input")
let order_input=document.querySelector("#order_input")
let sortForm=document.querySelector("#sort_form")
let message=document.querySelector(".message");



datas.forEach((datum, i) => {
    datum.addEventListener("input", () => {
   
        // let allFilled = Array.from(datas).every((field) => field.value.trim() !== "");

      
        // filterButton.disabled = !allFilled;

        // if(datas[0].value.trim()!=="" || datas[1].value.trim()!==""){
        //     filterButton.disabled=false;
        // }

        // else {
        //     filterButton.disabled=true;
        // }
    });
});











const display_none=(filtrate, filtrate2, action, select)=>{

  
          

        action.addEventListener("mouseleave", ()=>{


         
            if(delay) clearTimeout(delay);


            delay=setTimeout(() => {
                select.style.display="none" 
                filtrate.forEach((li, i)=>{
                    li.style.display="none";
            })
               
            filtrate2.forEach((li, i)=>{
                li.style.display="none";
        })
              
            }, 200);
         
  
})
}




const animate=(filtrate, filtrate2, action, select , drop)=>{
  
         
        action.addEventListener("mouseenter", ()=>{

           
            if(delay) clearTimeout(delay);
            select.style.display="block"  
            drop.style.display="none"

            filtrate.forEach((li, i)=>{
                li.style.display="block";
            })

            filtrate2.forEach((li, i)=>{
                li.style.display="block";
            })
              
               
         
        })
      
}















const get_input=(input_li, input)=>{
    input_li.forEach((li)=>{
        li.addEventListener("click", ()=>{
    
    
            if(li.classList.contains("selected")){
    
                input.value="";
                li.classList.remove("selected")
            }
    
            else{
                input.value=li.textContent;
                li.classList.add("selected")
    
                
        
                input_li.forEach((li_not)=>{
                    if(li_not!==li){
                        li_not.classList.remove("selected");
                    }
                })
            }
       
           
            const event = new Event("input", { bubbles: true });
            input.dispatchEvent(event);
    
        })
    })
    
}


let all_categories=[]
let unique_categories=[]
let all_suppliers=[]
let unique_suppliers=[]



fetch("get_inventory.php", {
    method:"GET",
}).then(res=>res.json()).then(data=>{



  


    data.forEach(datum=>{
        let set_categories= (datum.category)

        // console.log(set_categories)
        all_categories.push(set_categories)
         unique_categories=[...new Set(all_categories)]

         let set_suppliers= (datum.supplier)

         // console.log(set_categories)
         all_suppliers.push(set_suppliers)
          unique_suppliers=[...new Set(all_suppliers)]

    })

    unique_categories.forEach(category=>{
        document.querySelector(".category ul").innerHTML+=`<li>${category}</li>`
    })

    unique_suppliers.forEach(supplier=>{
     
        document.querySelector(".supply ul").innerHTML+=`<li>${supplier}</li>`
    })


    let supply_li=document.querySelectorAll(".supply ul li")
    let category_li=document.querySelectorAll(".category ul li")
    
    get_input(category_li, cat_input)
    get_input(supply_li, sup_input)
    animate(supply_li,category_li, filter, large_select, sorter)
    display_none(supply_li, category_li, filter, large_select)

})



let category_li=document.querySelectorAll(".category ul li")

let supply_li=document.querySelectorAll(".supply ul li")




display_none(sort_li,  order_li, sort, sorter)
display_none(supply_li, category_li, filter, large_select)



animate(sort_li, order_li, sort, sorter, large_select)
animate(supply_li,category_li, filter, large_select, sorter)

get_input(supply_li, sup_input)
get_input(category_li, cat_input)

get_input(sort_li, sort_input)
get_input(order_li, order_input)





large_select.addEventListener("mouseenter", ()=>{
    large_select.style.display="block";
})


sorter.addEventListener("mouseenter", ()=>{
    sorter.style.display="block";
})



function fetchInventory(filters = {}) {


    item_cont.innerHTML = "";

    const queryParams = new URLSearchParams(filters).toString();

    fetch(`get_inventory.php?${queryParams}`, {
        method:"GET",
    })
    
    .then(res=>res.json())
    .then(data=>{

        if(data.status==="null"){
  

            
            item_cont.innerHTML = "  <h1>No Products</h1>";
            
              
        
        
                      
        


        }

        else{
    

       
          
          
            data.forEach((datum)=>{
            
                
             

                
        
                item_cont.innerHTML+=`
        <div class="item_card">
                          <div class="item">
                              <div class="item_pic">
                                <div class="pic_overlay"></div>
                                  <img src="pictures/${datum.image}" alt="">
                              </div>
        
                              <div class="item_details">
                                <div class="data"><h4>Stock:</h4> <p>${datum.quantity}</p></div>
                                <div class="data"><h4>Category:</h4> <p>${datum.category}</p></div>
                                <div class="data"><h4>Supplier:</h4> <p>${datum.supplier}</p></div>
                                <div class="data"><h4>Expiration:</h4> <p>${datum.date}</p></div>
                              </div>
                          </div>
        
                          <div class="item_name">
                             <h4>${datum.name}</h4> 
                          </div>
                         <div class="actions_cont">
                            <a href="update_product.html?q=${datum.id}" class="actions"><i class="fa-solid fa-pen"></i></a>
                            <div class="actions delete_id" ><i class="fa-solid fa-trash"></i></div>
                        </div>
                      </div>
        
        
                      
        `

        document.querySelectorAll(".delete_id").forEach((manager,j) =>{
            manager.addEventListener("click", ()=>{
                document.querySelector(".screen_overlay").style.display="block"
                document.querySelector(".hero").style.animation=""
    
                // document.querySelector(".hero").classList.remove("hero_blur");
    
                // void document.querySelector(".hero").offsetWidth;
               
    
                document.querySelector(".hero").classList.add("hero_blur")
                
                document.querySelector("#name").innerHTML=`${data[j].name}`
                document.querySelector("#id").value=data[j].id
                document.querySelector(".search_bar").style.bottom="-600px";

            
            })
        })
        
            
            })
            
            
          



   




        
        let item_cardss=document.querySelectorAll(".item_card")
        item_cardss.forEach((item_card, i)=>{
            setTimeout(() => {
                item_card.style.display="block";
            }, i*100);
        })
        }
      
    
    
    
    
     
    })


}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const filters = Object.fromEntries(formData.entries());
    large_select.style.display="none" 
    sorter.style.display="none"
    fetchInventory(filters);

    let item_cardss=document.querySelectorAll(".item_card")
    item_cardss.forEach((item_card, i)=>{
        void item_card.offsetWidth;
        setTimeout(() => {
            item_card.style.display="block";
        }, i*100);
    })
    
});





fetchInventory()



document.querySelector("#no").addEventListener("click", ()=>{
    document.querySelector(".screen_overlay").style.display="none"
                document.querySelector(".hero").classList.remove("hero_blur")
                document.querySelector(".hero").style.animation="remove_blur .6s"
                document.querySelector("#name").textContent=""
                document.querySelector("#id").value=""
                
                setTimeout(()=>{
                document.querySelector(".search_bar").style.bottom="0";
                    
                }, 800)
})





const delete_form=document.querySelector("#delete_form")

delete_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    form_data=new FormData(delete_form)

    fetch("delete_item.php", {
        method: "POST",
        body: form_data
    }).then(res=>res.json()).then(data=>{

     

    if(data.status==="success"){

            message.style.display='flex';
            message.textContent="Item Deleted"
            sale_submit.disabled =true;

            setTimeout(() => {
            message.style.display='none';
            }, 7000);


            setTimeout(()=>{
                location.reload();
            }, 600)

        }
    })
})



fetch("get_exp.php", {
    method:"GET"
})

.then(res=>res.json())
.then(data=>{

    


    if(data.status==="no_record"){
       
    }


    else{

     
     
    }


    

   
})


fetch("get_total_not.php", {
    method:"GET"
})

.then(res=>res.json())
.then(data=>{

    


    if(data.status==="no_record"){
       
    }


    else{

        document.querySelector(".notify").textContent=data.total
    
     
    }


    

   
})