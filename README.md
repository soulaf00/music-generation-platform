# AI-Powered Music Generation Platform

An AI-powered web application that generates music from natural-language text prompts using Meta AI's MusicGen Small model (`facebook/musicgen-small`), integrated through Hugging Face Transformers.

Users can describe the type of music they want, generate an audio track, listen to the result, and manage their generated music through a history dashboard.

## Features

- **AI Music Generation:** Generate music from text descriptions using Meta AI's MusicGen Small model.
- **Text-to-Music:** Describe the desired genre, mood, instruments, and musical style.
- **Audio Playback:** Listen to generated tracks directly in the application.
- **Music History:** View previously generated tracks in a structured table.
- **Download Music:** Download generated audio files.
- **Delete Music:** Remove tracks from the history with a confirmation dialog.
- **Database Integration:** Store user information and generated music records in MongoDB.
- **User-Music Relationship:** Organize music records using a one-to-many relationship between users and music.

## Technologies Used

### Backend
- Python
- Flask
- Hugging Face Transformers
- MusicGen Small (`facebook/musicgen-small`)
- PyTorch

### Frontend
- Next.js
- React.js
- Material UI

### Database
- MongoDB
- Mongoose

## Project Architecture

The application consists of three main components:

1. **Frontend (Next.js):** Provides the user interface for entering prompts, generating music, listening to tracks, and managing music history.
2. **Backend (Flask):** Handles music generation using the MusicGen model and provides API endpoints for accessing and downloading generated audio.
3. **Database (MongoDB):** Stores user information and generated music records. Mongoose is used to connect the Next.js application to MongoDB.

## Project Structure

```text
music-generation-platform/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── requirements.txt
│   └── run.py
│
├── frontend/
│   ├── app/
│   │   ├── api/
│   │   ├── generate/
│   │   ├── history/
│   │   └── result/
│   ├── lib/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── .gitignore
```

## Installation and Setup

### Prerequisites

- Python
- Node.js and npm
- MongoDB Community Server
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/soulaf00/music-generation-platform.git
cd music-generation-platform
```

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask backend:

```bash
python run.py
```

### 3. Set Up MongoDB

Make sure the MongoDB Community Server is installed and running locally.

The application uses the following MongoDB connection string:

```text
mongodb://127.0.0.1:27017/music_generation_db
```

MongoDB creates the database and collections when data is first stored.

### 4. Set Up the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

**Note:** The MusicGen model may require a substantial initial download and sufficient system resources. Model inference performance depends on the available hardware.

## Application Workflow

The main application workflow is:

**NEW → DESCRIBE MUSIC → GENERATE → SAVE → VIEW HISTORY → PLAY / DOWNLOAD / DELETE**

1. The user enters a text description of the desired music.
2. The frontend sends the prompt to the Flask backend.
3. MusicGen Small generates the audio.
4. The generated audio is made available to the frontend.
5. The music record is saved in MongoDB.
6. The user can access and manage saved tracks through the history page.

## Database Design

The application uses two main MongoDB schemas:

- **UserSchema:** Stores user information.
- **MusicSchema:** Stores generated music information, including the prompt, filename, creation date, and associated user.

The relationship follows a one-to-many structure:

**One User → Many Music Records**

Mongoose handles the interaction between the Next.js application and MongoDB.

## Project Status

The core music generation and management workflow has been implemented:

- Text-to-music generation using MusicGen Small.
- Flask REST API integration.
- Next.js frontend.
- MongoDB database integration using Mongoose.
- User and music schemas with a one-to-many relationship.
- Music history management.
- Audio playback and downloads.
- Music deletion with confirmation.
- Responsive interface components using Material UI.

## AI Model Reference

**Model:** `facebook/musicgen-small`

**Developer:** Meta AI

**Model Repository:** https://huggingface.co/facebook/musicgen-small

**Framework:** Hugging Face Transformers

---

Developed as an AI-powered music generation project.
