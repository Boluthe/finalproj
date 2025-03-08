let message=document.querySelector(".message");


fetch("get_manager.php", {
    method: "GET"
})

.then(res=>res.json())
.then(data=>{

    console.log(data)
    if(data.status==="null"){

    }


    else{

        data.forEach((datum,i) => {
            document.querySelector(".cent").innerHTML+=`
        
            
                <div class="card">
                    <div class="profile_pic">
                       <i class="fa-solid fa-people-roof"></i>
                    </div>

                    <div class="name">
                        <h4>${datum.name}</h4>
                    </div>

                    <div class="branch">
                        <h4>${datum.branch}</h4>
                    </div>

                    <div class="pill">
                          <div class="icons" id="delete_id"><i class="fa-solid fa-trash"></i></div> 
                       <a href="edit_manager.html?v=${datum.id}" class="icons"><i class="fa-solid fa-pen"></i></a> 
                       <a href="view_manager.html?v=${datum.id}" class="icons"> <i class="fa-regular fa-eye"></i></a>
                     
                    </div>
                </div>
        `


        document.querySelectorAll("#delete_id").forEach((manager,j) =>{
            manager.addEventListener("click", ()=>{
                document.querySelector(".screen_overlay").style.display="block"
                document.querySelector(".hero").style.animation=""

                // document.querySelector(".hero").classList.remove("hero_blur");
    
                void document.querySelector(".hero").offsetWidth;
               

                document.querySelector(".hero").classList.add("hero_blur")

                document.querySelector("#name").textContent=data[j].name
                document.querySelector("#manager_id").value=data[j].id
                document.querySelector("#manager_email").value=data[j].email
            })
        })

        });
        
    }
})


document.querySelector("#no").addEventListener("click", ()=>{
    document.querySelector(".screen_overlay").style.display="none"
                document.querySelector(".hero").classList.remove("hero_blur")
                document.querySelector(".hero").style.animation="remove_blur .6s"
                document.querySelector("#name").textContent=""
                document.querySelector("#manager_id").value=""
                document.querySelector("#manager_email").value=""
})


const delete_manager_form=document.querySelector("#delete_form")

delete_manager_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    form_data=new FormData(delete_manager_form)

    fetch("delete_manager.php", {
        method: "POST",
        body: form_data
    }).then(res=>res.json()).then(data=>{
        if(data.status==="success"){

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