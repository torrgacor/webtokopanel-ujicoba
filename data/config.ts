export const pterodactylConfig = { 
  // Private Server Configuration
  private: {
    domain: "https://tokopanel157-private216.mts4you.biz.id",
    apiKey: "ptla_ms1X6SBb1SZQcSJrtX4xx16O9FwZHWBXbpsEPknrke1",
    nests: "5", 
    egg: "15", 
    location: "1", // location panel 
  },
  // Public Server Configuration
  public: {
    domain: "https://tokopanel157-public209.mts4you.biz.id", // ubah sesuai domain public panel
    apiKey: "ptla_ueVeAgspM7fITWiHFy6KLkM44w2M1utAxK5xyDY7EQZ", // ubah sesuai public API key
    nests: "5", 
    egg: "15", 
    location: "1", // location panel 
  },
  // Shared settings (not needed if different)
  nestsGame: "2", // ga usah di isi, ga perlu
  eggSamp: "16", // ga usah di isi, ga perlu
}

export const appConfig = {
  whatsappGroupLink: "https://whatsapp.com/channel/0029VbBHzkt1t90Z4H55f638", // link group
  nameHost: "MTS4YOU XD", // nama host 
  feeMin: 10, //minimal fee
  feeMax: 50, // max fee 
  garansi: {
    warrantyDays: 12, // Limit hari
    replaceLimit: 3, // Limit replace/claim
  },
  pay: {
    api_key: "KEY-Dq4VmT7PQorsWotGvyczJnsBfcx",
    api_id: "ID-723482138356",
  },
  emailSender: {
    host: "mail.mts4youxd425@gmail.com", // Gmail host
    port: 587, // ga usa di ubah, ga guna 
    secure: false, // false in
    auth: {
      user: "mail.mts4youxd425@gmail.com", // Gmail buat ngirim ke Gmail buyer 
      pass: "joernukccwnrzpww", // sandi aplikasi 
    },
    from: "Tukang Panel <mail.mts4youxd425@gmail.com>",
  }, // ganti sendiri 
  telegram: {
    botToken: "8278654381:AAFLiXYcLJ4HKIgr1BV_xH3uRCAum6akMO8",
    ownerId: "7015524549",
  },
  mongodb: {
    uri: "mongodb+srv://tokspanels:tokspanels123@congor.s4haaui.mongodb.net/?retryWrites=true&w=majority&appName=Congor", // url mongo mu
dbName: "Congor",
  },
  socialMedia: {
    whatsapp: "https://wa.me/6289513452028",
    telegram: "https://t.me/mts4youxd",
    tiktok: "https://www.tiktok.com/@mts4you.xd",
    instagram: "https://www.instagram.com/ig_mtsstore",
  }
}
