// Read configuration from environment variables to avoid committing secrets.
// Provide sensible defaults where appropriate (but do NOT commit production secrets).
export const pterodactylConfig = {
  private: {
    domain: process.env.PTERODACTYL_PRIVATE_DOMAIN || "",
    apiKey: process.env.PTERODACTYL_PRIVATE_API_KEY || "",
    nests: process.env.PTERODACTYL_PRIVATE_NESTS || "5",
    egg: process.env.PTERODACTYL_PRIVATE_EGG || "15",
    location: process.env.PTERODACTYL_PRIVATE_LOCATION || "1",
  },
  public: {
    domain: process.env.PTERODACTYL_PUBLIC_DOMAIN || "",
    apiKey: process.env.PTERODACTYL_PUBLIC_API_KEY || "",
    nests: process.env.PTERODACTYL_PUBLIC_NESTS || "5",
    egg: process.env.PTERODACTYL_PUBLIC_EGG || "15",
    location: process.env.PTERODACTYL_PUBLIC_LOCATION || "1",
  },
  nestsGame: process.env.PTERODACTYL_NESTS_GAME || "2",
  eggSamp: process.env.PTERODACTYL_EGG_SAMP || "16",
}

export const appConfig = {
  whatsappGroupLink: process.env.NEXT_PUBLIC_WHATSAPP_GROUP || "",
  nameHost: process.env.NEXT_PUBLIC_APP_NAME || "My Panel Shop",
  feeMin: Number(process.env.APP_FEE_MIN || "10"),
  feeMax: Number(process.env.APP_FEE_MAX || "50"),
  garansi: {
    warrantyDays: Number(process.env.GARANSI_DAYS || "12"),
    replaceLimit: Number(process.env.GARANSI_REPLACE_LIMIT || "3"),
  },
  pay: {
    api_key: process.env.SAKURU_API_KEY || "",
    api_id: process.env.SAKURU_API_ID || "",
  },
  emailSender: {
    host: process.env.EMAIL_SENDER_HOST || "",
    port: Number(process.env.EMAIL_SENDER_PORT || "587"),
    secure: process.env.EMAIL_SENDER_SECURE === "true" || false,
    auth: {
      user: process.env.EMAIL_SENDER_USER || "",
      pass: process.env.EMAIL_SENDER_PASSWORD || "",
    },
    from: process.env.EMAIL_SENDER_FROM || `Panel <${process.env.EMAIL_SENDER_USER || "no-reply@example.com"}>`,
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || "",
    ownerId: process.env.TELEGRAM_OWNER_ID || "",
  },
  mongodb: {
    uri: process.env.MONGODB_URI || "",
    dbName: process.env.MONGODB_DBNAME || "webtokopanel",
  },
  socialMedia: {
    whatsapp: process.env.SOCIAL_WHATSAPP || "",
    telegram: process.env.SOCIAL_TELEGRAM || "",
    tiktok: process.env.SOCIAL_TIKTOK || "",
    instagram: process.env.SOCIAL_INSTAGRAM || "",
  }
}
