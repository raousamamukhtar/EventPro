import { config } from "dotenv"

config({ path: ".env.local" })

console.log("SMTP_HOST:", process.env.SMTP_HOST ? "Set" : "Not set")
console.log("SMTP_PORT:", process.env.SMTP_PORT || "587 (default)")
console.log("SMTP_SECURE:", process.env.SMTP_SECURE || "auto")
console.log("SMTP_USER:", process.env.SMTP_USER ? "Set" : "Not set")
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Set" : "Not set")
console.log("SMTP_FROM:", process.env.SMTP_FROM ? "Set" : "Not set")
