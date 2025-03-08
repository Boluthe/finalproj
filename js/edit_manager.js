let edit_man_form=document.querySelector("#edit_manager_form")

const urlParams = new URLSearchParams(window.location.search);


const branchId = urlParams.get('v');




fetch(`get_manager.php?v=${branchId}`,{
    method:"GET"
}).then(res=>res.json()).then(data=>{
    if(data.status==="null"){

    }

    else{

        data.forEach(datum => {
            document.querySelector(".name").value=datum.name
            document.querySelector(".phone").value=datum.phone
            document.querySelector("span").innerHTML=datum.name
        })

        const event = new Event("input", { bubbles: true });
        document.querySelector(".phone").dispatchEvent(event);
        
    }
})






edit_man_form.addEventListener("submit", (e)=>{
    e.preventDefault();

   const form_data= new FormData(edit_man_form)


    fetch(`edit_manager.php?v=${branchId}`,{
        method:"POST",
        body: form_data
    } ).then(res=>res.json()).then(data=>{
        

        if(data.status==="success"){
            message.style.display='flex';
            message.textContent="Account edited successfully"
            sale_submit.disabled =true;

            setTimeout(() => {
            message.style.display='none';
            }, 7000);

           
        }
    })
      
    

})