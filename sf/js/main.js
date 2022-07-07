
// ========== Evetns  ========
window.addEventListener("DOMContentLoaded", () => {
    //=========== menu option ===========
    const menu_toggle = document.getElementById("menu_toggle");
    menu_toggle.addEventListener("click", () => {
        console.log("clicked on menu-bar");
        let nav_manu = document.getElementById("nav-menu");
        nav_manu.style.top = 70 + "vh";
        let icon = document.getElementById("menu-icon")
        menu_toggle.style.visibility = "hidden"
    });

    const reg_bar = document.querySelector("#reg-bar")

    reg_bar.addEventListener("click", () => {
        console.log("click on register is running ")

        let old_user_login = document.getElementById("old_user_login");
        old_user_login.style.display = "none";
        reg_bar.style.color = "aqua"
        login_bar.style.color = "#fff"
    })

    // ===== login older user event ==========
    const login_bar = document.querySelector("#login-bar")
    login_bar.addEventListener("click", () => {
        console.log("click on login is running ")
        let old_user_login = document.getElementById("old_user_login");
        old_user_login.style.display = "block";
        login_bar.style.color = "aqua"
        reg_bar.style.color = "#fff"
    })

    //Contact_Us _Form
    document.querySelector("#reachUsFrom").addEventListener("submit", () => {

        console.log("submit event is working fine...")

        alert("Your response has been submitted, We will reach out to you within next 24 hours")
    })

    // $(document).ready(function(){
    //     $('#reg-bar').click(()=>{ $('#reg_new_user').toggle(1000);
    //     })
    // })

})