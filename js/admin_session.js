fetch('admin_session.php')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    console.log(data);
                    
                    document.querySelector(".last_cont ul").innerHTML=`
                    <li class='highlight'>Admin</li> 
                    <a href="logout.php"><li>Logout</li></a>`
                    document.querySelector(".logo_cont").innerHTML=`<a href="index.html" class="highlight">${data.store}</a>` 

                    document.querySelector(".highlight").style.color="#7307f7"
                    document.querySelector(".highlight").style.fontWeight = "600";
                    document.querySelector(".highlight").style.fontSize="18px"
                } else {
                   
                    window.location.href = 'login.html';
                }
            })
            .catch(error => console.error('Error:', error));