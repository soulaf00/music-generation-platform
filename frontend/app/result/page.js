"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Result() {
  const router = useRouter();

  const audioUrl =
    "http://127.0.0.1:5000/audio/generated_music.wav";

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
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>
        Your Generated Music
      </Typography>

      <Typography variant="h6" sx={{ mb: 4 }}>
        Your music has been generated successfully.
      </Typography>

      <audio controls>
        <source src={audioUrl} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      <Button
        variant="contained"
        onClick={() => router.push("/generate")}
        sx={{ mt: 4 }}
      >
        Generate Another
      </Button>

      <Button
        variant="outlined"
        onClick={() => router.push("/history")}
        sx={{ mt: 2 }}
      >
        View History
      </Button>

      <Button
        variant="text"
        onClick={() => router.push("/")}
        sx={{ mt: 2 }}
      >
        Back to Home
      </Button>
    </Box>
  );
}