const SUPABASE_URL = "https://udebhvhzrwzatknfwxtw.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkZWJodmh6cnd6YXRrbmZ3eHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NTUyMTIsImV4cCI6MjA4OTAzMTIxMn0._CAEpD3v7LDa-fgAzI1TKqf3m7nhjNrxUETdBzAafI8"

const { createClient } = supabase
const sb = createClient(SUPABASE_URL, SUPABASE_KEY)
const API = "http://127.0.0.1:8000"

async function signup(){

    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()
    const role = document.getElementById("role").value

    if(!email || !password){
        alert("Enter email and password")
        return
    }

    const { data, error } = await sb.auth.signUp({
        email: email,
        password: password
    })

    if(error){
        alert(error.message)
        return
    }

    if(!data.user){
        alert("Signup failed")
        return
    }

    const userId = data.user.id

    const res = await fetch(API + "/users/create",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            id: userId,
            email: email,
            role: role
        })
    })

    const result = await res.json()

    console.log(result)

    alert("Account created. Please login.")
    window.location.href = "login.html"
}


async function login(){

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const {data,error} = await sb.auth.signInWithPassword({
        email: email,
        password: password
    })

    if(error){
        alert(error.message)
        return
    }

    const userId = data.user.id

    const res = await fetch(API + "/users/" + userId)
    const user = await res.json()

    localStorage.setItem("role", user.role)
    localStorage.setItem("session", JSON.stringify(data.session))

    window.location.href = "dashboard.html"
}



async function resetPassword(){

    const email = document.getElementById("email").value.trim()

    if(!email){
        alert("Please enter your email first")
        return
    }

    const { data, error } = await sb.auth.resetPasswordForEmail(email)

    if(error){
        alert(error.message)
        return
    }

    alert("Password reset link sent to your email")
}