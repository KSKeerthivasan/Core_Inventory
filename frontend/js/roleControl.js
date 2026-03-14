document.addEventListener("DOMContentLoaded", function () {

    const role = localStorage.getItem("role")

    if (!role) {
        window.location.href = "login.html"
        return
    }

    if (role === "staff") {

        // hide manager-only menu items
        const managerMenus = document.querySelectorAll(".manager-only")

        managerMenus.forEach(menu => {
            menu.style.display = "none"
        })

        // hide manager quick actions
        const managerActions = document.querySelectorAll(".manager-action")

        managerActions.forEach(action => {
            action.style.display = "none"
        })
    }

})