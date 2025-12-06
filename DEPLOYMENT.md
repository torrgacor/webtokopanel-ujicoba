# Deployment Checklist untuk Production

## ✅ Pre-Deployment

- [ ] Semua changes sudah di-commit dan di-push ke main branch
- [ ] Build sukses: `pnpm build`
- [ ] Tidak ada TypeScript errors
- [ ] Environment variables sudah dikonfigurasi

## 🔐 Security Checklist

- [ ] API keys sudah di-store di environment variables (tidak di-commit)
- [ ] `.env.local` di-add ke `.gitignore`
- [ ] Database credentials aman dan ter-backup
- [ ] CORS configured dengan benar
- [ ] Rate limiting enabled untuk API routes
- [ ] Input validation di semua forms

## 📋 Configuration Checklist

- [ ] Pterodactyl API keys & domains correct:
  - [ ] Private panel credentials verified
  - [ ] Public panel credentials verified
- [ ] MongoDB connection string working
- [ ] Email sender credentials tested
- [ ] Sakurupiah payment gateway credentials verified
- [ ] Telegram bot token configured (optional)

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
```bash
# 1. Connect repository ke Vercel
# 2. Set environment variables di Vercel dashboard
# 3. Deploy button otomatis atau:
vercel deploy --prod
```

### Option 2: Docker/Docker Compose
```bash
# Build image
docker build -t webtokopanel:latest .

# Run dengan environment file
docker-compose --env-file .env.production up -d

# Check logs
docker-compose logs -f app
```

### Option 3: Traditional VPS
```bash
# SSH ke server
ssh user@your-server.com

# Clone & setup
git clone https://github.com/torrgacor/webtokopanel-ujicoba.git
cd webtokopanel-ujicoba
cp .env.example .env.production
# Edit .env.production dengan values sebenarnya

# Install & build
pnpm install --frozen-lockfile
pnpm build

# Setup PM2
pm2 start "pnpm start" --name "panel-shop"
pm2 save
pm2 startup

# Setup Nginx reverse proxy (optional)
# Config nginx untuk proxy ke localhost:3000
```

## 🔍 Post-Deployment Tests

- [ ] Homepage loads correctly
- [ ] Form submission works
- [ ] Payment flow completes
- [ ] Email notifications sent
- [ ] MongoDB queries working
- [ ] Pterodactyl API calls successful
- [ ] History page shows transactions
- [ ] Admin can view analytics

## 📊 Monitoring

### Logs
```bash
# Docker
docker-compose logs -f app

# PM2
pm2 logs panel-shop

# Vercel
# Check via Vercel dashboard
```

### Health Checks
- Setup monitoring untuk `/api/stats` endpoint
- Setup alerts untuk error rates > 5%
- Monitor database connection pool

## 🔄 CI/CD Setup (Optional)

### GitHub Actions
Buat `.github/workflows/deploy.yml` untuk auto-deploy ke Vercel/Docker saat push ke main branch.

## 📝 Maintenance

- [ ] Regular backups untuk MongoDB
- [ ] Monitor disk space & logs
- [ ] Update dependencies secara berkala
- [ ] Review error logs mingguan
- [ ] Test disaster recovery procedure

## 🆘 Rollback Plan

Jika ada masalah di production:
```bash
# Revert ke commit sebelumnya
git revert <commit-hash>
git push origin main

# Atau rollback deployment di Vercel dashboard
```

## 📧 Support Contacts

- Technical Support: [email]
- Emergency: [phone]
- Backup Contact: [email2]

---

**Last Updated**: 2024-12-06
**Status**: Ready for production deployment ✅
