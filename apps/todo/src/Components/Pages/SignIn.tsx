import React from "react";

export default function SignIn(){
  return(
    <div>
        <h1>signup</h1>
        <form className="signup">
          <label>email:</label>
          <input type="email"></input>
          <label>Password:</label>
          <input type="password"></input>
          <button type="submit" >signup</button>
        </form>
      </div>
  )
}
