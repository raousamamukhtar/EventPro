/**
 * Central configuration file for EventPro.
 * You can configure these values either by editing this file or by setting the corresponding
 * environment variables in your '.env.local' or production environment.
 */

export const EVENT_CONFIG = {
  // Brand & Event Basics
  name: process.env.NEXT_PUBLIC_EVENT_NAME || "EventPro",
  organizer: process.env.NEXT_PUBLIC_EVENT_ORGANIZER || "EventPro Team",
  year: process.env.NEXT_PUBLIC_EVENT_YEAR || "2026",
  
  // Contacts
  email: process.env.NEXT_PUBLIC_EVENT_EMAIL || "events@eventpro.com",
  website: process.env.NEXT_PUBLIC_EVENT_WEBSITE || "eventpro.com",
  supportEmail: process.env.NEXT_PUBLIC_EVENT_SUPPORT_EMAIL || "support@eventpro.com",
  
  // Marketing & Copy
  description: process.env.NEXT_PUBLIC_EVENT_DESCRIPTION || "Next-generation event registration and management system",
  logline: process.env.NEXT_PUBLIC_EVENT_LOGLINE || "Inspiring the next wave of innovators through hands-on learning, real-world challenges, and cutting-edge technology.",
  tagline: process.env.NEXT_PUBLIC_EVENT_TAGLINE || "Pakistan's Premier Tech & Innovation Event",
  prizes: process.env.NEXT_PUBLIC_EVENT_PRIZES || "PKR 150K Prizes",
  
  // Logistics
  date: process.env.NEXT_PUBLIC_EVENT_DATE || "August 21, 2026",
  location: process.env.NEXT_PUBLIC_EVENT_LOCATION || "NFC-IET",
  attendees: process.env.NEXT_PUBLIC_EVENT_ATTENDEES || "200+ Attendees",
};
