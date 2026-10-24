# ITELECT4 Backend

## Gemini AI review

The private `POST /api/ai` route accepts a project description and returns a
validated review. Requests require the same bearer token used by the other
private API routes and are limited to five per minute per account.

For local development, copy `.env.example` to `.env`, fill in the existing
MongoDB and JWT settings, and add a Google AI Studio key as `GEMINI_API_KEY`.
Keep `.env` out of version control. The frontend must never receive the Gemini
key; set it only in the backend environment.

Install packages and start the API with `npm install` and `npm run dev`.
`npm run try-ai` sends a sample request directly to Gemini and prints the
validated four-field review; it requires a working key and uses the project's
Google quota.
