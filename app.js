const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Token endpoint
app.post("/token", async (req, res) => {
  try {
    console.log("req.headers", req.headers);

    const response = await fetch("https://widget-api.imi.chat/oauth/token", {
      method: "POST",
      headers: {
        ...req.headers,
        client_host: "qa.webconnectorprojects.com",
        grant_type: "client_credentials",
        // host: new URL(API_C_BASE_URL).host, // Override host if necessary
      },
    });

    // Parse and forward the response
    const data = await response.text(); // Use .text() to allow all content-types
    console.log("response data: ", data);
    res.status(response.status);
    res.set(Object.fromEntries(response.headers.entries()));
    res.send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res
      .status(500)
      .json({ error: "Proxy server error", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
