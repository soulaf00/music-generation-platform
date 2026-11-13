"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

export default function History() {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMusicId, setSelectedMusicId] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const router = useRouter();

  useEffect(() => {
    fetchMusic();
  }, []);

  async function fetchMusic() {
    try {
      const response = await fetch("/api/music");
      const data = await response.json();
      setMusic(data.music);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteMusic(id) {
    try {
      const response = await fetch("/api/music", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        setMusic((previousMusic) =>
          previousMusic.filter((item) => item._id !== id)
        );

        setSnackbarMessage("Music deleted successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage(data.error);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);

      setSnackbarMessage("Failed to delete music.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ p: 5 }}>
        <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/")}
            sx={{ mb: 3 }}
        >
            Back to Generator
        </Button>

        <Typography variant="h3" gutterBottom>
          Music History
        </Typography>

        {music.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
            }}
          >
            <MusicNoteIcon
              color="disabled"
              sx={{
                fontSize: 70,
                mb: 2,
              }}
            />

            <Typography variant="h5" gutterBottom>
              No music generated yet
            </Typography>

            <Typography color="text.secondary">
              Generate your first song to see it appear here.
            </Typography>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Prompt</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {music.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Tooltip title={item.prompt} arrow>
                        <Typography
                          noWrap
                          sx={{
                            maxWidth: 300,
                            cursor: "pointer",
                          }}
                        >
                          {item.prompt.length > 35
                            ? `${item.prompt.substring(0, 35)}...`
                            : item.prompt}
                        </Typography>
                      </Tooltip>
                    </TableCell>

                    <TableCell>{item.user.name}</TableCell>

                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}

                      <br />

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {new Date(item.createdAt).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Play Music">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            setCurrentAudio(
                              "http://127.0.0.1:5000/audio/generated_music.wav"
                            )
                          }
                        >
                          <PlayArrowIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Download Music">
                        <IconButton
                          color="secondary"
                          component="a"
                          href="http://127.0.0.1:5000/download/generated_music.wav"
                          sx={{ ml: 1 }}
                        >
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete Music">
                        <IconButton
                          color="error"
                          sx={{ ml: 1 }}
                          onClick={() => {
                            setSelectedMusicId(item._id);
                            setOpenDialog(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {currentAudio && (
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Now Playing
            </Typography>

            <audio key={currentAudio} controls autoPlay>
              <source src={currentAudio} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </Box>
        )}
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Delete Music</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this music?
            <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              deleteMusic(selectedMusicId);
              setOpenDialog(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}