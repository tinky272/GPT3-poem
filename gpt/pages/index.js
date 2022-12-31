import Head from "next/head";
import { Inter } from "@next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center">Poem Generator</h1>
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generatePoem();
            }}
            className="flex flex-row gap-x-4 my-8 justify-center"
          >
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="px-3 py-2 text-lg rounded-lg border-2"
              type="text"
              placeholder="Subject matter"
            />
            <button
              type="submit"
              className="px-3 py-2 font-semibold rounded-lg bg-black text-white"
            >
              Submit
            </button>
          </form>
          <div className="text-lg whitespace-pre-line">{output}</div>
        </div>
      </main>
    </>
  );

  async function generatePoem() {
    const response = await fetch("/api/generate-poem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: userInput,
      }),
    });

    const data = await response.json();

    if (data.poem) {
      setOutput(data.poem);
    }

    setUserInput("");
  }
}
