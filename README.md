# Pterodactyl Panel Shop (Next.js)

Sistem penjualan dan provisioning otomatis untuk panel Pterodactyl yang mendukung **private dan public server** dengan API key dan domain yang terpisah.

---

## 📦 Fitur Utama

- ✅ **Dual Panel Support**: Private dan Public panel dengan konfigurasi terpisah
- ✅ **Otomasi Provisioning**: Buat user dan server langsung di Pterodactyl panel
- ✅ **Payment Integration**: Integrasi dengan Sakurupiah (QRIS/e-wallet)
- ✅ **Email Notifications**: Kirim detail akun otomatis ke email pelanggan
- ✅ **Warranty/Garansi**: Fitur klaim garansi dengan replacement server
- ✅ **Transaction History**: Riwayat transaksi dengan data sensitif ter-enkripsi
- ✅ **Real-time Status**: Polling otomatis untuk update pembayaran dan provisioning
- ✅ **Responsive UI**: Didesain dengan Tailwind CSS dan Framer Motion

---

## 🔧 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Database**: MongoDB
- **UI**: Tailwind CSS, Shadcn UI, Framer Motion
- **APIs**: Pterodactyl API, Sakurupiah Payment Gateway
- **Email**: Nodemailer (Gmail SMTP)

---

## 🚀 Setup & Deployment

### Prerequisites
- Node.js 18+ dan pnpm
- MongoDB (Atlas atau lokal)
- Pterodactyl panel instances (private & public)
- Sakurupiah payment gateway credentials

### Local Development

1. **Clone repository**:
```bash
git clone https://github.com/torrgacor/webtokopanel-ujicoba.git
cd webtokopanel-ujicoba
```

2. **Install dependencies**:
```bash
pnpm install
```

3. **Configure environment variables** (copy from `.env.example`):
```bash
cp .env.example .env.local
# Edit .env.local dengan nilai sebenarnya
```

4. **Jalankan development server**:
```bash
pnpm dev
```

Buka http://localhost:3000 di browser.

### Production Build

```bash
pnpm build
pnpm start
```

---

## 📋 Environment Variables

Lihat `.env.example` untuk daftar lengkap. Variable kunci yang diperlukan:

```bash
# MongoDB
MONGODB_URI=mongodb+srv://...

# Pterodactyl Private Panel
PTERODACTYL_PRIVATE_DOMAIN=https://panel-private.example.com
PTERODACTYL_PRIVATE_API_KEY=ptla_...

# Pterodactyl Public Panel  
PTERODACTYL_PUBLIC_DOMAIN=https://panel-public.example.com
PTERODACTYL_PUBLIC_API_KEY=ptla_...

# Payment Gateway
SAKURU_API_ID=ID-...
SAKURU_API_KEY=KEY-...

# Email
EMAIL_SENDER_USER=your-email@gmail.com
EMAIL_SENDER_PASSWORD=app-password
```

---

## 📂 Project Structure

```
webtokopanel-ujicoba/
├── app/
│   ├── actions/           # Server actions (payment, panel creation, etc)
│   ├── api/               # API routes
│   ├── garansi/           # Warranty/replacement pages
│   ├── history/           # Transaction history page
│   ├── invoice/           # Invoice/payment detail pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Shadcn UI components
│   ├── panel-form.tsx     # Main purchase form
│   ├── qr-payment.tsx     # QR code payment display
│   └── ...                # Other components
├── data/
│   ├── config.ts          # Panel & app configuration
│   └── plans.ts           # Service plans
├── lib/
│   ├── pterodactyl.ts     # Pterodactyl API wrapper
│   ├── mongodb.ts         # MongoDB client
│   ├── email-service.ts   # Email sending
│   └── utils.ts           # Utilities
└── public/                # Static assets
```

---

## 🔑 Key Improvements (Latest Update)

### Separate Panel Provisioning
- Private dan public servers dibuat di panel yang berbeda
- Setiap panel memiliki API key dan domain unik di `data/config.ts`
- User existence checks dilakukan per panel type
- Email mengirim URL panel yang sesuai

### Configuration
Update `data/config.ts` dengan credentials Pterodactyl Anda:
```typescript
export const pterodactylConfig = {
  private: {
    domain: "https://your-private-panel.com",
    apiKey: "ptla_your_private_key",
    nests: "5",
    egg: "15",
    location: "1",
  },
  public: {
    domain: "https://your-public-panel.com",
    apiKey: "ptla_your_public_key",
    nests: "5",
    egg: "15",
    location: "1",
  },
}
```

---

## 📡 Deployment Options

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository di [vercel.com](https://vercel.com)
3. Set environment variables
4. Deploy otomatis

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

### Traditional VPS/Server

```bash
git clone https://github.com/torrgacor/webtokopanel-ujicoba.git
cd webtokopanel-ujicoba
pnpm install
pnpm build
pm2 start "pnpm start" --name "panel-shop"
```

---

## 🐛 Troubleshooting

### "Panel API Error"
- Verifikasi API key dan domain di `data/config.ts`
- Pastikan API key memiliki permission untuk create users & servers
- Test koneksi: `curl -H "Authorization: Bearer YOUR_KEY" https://your-panel/api/application/users`

### "Email tidak terkirim"
- Enable "Less secure app access" untuk Gmail (atau gunakan App Password)
- Verifikasi credentials di environment variables
- Check SMTP server bisa diakses dari server production

### "MongoDB connection failed"
- Verifikasi MONGODB_URI string
- Pastikan IP server di-whitelist di MongoDB Atlas
- Test koneksi: `mongosh "mongodb+srv://..."`

---

## 📝 License & Credits

Dikembangkan dengan ❤️ untuk komunitas Pterodactyl Indonesia.

---

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:
1. Fork repository
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📧 Support

Untuk bantuan lebih lanjut, silakan hubungi melalui WhatsApp atau email di config.

```bash
# 1. Clone repositori
git clone https://github.com/zkyit/pterodactyl.git
cd pterodactyl

# 2. Install dependencies
npm install

# 3. Jalankan secara lokal
npm run dev
```

---

## ☁️ Deploy ke Vercel

Jika ingin langsung deploy ke [Vercel](https://vercel.com):

1. Buka [https://vercel.com](https://vercel.com) dan login/daftar
2. Klik **"New Project"**
3. Import repositori GitHub kamu
4. Atur environment variable jika diperlukan
5. Klik **Deploy**

Aplikasi kamu akan tersedia di:
**[https://vercel.com/pttokozaki-gmailcoms-projects/pterodactyl](https://vercel.com/pttokozaki-gmailcoms-projects/pterodactyl)**

---

## 🌍 Website Pengembang

Dikembangkan oleh **Zass Newbie**
Kunjungi: [https://zass.cloud](https://zass.cloud)

---

## 💬 Komunitas WhatsApp

Gabung komunitas diskusi, update fitur, dan bantuan teknis:
📱 [Grup WhatsApp Developer](https://zass.cloud/komunitas)
