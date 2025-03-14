document.addEventListener("DOMContentLoaded", () => {
    const managerSelect = document.querySelector("#manager");

    fetch("get_managers.php", {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "null") {
            managerSelect.innerHTML = "<option value=''>No Managers Available</option>";
        } else {
            data.forEach(manager => {
                const option = document.createElement("option");
                option.value = manager.id;
                option.textContent = manager.name;
                managerSelect.appendChild(option);
            });
        }
    })
    .catch(error => console.error('Error fetching managers:', error));

    const branchForm = document.querySelector("#branch_form");

    branchForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(branchForm);

        fetch("create_branch.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                alert("Branch created successfully!");
                branchForm.reset();
            } else if (data.status === "exists") {
                alert("Branch with this name already exists.");
            } else {
                alert("Failed to create branch.");
            }
        })
        .catch(error => console.error('Error creating branch:', error));
    });
});