let item_conts=document.querySelector(".item_cont");
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

const urlParams = new URLSearchParams(window.location.search);


const branchId = urlParams.get('v');





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







large_select.addEventListener("mouseenter", ()=>{
large_select.style.display="block";
})


sorter.addEventListener("mouseenter", ()=>{
sorter.style.display="block";
})








let all_categories=[]
let unique_categories=[]
let all_suppliers=[]
let unique_suppliers=[]



fetch(`get_inventory.php?v=${branchId}`, {
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






function fetchInventory(filters = {}) {
  

    item_conts.innerHTML = "";
    const queryParams = new URLSearchParams(filters).toString();
  

    fetch(`get_inventory.php?v=${branchId}&${queryParams}`, {
        method:"GET",
    })
    
    .then(res=>res.json())
    .then(data=>{

        if(data.status==="null"){
            console.log(data)

            
            item_conts.innerHTML = "  <h1>No Products</h1>";
            
              
        
        
                      
        


        }

        else{
            // document.querySelector(".null").style.display="none"
            data.forEach((datum)=>{
                // console.log(datum)
        
                item_conts.innerHTML+=`
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
        
                      </div>
        
        
                      
        `
        
            
            })
        
          
            
        
     
        }
      
    
    
        let item_cardss=document.querySelectorAll(".item_card")
        item_cardss.forEach((item_card, i)=>{
            setTimeout(() => {
                item_card.style.display="block";
            }, i*100);
        })


        branches.forEach((branch, i)=>{
            branch.addEventListener("click", ()=>{
                if(i===0){
                  
        
                    item_cardss.forEach((item_card, i)=>{
                        setTimeout(() => {
                            item_card.style.display="block";
                        }, i*100);
                    })
               
        
        
                    
                    
                }
        
                if(i===2){
                  
        
        
                    item_cardss.forEach((item_card, i)=>{
                 
                            item_card.style.display="none";
              
                    })
                }
        
                if(i===1){
                  
        
        
                    item_cardss.forEach((item_card, i)=>{
                 
                        item_card.style.display="none";
          
                })
                }
        
         
            })
        })


        
    
     
    })


}



fetch(`get_purchase_records.php?v=${branchId}`, {
    method:"GET"
})

.then(res=>res.json())
.then(data=>{

    document.querySelector("#tbody").innerHTML=""
    if(data.status==="no_record"){
        document.querySelector("#purchase_pdf").style.display="none";
    }


    else{
        data.forEach((datum, i)=>{
            document.querySelector("#tbody").innerHTML+=`

              <tr>
                            <td>${datum.name}</td>
                            <td>${datum.quantity}</td>
                            <td>${datum.date}</td>
                            <td>${datum.supplier}</td>
                            <td > <div class="in-stock">${datum.current_stock}</div></td>
                          </tr>
            `
        })


        document.getElementById('purchase_pdf').addEventListener('click', () => {
            const { jsPDF } = window.jspdf;
                    const doc = new jsPDF();
        
        
                    const headRows = Array.from(document.querySelectorAll("#purchase_head tr")).map(tr => 
                        Array.from(tr.cells).map(td => td.textContent)
                    );
                    
                    // Extract table body rows
                    const bodyRows = Array.from(document.querySelectorAll("#tbody tr")).map(tr => 
                        Array.from(tr.cells).map(td => td.textContent)
                    );
                    
        
                    doc.autoTable({
                        head: headRows, // Set the head rows
                        body: bodyRows,
                        startY: 10,
                        headStyles: { fillColor: [100, 150, 255] },
                        theme: 'grid'
                    });
        
                    doc.save(`${data[1].branch}-purchases-report.pdf`);
        });


    }


    let trss=document.querySelectorAll(".purchases tr")

    branches.forEach((branch, i)=>{
        branch.addEventListener("click", ()=>{
            if(i===0){
              
    
    
                trss.forEach((tr, i) =>{
                  
                    tr.style.display = 'none';
               
            })
    
    
                
                
            }
    
            if(i===2){
              
    
    
                trss.forEach((tr, i) =>{
                    setTimeout(() => {
                        tr.style.display = 'table-row';
                      }, i * 100); 
                })
            }
    
            if(i===1){
              
    
    
                trss.forEach((tr, i) =>{
                  
                        tr.style.display = 'none';
                   
                })
            }
    
     
        })
    })

    
   
})



fetch(`get_sales_records.php?v=${branchId}`, {
    method:"GET"
})

.then(res=>res.json())
.then(data=>{

    // document.querySelector("#sales").innerHTML=""
    if(data.status==="no_record"){
       console.log("no record")

       document.querySelector("#sale_pdf").style.display="none";
    }


    else{
        console.log(data)

        data.forEach((datum, i)=>{
            document.querySelector("#sales").innerHTML+=`

              <tr>
                            <td>${datum.name}</td>
                            <td>${datum.quantity}</td>
                            <td>${datum.date}</td>
                            <td>${datum.customer}</td>
                            <td > <div class="in-stock">${datum.current_stock}</div></td>
                          </tr>
            `



        })



        document.getElementById('sale_pdf').addEventListener('click', () => {
            const { jsPDF } = window.jspdf;
                    const doc = new jsPDF();
        
        
                    const headRows = Array.from(document.querySelectorAll("#sale_head tr")).map(tr => 
                        Array.from(tr.cells).map(td => td.textContent)
                    );
                    
                    // Extract table body rows
                    const bodyRows = Array.from(document.querySelectorAll("#sales tr")).map(tr => 
                        Array.from(tr.cells).map(td => td.textContent)
                    );
                    
        
                    doc.autoTable({
                        head: headRows, // Set the head rows
                        body: bodyRows,
                        startY: 10,
                        headStyles: { fillColor: [100, 150, 255] },
                        theme: 'grid'
                    });
        
                    doc.save(`${data[1].branch}-sales-report.pdf`);
        });



    }








    let trss=document.querySelectorAll(".sales tr")

    branches.forEach((branch, i)=>{
        branch.addEventListener("click", ()=>{
            if(i===0){
              
    
    
                trss.forEach((tr, i) =>{
                  
                    tr.style.display = 'none';
               
            })
    
    
                
                
            }
    
            if(i===1){
              
    
    
                trss.forEach((tr, i) =>{
                    setTimeout(() => {
                        tr.style.display = 'table-row';
                      }, i * 100); 
                })
            }
    
            if(i===2){
              
    
    
                trss.forEach((tr, i) =>{
                  
                        tr.style.display = 'none';
                   
                })
            }
    
     
        })
    })

})





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
















fetchInventory();
