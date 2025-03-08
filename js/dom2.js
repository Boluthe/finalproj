let items=document.querySelectorAll(".items ul li");
let categories=document.querySelectorAll(".categories ul li");
let product=document.querySelector(".product_data");
let cat_value=document.querySelector(".cat_value");
let item_sel= document.querySelector(".item_selector")
let cat_sel= document.querySelector(".cat_selector")
let item_h4=document.querySelector(".item_selector h4")
let cat_h4=document.querySelector(".cat_selector h4")
let anchors=document.querySelectorAll(".reg_card")
let fields=document.querySelectorAll(".field")
let fields_block=document.querySelectorAll(".field_block")
let trs=document.querySelectorAll(".sales tr")



fields.forEach((field, i) =>{
    setTimeout(() => {
        field.style.display = 'flex'; 
      }, i * 100); 
})

fields_block.forEach((field, i) =>{
    setTimeout(() => {
        field.style.display = 'block'; 
      }, i * 100); 
})


trs.forEach((tr, i) =>{
    setTimeout(() => {
        tr.style.display = 'table-row'; 
      }, i * 100); 
})

anchors.forEach((anchor, i) =>{
    setTimeout(() => {
        anchor.style.display = 'block'; 
      }, i * 100); 
})


items.forEach((item, i)=>{
    item_sel.addEventListener("mouseenter", ()=>{
        document.querySelector(".items").style.display="block";
    
        
    
        setTimeout(() => {
            item.style.display="block";
        }, i*100);
    
    })
})



items.forEach((item, i)=>{
    item_sel.addEventListener("mouseleave", ()=>{
        document.querySelector(".items").style.display="none";
    
        
    
      
            item.style.display="none";
        
    
    })
})


categories.forEach((category, i)=>{
    cat_sel.addEventListener("mouseenter", ()=>{
        document.querySelector(".categories").style.display="block";
    
        
    
        setTimeout(() => {
            category.style.display="block";
        }, i*100);
    
    })
})



categories.forEach((category, i)=>{
    cat_sel.addEventListener("mouseleave", ()=>{
        document.querySelector(".categories").style.display="none";
    
        
    
      
            category.style.display="none";
        
    
    })
})




// item_sel.addEventListener("mouseleave", ()=>{
  

//     void item.offsetWidth;

// })




items.forEach((item, i) => {
    item.addEventListener("click", ()=>{
        let item_data=item.textContent;
        // item_h4.classList.add("animate-text");
        product.value=item_data;
        const event = new Event("input", { bubbles: true });

        product.dispatchEvent(event);
        item_h4.textContent=item_data;

        item_h4.classList.remove("animate-text");

        void item_h4.offsetWidth;
        item_h4.classList.add("animate-text");

        document.querySelector(".items").style.display="none";
    })


   
});



categories.forEach((category, i) => {
    category.addEventListener("click", ()=>{
        let item_data=category.textContent;
        // item_h4.classList.add("animate-text");
        cat_value.value=item_data;
        const event = new Event("input", { bubbles: true });

        cat_value.dispatchEvent(event);
        cat_h4.textContent=item_data;

        cat_h4.classList.remove("animate-text");

        void cat_h4.offsetWidth;
        cat_h4.classList.add("animate-text");

        document.querySelector(".categories").style.display="none";
    })


   
});
