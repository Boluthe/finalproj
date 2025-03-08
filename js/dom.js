let hideTimer
let search=document.querySelector("#search")
let search_trig=document.querySelector("#search_trig")
let search_bar=document.querySelector(".search_bar")
let data=document.querySelectorAll("#data");
let sale_submit=document.querySelector("#sale_submit")
let item_cards=document.querySelectorAll(".item_card")
let fileInput=document.querySelector("#img")
let img_label=document.querySelector("#img_label")




item_cards.forEach((item_card, i)=>{
    setTimeout(() => {
        item_card.style.display="block";
    }, i*100);
})


data.forEach((datum, i)=> {

    datum.addEventListener("input", ()=>{
        let allFilled = Array.from(data).every((field) => field.value.trim() !== '');
    sale_submit.disabled = !allFilled;

    

    })
 
    
   
});

















