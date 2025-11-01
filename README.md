## Flashcard Generator App

An  flashcard application built with the MERN stack (MongoDB, Express, React, Node.js) and  cohere API.
It allows users to generate flashcards automatically from text.

## Features

User Authentication – Secure login & signup using JWT.

AI-Powered Flashcard Generation – Generate flashcards automatically using cohereAI.

Save & Manage Flashcards – Flashcards are stored per user in MongoDB.

Swipe Interface – Swipe left/right  (mobile-friendly).


## Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT (JSON Web Token), bcrypt.js |
| **AI Integration** | cohereAI API |


## How It Works

User logs in or signs up.

They input text or a topic → app sends it to OpenAI API.

AI generates flashcards (question-answer pairs).

User can swipe through cards and mark answers as correct/incorrect.

Accuracy stats are saved and displayed in dashboard.









