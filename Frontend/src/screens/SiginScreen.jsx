import React, { useState } from "react";
import { Helmet } from "react-helmet";

function SignInScreen() {
  return (
    <div className="signin-screen">
      <Helmet>
        <title>Sign In</title>
      </Helmet>

      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Sign In</button>
      </form>

      <div>
        <p>
          Don't have an account?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create new Account</Link>
        </p>
      </div>
    </div>
  );
}

export default SignInScreen;
