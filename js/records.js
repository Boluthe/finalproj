let branches=document.querySelectorAll(".branch_nav ul li");
let inventory=document.querySelector(".invent")
let sales=document.querySelector(".sales")
let purchases=document.querySelector(".purchases")
let pur_tr=document.querySelectorAll("#tbody tr")

// const script = document.createElement('script');
// script.src = 'js/records.js?v=' + new Date().getTime();
// document.head.appendChild(script);



branches.forEach((branch, i)=>{
    branch.addEventListener("click", ()=>{
        if(i===0){
            inventory.style.display="block";
            sales.style.display="none";
            purchases.style.display="none";
            document.querySelector(".search_bar").style.display="block";

            fields_block.forEach((field, i) =>{
                setTimeout(() => {
                    field.style.display = 'block';
                  }, i * 100); 
            })


            trs.forEach((tr, i) =>{
              
                tr.style.display = 'none';
           
        })

        pur_tr.forEach((tr, i)=>{
            tr.style.display='none'
        })


            
            
        }

        if(i===1){
            inventory.style.display="none";
            sales.style.display="block";
            purchases.style.display="none";

            document.querySelector(".search_bar").style.display="none";

            fields_block.forEach(field_block=>{
                field_block.style.display="none";
            })


            pur_tr.forEach((tr, i)=>{
                tr.style.display='none'
            })

            trs.forEach((tr, i) =>{
                setTimeout(() => {
                    tr.style.display = 'table-row';
                  }, i * 100); 
            })
        }

        if(i===2){
            inventory.style.display="none";
            sales.style.display="none";
            purchases.style.display="block";
            document.querySelector(".search_bar").style.display="none";
             fields_block.forEach(field_block=>{
                field_block.style.display="none";
            })


            trs.forEach((tr, i) =>{
              
                    tr.style.display = 'none';
               
            })

            pur_tr.forEach((tr, i)=>{

                setTimeout(() => {
                    tr.style.display = 'table-row';
                  }, i * 100); 
               
            })
    
        }

 
    })
})



