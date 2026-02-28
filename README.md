# Qala Labs - Production Deployment

## Hostinger Setup
1. Upload all files to your Hostinger Node.js application directory.
2. Ensure `process.env.PORT` is respected by the host.
3. Run the following commands via SSH:
   ```bash
   npm ci
   npm run build
   pm2 start server.js --name "qala-labs"
   ```

## Environment Variables
Set these in your Hostinger Panel:
- `DATABASE_URL`: MySQL connection string for Prisma.
- `SUPABASE_URL`: Your Supabase project URL.
- `SUPABASE_ANON_KEY`: Your Supabase anon key.
- `GA4_MEASUREMENT_ID`: Google Analytics ID.
- `N8N_WEBHOOK_URL`: Endpoint for lead automation.

## Scripts
- `npm run import-xml`: Run the WordPress XML importer script.