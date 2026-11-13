"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 4,
      }}
    >
      <Typography variant="h2" fontWeight="bold">
        Music Generation Platform
      </Typography>

      <Typography variant="h6" sx={{ mt: 3, mb: 4 }}>
        Generate music from a simple text description using artificial intelligence.
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => router.push("/generate")}
      >
        Start Generating
      </Button>

      <Button
        variant="outlined"
        size="large"
        sx={{ mt: 2 }}
        onClick={() => router.push("/history")}
      >
        View History
      </Button>
    </Box>
  );
}