"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

export default function Generate() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function generateMusic() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

    const data = await response.json();

if (!response.ok) {
  setError(data.error);
  return;
}

// Save music information to MongoDB
await fetch("/api/music", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: prompt,
    filename: data.filename,
  }),
});

router.push("/result");

    } catch {
      setError("Unable to connect to the music generation service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 4 }}>
        Generate Music
      </Typography>

      <TextField
        label="Describe the music you want"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        sx={{
          width: "100%",
          maxWidth: 600,
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputLabel-root": {
            color: "#90caf9",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#90caf9",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
          },
        }}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        size="large"
        onClick={generateMusic}
        disabled={loading}
        sx={{ mt: 3 }}
      >
        {loading ? "Generating..." : "Generate Music"}
      </Button>

      {loading && <CircularProgress sx={{ mt: 3 }} />}

      <Button
        variant="text"
        onClick={() => router.push("/")}
        sx={{ mt: 3 }}
      >
        Back to Home
      </Button>
    </Box>
  );
}