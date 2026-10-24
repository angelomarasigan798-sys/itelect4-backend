import "dotenv/config";
import { reviewProject } from "./ai/gemini";

async function main(): Promise<void> {
  const review = await reviewProject(
    "A course submission tracker built with React and TypeScript. " +
      "Students log in, choose a course, and save a GitHub repository link. " +
      "The Express API uses MongoDB and is deployed on Vercel.",
  );
  console.log(JSON.stringify(review, null, 2));
}

main().catch((error: unknown) => {
  console.error("Gemini test request failed:", error);
  process.exitCode = 1;
});
