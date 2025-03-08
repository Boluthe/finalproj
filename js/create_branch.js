let man_form=document.querySelector("#manager_form");
let form_fields=document.querySelectorAll("#data");
let message=document.querySelector(".message");
let submit=document.querySelector("#sale_submit");
let branch_form=document.querySelector("#branch_form")





branch_form.addEventListener("submit", (e)=>{
    e.preventDefault()

    const form_data= new FormData(branch_form)

    fetch("create_branch.php", {
        method: "POST",
        body: form_data
    })

    .then(res=>res.json())
    .then(data=>{

        console.log(data.status)
        if(data.status==="success"){
            message.style.display='flex';
            message.textContent="branch created"
            submit.disabled =true;

            setTimeout(() => {
            message.style.display='none';
            }, 7000);

            form_fields.forEach(datum => {
                datum.value="";
              

            });
        }


        else if(data.status==="exists"){
            message.style.display='flex';
            message.textContent="branch with name already exists"
          

            setTimeout(() => {
            message.style.display='none';
            }, 7000);
        }
    })
})