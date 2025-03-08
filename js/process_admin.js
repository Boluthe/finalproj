let admin_form=document.querySelector("#admin_form");
let submit=document.querySelector("#sale_submit");


let form_fields=document.querySelectorAll("#data");
let message=document.querySelector(".message");



form_fields.forEach((datum, i)=>{

    datum.setAttribute('autocomplete', 'off');
    datum.addEventListener("input", ()=>{
        
    if(form_fields[5].value!==form_fields[4].value){
        submit.disabled =true;
    }

    // else{
    //     submit.disabled =false;
    // }
    

    

    })
})





admin_form.addEventListener("submit", (k)=>{
    k.preventDefault();

    const form_data=new FormData(admin_form);

    fetch("process_admin.php", {
        method: 'POST',
        body: form_data
    })

    .then(response=> response.json())
    .then(data=>{
        if(data.status==='success'){


            message.style.display='flex';
            message.textContent="account created successfully"
            submit.disabled =true;

            setTimeout(() => {
            message.style.display='none';
            }, 7000);

            form_fields.forEach(datum => {
                datum.value="";
              

            });
        }


        else if(
            data.status==='used_email'
        ){
            message.style.display='flex';
            message.textContent="email already in use"

            
                form_fields[1].value="";
                form_fields[4].value="";
                submit.disabled =true;
        
            setTimeout(() => {
            message.style.display='none';
            }, 7000);
        }


        else if(
            data.status==='used_store'
        ){
            message.style.display='flex';
            message.textContent="store with name already exists"

            
                form_fields[3].value="";
                form_fields[4].value="";
                submit.disabled =true;
        
            setTimeout(() => {
            message.style.display='none';
            }, 7000);
        }


        else if(data.status==='invalid_password'){
            message.style.display='flex';
            message.textContent="password too weak"

            
                form_fields[4].value="";
                form_fields[5].value="";
                submit.disabled =true;

        
            setTimeout(() => {
            message.style.display='none';
            }, 7000);
        }

        else{
            console.log(`Error: ${data.message}`)
        }
    })

    .catch(error => {
        console.error('Error:', error);
        console.log('An unexpected error occurred.') ;
    });


})