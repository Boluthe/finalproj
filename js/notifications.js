




fetch("get_exp.php", {
    method:"GET"
})

.then(res=>res.json())
.then(data=>{

    


    if(data.status==="no_record"){
       
    }


    else{


        data.forEach((datum, i)=>{
            // console.log(datum)
            document.querySelector("#tbody").innerHTML+=`

            <tr>
                                <td><div class="exp_img"><img src="pictures/${datum.image}" alt=""></div></td>
                                <td>${datum.name}</td>
                                <td>${datum.date}</td>
                                <td>${datum.quantity} Left in stock</td>
                                <td>${datum.branch}</td>
            
                         
                              </tr>
            `
        })
    }


    let trss=document.querySelectorAll("#tbody tr")

    trss.forEach((tr, i) =>{
        setTimeout(() => {
            tr.style.display = 'table-row';
          }, i * 100); 
    })

   
})




fetch("get_low_stock.php", {
    method:"GET"
})

.then(res=>res.json())
.then(data=>{

    


    if(data.status==="no_record"){
       
    }


    else{

        // document.querySelector(".notify").textContent=data.length
        data.forEach((datum, i)=>{
            // console.log(datum)
            document.querySelector("#low").innerHTML+=`

            <tr>
                                <td><div class="exp_img"><img src="pictures/${datum.image}" alt=""></div></td>
                                <td>${datum.name}</td>
                                <td>${datum.quantity} Left in stock</td>
                                <td>${datum.branch}</td>
            
                         
                              </tr>
            `
        })
    }


    let trss=document.querySelectorAll("#low tr")

    trss.forEach((tr, i) =>{
        setTimeout(() => {
            tr.style.display = 'table-row';
          }, i * 100); 
    })

   
})




fetch("get_total_not.php", {
    method:"GET"
})

.then(res=>res.json())
.then(data=>{

    


    if(data.status==="no_record"){
       
    }


    else{

        document.querySelector(".notify").textContent=data.total
   
     
    }


    

   
})