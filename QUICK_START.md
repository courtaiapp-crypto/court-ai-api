# 🚀 Court AI API - Quick Start Guide

## מה יצרתי לך:

### 📁 **קבצים שנוצרו:**
- ✅ `package.json` - Dependencies ו-scripts
- ✅ `tsconfig.json` - TypeScript configuration  
- ✅ `next.config.js` - Next.js configuration עם CORS
- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `lib/r2.ts` - R2/Cloudflare integration
- ✅ `lib/auth.ts` - Rate limiting ו-security
- ✅ `pages/api/video/sign.ts` - Main API endpoint
- ✅ `pages/api/health.ts` - Health check endpoint
- ✅ `setup-github.sh` - Script להעלאה ל-GitHub

## 🎯 **השלבים הבאים:**

### **1. העלאה ל-GitHub (5 דקות)**

```bash
cd court-ai-api
./setup-github.sh
```

או ידנית:
```bash
cd court-ai-api
git init
git add .
git commit -m "Initial commit: Court AI API"
git branch -M main
git remote add origin https://github.com/courtaiapp-crypto/court-ai-api.git
git push -u origin main
```

### **2. פריסה ל-Vercel (10 דקות)**

1. **לך ל-[Vercel Dashboard](https://vercel.com/dashboard)**
2. **לחץ "New Project"**
3. **חבר את ה-repository:** `courtaiapp-crypto/court-ai-api`
4. **לחץ "Deploy"**

### **3. הגדרת Environment Variables**

ב-Vercel Dashboard → Project Settings → Environment Variables:

```env
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=court-ai-videos
```

### **4. קבלת R2 Credentials**

1. **לך ל-[Cloudflare Dashboard](https://dash.cloudflare.com)**
2. **R2 Object Storage → Manage R2 API tokens**
3. **Create new token**
4. **העתק את הפרטים ל-Vercel**

### **5. עדכון האפליקציה**

ב-`app.config.ts` שלך:
```typescript
EXPO_PUBLIC_SIGN_API_BASE: 'https://your-app.vercel.app'
```

## 🧪 **בדיקות:**

### **Health Check:**
```bash
curl https://your-app.vercel.app/api/health
```

### **Video Signing:**
```bash
curl "https://your-app.vercel.app/api/video/sign?path=videos/shooting/form-shooting.mp4"
```

## 🔒 **אבטחה מובנית:**

- ✅ **Rate Limiting:** 100 בקשות ל-15 דקות
- ✅ **Path Validation:** רק קבצי וידאו מותרים
- ✅ **CORS Headers:** תמיכה באפליקציה
- ✅ **Time-limited URLs:** תפוגה אחרי שעה
- ✅ **Error Handling:** טיפול בשגיאות

## 📱 **אינטגרציה עם האפליקציה:**

האפליקציה שלך כבר מוכנה! היא תבקש URLs חתומים מהשרת החדש.

## 🆘 **בעיות נפוצות:**

1. **"Missing environment variables"** → בדוק את ה-R2 credentials
2. **"Invalid path"** → ודא שה-path מתחיל ב-`videos/`
3. **Rate limit** → המתן 15 דקות או הגדל את הגבול

## 📞 **תמיכה:**

אם יש בעיות:
1. בדוק את ה-logs ב-Vercel
2. ודא שה-R2 credentials נכונים
3. בדוק עם health endpoint

---

**🎉 זהו! השרת שלך מוכן לפריסה!**
