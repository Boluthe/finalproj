let message=document.querySelector(".message");

  
function decodeHtml(html) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
}



fetch(`get_branches.php`, {
    method:"GET",
})

.then(res=>res.json())
.then(data=>{

    if(data.status==="null"){


        
      
        
          
    
    
                  
    


    }

    else{
        // document.querySelector(".null").style.display="none"
        data.forEach((datum)=>{
            // console.log(datum)
    
            document.querySelector(".cont1").innerHTML+=`
    <div class="store field_block">
            <div class="pill">
                    <img src="images/istockphoto-1412353022-612x612.jpg" alt="">
                    <div class="pill_overlay">
                        <a href="branch.html?v=${datum.branch}" class="delete" id="rise">Branch Data</a> 
                        <div href="" class="delete delete_id" id="rise"> Delete Branch</div>
                        <a href="assign_manager.html?v=${datum.branch}" class="delete" id="rise">Assign Manager</a>
                    </div>
                </div>

                <h3>${datum.branch}</h3>
                <h3>combined inventory level: ${datum.total}</h3>
          

            
            </div>
    
    
                  
    `
  
    

    document.querySelectorAll(".delete_id").forEach((manager,j) =>{
        manager.addEventListener("click", ()=>{
            document.querySelector(".screen_overlay").style.display="block"
            document.querySelector(".hero").style.animation=""

            // document.querySelector(".hero").classList.remove("hero_blur");

            // void document.querySelector(".hero").offsetWidth;
           

            document.querySelector(".hero").classList.add("hero_blur")

            document.querySelector("#name").textContent=decodeHtml(data[j].branch) 
            document.querySelector("#branch_id").value=data[j].id
            document.querySelector("#branch").value=  decodeHtml(data[j].branch) 
        })
    })
        
        })
    
      
        
    

    }
  

    let pills=document.querySelectorAll(".pill")
    
    let timeouts = [];
    let fields_block=document.querySelectorAll(".field_block")

    fields_block.forEach((field, i) =>{
        setTimeout(() => {
            field.style.display = 'block'; 
          }, i * 100); 
    })
    
    
    pills.forEach((pill, i)=>{
        pill.addEventListener("mouseenter", ()=>{
    
            pill.querySelector("img").style.filter="blur(4px)"
            pill.querySelector("img").style.transition="1s"
        
            timeouts.forEach(timeout => clearTimeout(timeout));
            timeouts = [];
            let rise=pill.querySelectorAll(".pill_overlay #rise")
                rise.forEach((li, i)=>{
        
                
              
               
                   const timeout= setTimeout(()=>{
                        li.classList.add("active")
                    },i*100)
        
                    timeouts.push(timeout);
                })
          
         
        })
    })
    

    pills.forEach((pill, i)=>{
        pill.addEventListener("mouseleave", ()=>{
            pill.querySelector("img").style.filter="blur(0)"
            pill.querySelector("img").style.transition="1s"

            timeouts.forEach(timeout => clearTimeout(timeout));
            timeouts = [];
        
            let rise=pill.querySelectorAll(".pill_overlay #rise")
            rise.forEach((li, i)=>{
        
                    li.classList.remove("active")
               
            })
        })
    })
    



 
})




document.querySelector("#no").addEventListener("click", ()=>{
    document.querySelector(".screen_overlay").style.display="none"
                document.querySelector(".hero").classList.remove("hero_blur")
                document.querySelector(".hero").style.animation="remove_blur .6s"
                document.querySelector("#name").textContent=""
                document.querySelector("#branch_id").value=""  
                document.querySelector("#branch").value=""
})



const delete_branch_form=document.querySelector("#delete_form")

delete_branch_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    form_data=new FormData(delete_branch_form)

    fetch("delete_branch.php", {
        method: "POST",
        body: form_data
    }).then(res=>res.json()).then(data=>{

        if(data.status==="in_stock"){
            message.style.display='flex';
            message.textContent="You still have items in branch inventory"


            setTimeout(() => {
            message.style.display='none';
            }, 7000);
        }

      else  if(data.status==="success"){

            message.style.display='flex';
            message.textContent="Account Deleted"
            sale_submit.disabled =true;

            setTimeout(() => {
            message.style.display='none';
            }, 7000);


            setTimeout(()=>{
                location.reload();
            }, 800)

        }
    })
})