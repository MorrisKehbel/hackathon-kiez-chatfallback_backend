# Backend (Server)

Hackathon Fallback API for the project.

## Tech
- Node.js + Express
- Zod validation
- OpenAI SDK (streaming responses)

## Setup
1. Install dependencies:
   - `npm install`
2. Create a `.env` file:
   - `PORT=3000`
   - `CLIENT_URL=http://localhost:5173`
   - `OPENAI_API_KEY=your_key_here`
   - `NODE_ENV=production` (optional; hides stack traces in errors)
3. Start the server:
   - `npm run dev`