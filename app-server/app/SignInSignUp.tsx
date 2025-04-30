'use client';

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const SignInSignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onClickSignIn = async () => {
        const { data, error } = await authClient.signIn.email({
            /**
             * The user email
             */
            email,
            /**
             * The user password
             */
            password,
            /**
             * A URL to redirect to after the user verifies their email (optional)
             */
            callbackURL: "/dashboard",
            /**
             * remember the user session after the browser is closed. 
             * @default true
             */
            rememberMe: true
    }, {
        //callbacks
    })
    }

    const [name, setName] = useState("");

    const onClickSignUp = async () => {
        const { data, error } = await authClient.signUp.email({
            email, // user email address
            password, // user password -> min 8 characters by default
            name, // user display name
            callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
        }, {
            onRequest: (ctx) => {
                //show loading
            },
            onSuccess: (ctx) => {
                //redirect to the dashboard or sign in page
            },
            onError: (ctx) => {
                // display the error message
                alert(ctx.error.message);
            },
    });
    }

    return (
        <div>
            <h1>Sign in</h1>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={onClickSignIn}>Sign in</button>
            <h1>Sign up</h1>
<label>
    email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
</label>
            <label>
                password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                name
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <button onClick={onClickSignUp}>Sign up</button>
        </div>
    )
}

export default SignInSignUp;