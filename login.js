    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    togglePassword.addEventListener('click',()=>{
      const type=password.getAttribute('type')==='password'?'text':'password';
      password.setAttribute('type',type);
      togglePassword.textContent=type==='password'?'👁':'🙈';
    });

    document.getElementById('loginForm').addEventListener('submit',e=>{
      e.preventDefault();
      const email=document.getElementById('email').value.trim();
      const pass=document.getElementById('password').value.trim();
      if(email===''||pass===''){alert('Please fill in all fields');}
      else{
        alert('Login successful!');
        window.location.href="indexx.html"; // redirect
      }
    });