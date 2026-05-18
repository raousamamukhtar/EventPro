# 🚀 Secure Vercel Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. Local Security Audit ✅
- [ ] No hardcoded credentials in code
- [ ] All environment variables properly set
- [ ] `.env.local` in `.gitignore`
- [ ] Admin login working with base64 hash
- [ ] Rate limiting functional
- [ ] Input sanitization active

### 2. Code Review ✅
- [ ] Remove any debug console.log statements
- [ ] Remove test files with sensitive data
- [ ] Clean up temporary files
- [ ] Update documentation

## 🔧 Vercel Deployment Steps

### Step 1: Prepare Environment Variables

Generate production credentials:
```bash
npx tsx scripts/setup-admin.ts
```

### Step 2: Set Up Vercel Project

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Configure Project Settings**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Environment Variables

### Step 3: Add Environment Variables

Add these to Vercel Environment Variables:

```env
# Admin Authentication
ADMIN_EMAIL=your-production-admin@domain.com
ADMIN_PASSWORD_HASH_B64=your-base64-encoded-hash
JWT_SECRET=your-64-character-jwt-secret

# Database
DATABASE_URL=your-production-database-url

# Email Service
RESEND_API_KEY=your-production-resend-api-key

# Google Sheets (if using)
GOOGLE_SHEETS_PRIVATE_KEY=your-base64-encoded-service-account-key
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account-email
GOOGLE_SHEETS_SPREADSHEET_ID=your-production-spreadsheet-id
```

### Step 4: Deploy

```bash
vercel --prod
```

## 🔒 Post-Deployment Security

### 1. Test Production Environment
- [ ] Admin login works
- [ ] Registration form functions
- [ ] Email sending works
- [ ] Database connections work
- [ ] All API endpoints respond

### 2. Security Headers
Add to `next.config.mjs`:
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

### 3. Domain Security
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set up custom domain
- [ ] Configure DNS properly
- [ ] Enable HSTS

## 📊 Monitoring Setup

### 1. Vercel Analytics
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking
- [ ] Monitor performance

### 2. Security Monitoring
- [ ] Set up failed login alerts
- [ ] Monitor API usage
- [ ] Track error rates
- [ ] Set up uptime monitoring

## 🔄 Maintenance Procedures

### Weekly Tasks
- [ ] Check Vercel deployment status
- [ ] Review error logs
- [ ] Monitor admin login attempts
- [ ] Update dependencies if needed

### Monthly Tasks
- [ ] Rotate admin credentials
- [ ] Update JWT secrets
- [ ] Review access logs
- [ ] Backup verification

### Quarterly Tasks
- [ ] Security audit
- [ ] Performance review
- [ ] Update security policies
- [ ] Penetration testing

## 🚨 Emergency Procedures

### If Site is Compromised
1. **Immediate Actions**
   - Change admin password
   - Rotate JWT secret
   - Check Vercel logs
   - Review recent deployments

2. **Investigation**
   - Check access logs
   - Review environment variables
   - Identify attack vector
   - Document incident

3. **Recovery**
   - Update all credentials
   - Implement additional security
   - Notify stakeholders
   - Update procedures

## ✅ Final Verification

Before going live:
- [ ] All environment variables set in Vercel
- [ ] Admin login tested in production
- [ ] Registration form tested
- [ ] Email functionality verified
- [ ] Database connections working
- [ ] Security headers configured
- [ ] Monitoring set up
- [ ] Backup procedures ready

## 🎯 Production URLs

- **Main Site**: `https://your-domain.vercel.app`
- **Admin Panel**: `https://your-domain.vercel.app/admin`
- **API Endpoints**: `https://your-domain.vercel.app/api/*`

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally first
4. Review security checklist
5. Contact support if needed

**Your application is now securely deployed on Vercel! 🚀** 