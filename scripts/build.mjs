import { execSync } from "node:child_process";
import fs from "node:fs";

// Capture any build-time or platform-injected variables into .env.production
// so OpenNext bundles them into the server function bundle
const envKeysToCapture = [
  "RESEND_API_KEY",
  "CONTACT_TO_EMAIL",
  "RESEND_FROM_EMAIL",
];

const capturedLines = [];
for (const key of envKeysToCapture) {
  // Case-insensitive check in process.env
  for (const [envKey, envVal] of Object.entries(process.env)) {
    if (envKey.toLowerCase() === key.toLowerCase() && envVal) {
      capturedLines.push(`${key}=${envVal}`);
      break;
    }
  }
}

if (capturedLines.length > 0) {
  fs.appendFileSync(".env.production", "\n" + capturedLines.join("\n") + "\n");
}

// If on Vercel or already inside OpenNext standalone build, run native next build
if (process.env.VERCEL || process.env.NEXT_PRIVATE_STANDALONE) {
  execSync("next build", { stdio: "inherit" });
} else {
  // On Cloudflare CI or local Worker builds, run OpenNext
  execSync("npx opennextjs-cloudflare build", { stdio: "inherit" });
}
