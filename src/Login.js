import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectURL } from "./utils/mockdata";

const Login = () => {
  const navigate = useNavigate();
  const [userEmail,setUserEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if((userEmail === undefined)  || (password === undefined)){
      alert("Kindly enter all Fields for Login !");
      return ;
    }

    const dataInput = {
      email : userEmail,
      password : password
    };
    
    const loginpath = projectURL + "profiles/login";
    
    try {

      const fetchdata = async () => {
        const response = await fetch(loginpath, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataInput),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("res status " + response.status);
          const username = data?.username;

          const userId = data?._id;

          localStorage.setItem("authenticated", true);
          localStorage.setItem("loggedUserName",username);
          sessionStorage.setItem("loggedUserName",username);
          localStorage.setItem("loggedUserId",userId);
          sessionStorage.setItem("loggedUserId",userId);  
          console.log('Authentication Done');
          navigate("/dashboard");
        } else {
          alert('Login Failed !');
        }
      }
      fetchdata();  
    } catch (error) {
      console.log('Authentication Fail');
      alert('You have entered wrong username or password !');
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="max-w-30" src="socio.png" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" >
            <div>
              <div className="mt-2">
                <input onChange={(e) => {setUserEmail(e.target.value)}}  placeholder="Enter Email"
                id="email" name="email" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-center focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input onChange={(e) => {setPassword(e.target.value)}}  placeholder="Enter Password"
                id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-center focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2  " />
              </div>
            </div>

            <a href="register" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Register Here</a>

            <div>
              <button onClick={handleSubmit} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>
        </div>
      </div>      
    </div>
  );
};


export default Login;