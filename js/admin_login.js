let login_form=document.querySelector("#login_form");
let message=document.querySelector(".message");

login_form.addEventListener("submit", (e)=>{
    e.preventDefault();


    const form_data=new FormData(login_form);

    fetch("admin_login.php", {
        method:'POST',
        body: form_data
    })

    .then(response=> response.json())
    .then(data=>{
        if(data.status==="success"){
            window.location.href=data.redirect_url;
        }

      

        else{
          
            message.textContent="admin does not exist";

            message.style.display="flex";
            setTimeout(() => {
                message.style.display='none';
                }, 7000);
        }
    })

    .catch(error => {
        console.error('Error:', error);
        // document.getElementById('responseMessage').textContent = 'An unexpected error occurred.';
    });
})