
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function login() {
    if (!supabase) {
      setMessage("Supabase setup is required.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const response = await fetch("/api/admin/products", {
      headers: {
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (!response.ok) {
      setMessage("Admin access denied.");
      return;
    }

    setMessage("Login successful!");
  }

  return (
    <main style={{
      maxWidth: 420,
      margin: "60px auto",
      padding: 25,
      fontFamily: "Arial"
    }}>
      <h1>MR Syco Admin</h1>
      <p>Beauty & Skincare Store</p>

      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{display:"block",width:"100%",padding:14,marginBottom:12}}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{display:"block",width:"100%",padding:14,marginBottom:12}}
      />

      <button onClick={login} style={{padding:14,width:"100%"}}>
        Login
      </button>

      <p>{message}</p>
    </main>
  );
}
