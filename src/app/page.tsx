"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (res.ok) {
      const { videoUrl } = await res.json();
      window.location.href = videoUrl; // simple redirect to download
    } else {
      alert("Something went wrong – try again");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-amber-50">
      <div className="container mx-auto px-6 pt-24 pb-32 text-center">
        <h1 className="text-6xl md:text-8xl font-black text-[#1E3A8A] mb-6">
          Threshold
        </h1>
        <p className="text-2xl md:text-3xl text-[#1E3A8A]/90 mb-12 max-w-3xl mx-auto">
          Paste any UK property link and get a cinematic video in under 60 seconds
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.rightmove.co.uk/properties/123456..."
            className="flex-1 h-16 px-6 text-lg rounded-xl border border-[#1E3A8A]/30 focus:outline-none focus:border-[#FBBF24]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="h-16 px-12 text-xl font-bold text-[#1E3A8A] bg-[#FBBF24] rounded-xl hover:bg-amber-400 disabled:opacity-70 transition"
          >
            {loading ? "Working magic..." : "Create Video Free →"}
          </button>
        </form>

        <div className="flex justify-center gap-12 mt-16 text-[#1E3A8A]/70">
          <div>Rightmove</div>
          <div>Zoopla</div>
          <div>OnTheMarket</div>
        </div>
      </div>
    </main>
  );
}