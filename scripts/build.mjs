import { execSync } from "node:child_process";

// If on Vercel or already inside OpenNext standalone build, run native next build
if (process.env.VERCEL || process.env.NEXT_PRIVATE_STANDALONE) {
  execSync("next build", { stdio: "inherit" });
} else {
  // On Cloudflare CI or local Worker builds, run OpenNext
  execSync("npx opennextjs-cloudflare build", { stdio: "inherit" });
}
