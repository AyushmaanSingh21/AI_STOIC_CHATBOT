// Simple server implementation for StoicSage
const express = require('express');
const path = require('path');
const app = express();

// Quotes data
const stoicQuotes = [
  { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius" },
  { text: "You have power over your mind - not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
  { text: "The obstacle is the way.", author: "Marcus Aurelius" },
  { text: "It's not what happens to you, but how you react to it that matters.", author: "Epictetus" },
  { text: "Make the best use of what is in your power, and take the rest as it happens.", author: "Epictetus" },
  { text: "Man is disturbed not by things, but by the views he takes of them.", author: "Epictetus" },
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { text: "Luck is what happens when preparation meets opportunity.", author: "Seneca" },
  { text: "We should every night call ourselves to an account; What infirmity have I mastered today?", author: "Seneca" },
  { text: "Begin at once to live, and count each separate day as a separate life.", author: "Seneca" },
  { text: "Most powerful is he who has himself in his own power.", author: "Seneca" },
  { text: "If a man knows not to which port he sails, no wind is favorable.", author: "Seneca" },
  { text: "What need is there to weep over parts of life? The whole of it calls for tears.", author: "Seneca" },
  { text: "No person has the power to have everything they want, but it is in their power not to want what they don't have.", author: "Seneca" }
];

// Daily practices
const stoicPractices = [
  {
    title: "Morning Reflection",
    description: "Start your day by reflecting on potential challenges and preparing your mind for them.",
    steps: [
      "Find a quiet space for 5-10 minutes",
      "Consider what challenges you might face today",
      "Remind yourself of your values and principles",
      "Visualize yourself responding virtuously to difficulties"
    ]
  },
  {
    title: "Negative Visualization",
    description: "Contemplate the impermanence of what you value to appreciate it more deeply.",
    steps: [
      "Consider something or someone you value greatly",
      "Imagine life without this person or thing",
      "Reflect on the temporariness of all things",
      "Return to the present with renewed gratitude"
    ]
  },
  {
    title: "Evening Reflection",
    description: "Review your day and assess your actions against your values.",
    steps: [
      "Consider what you did well today",
      "Identify where you fell short of your principles",
      "Plan how to improve tomorrow",
      "Practice self-forgiveness for mistakes"
    ]
  },
  {
    title: "Voluntary Discomfort",
    description: "Intentionally practice minor discomforts to build resilience.",
    steps: [
      "Choose a small comfort to forgo temporarily",
      "Notice your reactions and automatic thoughts",
      "Remind yourself of your inner strength",
      "Reflect on how external comforts are not essential to wellbeing"
    ]
  }
];

// Middleware for JSON parsing
app.use(express.json());

// API endpoints
app.get('/api/quotes/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * stoicQuotes.length);
  res.json(stoicQuotes[randomIndex]);
});

app.get('/api/quotes', (req, res) => {
  res.json(stoicQuotes);
});

app.get('/api/practices', (req, res) => {
  res.json(stoicPractices);
});

app.get('/api/practices/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * stoicPractices.length);
  res.json(stoicPractices[randomIndex]);
});

// Serve static files from the client/dist directory
app.use(express.static('client/dist'));

// For any other route, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});