async function testChat() {
  const url = "http://localhost:3000/api/chat";
  const body = {
    message: "What is Next.js?",
    userId: "test-user-123"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Chat failed:", err);
      return;
    }

    console.log("Stream started:");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: innerDone } = await reader.read();
      if (value) {
        process.stdout.write(decoder.decode(value));
      }
      done = innerDone;
    }
    console.log("\nStream finished.");

  } catch (error) {
    console.error("Test failed:", error);
  }
}

testChat();
