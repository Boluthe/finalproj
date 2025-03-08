let delay

function decodeHtml(html) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
}


const urlParams = new URLSearchParams(window.location.search);


const branchId = urlParams.get('v');




fetch(`get_branches.php?v=${branchId}`, {
    method: "GET",
})

.then(res=>res.json())
.then(data=>{
    console.log(data)


    data.forEach(datum=>{
        document.querySelector(".branch_name").value=decodeHtml(datum.branch) ;
        document.querySelector(".assign_header").textContent+= decodeHtml(datum.branch) 
    })
   
})






fetch("get_manager.php", {
    method: "GET",
})

.then(res=>res.json())
.then(data=>{

    data.forEach((datum,i)=> {
        
        document.querySelector(".items ul").innerHTML+=`
        <li>${datum.name}</li>
       `
    });



    let itemss=document.querySelectorAll(".items ul li");


    data.forEach((datum)=>{
       

        itemss.forEach((item, i)=>{
            item.addEventListener("click", ()=>{
                document.querySelector("#manager").value=data[i].email;
                document.querySelector("#manager_name").value=data[i].name;
                document.querySelector(".animate-text").textContent=data[i].name;
                document.querySelector(".items").style.display="none";

                item_h4.classList.remove("animate-text");
    
            void item_h4.offsetWidth;
            item_h4.classList.add("animate-text");

            const event = new Event("input", { bubbles: true });
    
            document.querySelector(".branch_name").dispatchEvent(event);
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
    
})



let assign_form=document.querySelector("#assign_form")

assign_form.addEventListener("submit", (E)=>{
    E.preventDefault()

    form_data= new FormData(assign_form)


    fetch("assign_manager.php", {
        method: "POST",
        body:form_data
    })

    .then(res=>res.json()).then(data=>{
        console.log(data)
        if(data.status==="success"){
            message.style.display="flex"
             message.textContent="manager assigned";

             setTimeout(() => {
                message.style.display='none';
                }, 7000);


                document.querySelector("#manager").value="";
                document.querySelector("#manager_name").value="";
                document.querySelector(".animate-text").textContent="Select Manager"
                sale_submit.disabled=true;

                item_h4.classList.remove("animate-text");
    
            void item_h4.offsetWidth;
            item_h4.classList.add("animate-text");
        }

        else if(data.status==="assigned"){
            message.style.display="flex"
            message.textContent="can't assign twice";

            setTimeout(() => {
               message.style.display='none';
               }, 7000);
        }
    })
})