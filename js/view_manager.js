



const urlParams = new URLSearchParams(window.location.search);


const branchId = urlParams.get('v');



fetch(`get_manager.php?v=${branchId}`, {
    method: "GET"
})

.then(res=>res.json())
.then(data=>{

    if(data.status==="null"){
        message.style.display='flex';
        message.textContent="user does not exist"
        submit.disabled =true;

        setTimeout(() => {
        message.style.display='none';
        }, 7000);
    }


    else{
        data.forEach(datum => {
            document.querySelector(".cent").innerHTML=`
            
                 <div class="profile_card">
                    <div class="prof_cont">
                        <div class="prof data">
                            <i class="fa-solid fa-people-roof"></i>
                        </div>
                    </div>

                    <div class="data datum">${datum.name}</div>
                    <div class="data datum">${datum.email}</div>
                    <div class="data datum">${datum.phone}</div>
                    <div class="data datum">${datum.branch}</div>
                </div>
            `
        });
    }

    document.querySelectorAll(".data").forEach((datum, i)=>{
        setTimeout(()=>{
            datum.style.display="flex"
        }, i*100)
    })
})