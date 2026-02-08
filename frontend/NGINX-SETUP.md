# Nginx Setup Guide for rolit.in

## Files Created

- `nginx.conf` - Production configuration with SSL/HTTPS
- `nginx-simple.conf` - Simple HTTP-only configuration for development/testing

## Prerequisites

1. Build your React app:
   ```bash
   npm run build
   ```
   This creates the `dist` directory with your production-ready files.

2. Install Nginx (if not already installed):
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nginx

   # CentOS/RHEL
   sudo yum install nginx
   ```

## Setup Instructions

### Option 1: Simple HTTP Setup (Development/Testing)

1. Copy the simple configuration:
   ```bash
   sudo cp nginx-simple.conf /etc/nginx/sites-available/rolit.in
   ```

2. Create a symbolic link:
   ```bash
   sudo ln -s /etc/nginx/sites-available/rolit.in /etc/nginx/sites-enabled/
   ```

3. Test the configuration:
   ```bash
   sudo nginx -t
   ```

4. Reload Nginx:
   ```bash
   sudo systemctl reload nginx
   ```

5. Update your `/etc/hosts` for local testing (if needed):
   ```
   127.0.0.1   rolit.in www.rolit.in
   ```

### Option 2: Production HTTPS Setup

1. **Get SSL Certificate** (using Let's Encrypt):
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot certonly --nginx -d rolit.in -d www.rolit.in
   ```

2. **Update SSL paths in nginx.conf** if your certificates are in a different location:
   - Default Let's Encrypt path: `/etc/letsencrypt/live/rolit.in/`
   - Update these lines in `nginx.conf`:
     ```nginx
     ssl_certificate /etc/letsencrypt/live/rolit.in/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/rolit.in/privkey.pem;
     ```

3. Copy the production configuration:
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/rolit.in
   ```

4. Create a symbolic link:
   ```bash
   sudo ln -s /etc/nginx/sites-available/rolit.in /etc/nginx/sites-enabled/
   ```

5. Test the configuration:
   ```bash
   sudo nginx -t
   ```

6. Reload Nginx:
   ```bash
   sudo systemctl reload nginx
   ```

## Important Notes

### Build Path
The configuration assumes your build output is at:
```
/home/kavipuradal/Cotent-creator-copilot/frontend/dist
```

If you deploy elsewhere, update the `root` directive in the nginx configuration.

### DNS Configuration
Make sure your domain `rolit.in` points to your server's IP address:
- A record: `rolit.in` → Your server IP
- A record: `www.rolit.in` → Your server IP

### Firewall
Ensure ports 80 and 443 are open:
```bash
# UFW (Ubuntu)
sudo ufw allow 'Nginx Full'

# firewalld (CentOS)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### Auto-renewal for SSL (Let's Encrypt)
Certbot automatically sets up renewal. Test it with:
```bash
sudo certbot renew --dry-run
```

## Troubleshooting

1. **Check Nginx status:**
   ```bash
   sudo systemctl status nginx
   ```

2. **View error logs:**
   ```bash
   sudo tail -f /var/log/nginx/rolit.in-error.log
   ```

3. **View access logs:**
   ```bash
   sudo tail -f /var/log/nginx/rolit.in-access.log
   ```

4. **Test configuration:**
   ```bash
   sudo nginx -t
   ```

5. **Reload after changes:**
   ```bash
   sudo systemctl reload nginx
   ```

## Features Included

✅ HTTP to HTTPS redirect
✅ SSL/TLS configuration
✅ Gzip compression
✅ Client-side routing support (React SPA)
✅ Static asset caching
✅ Security headers
✅ WWW subdomain support
✅ Logging configuration

## Deployment Workflow

After making changes to your React app:

1. Build the application:
   ```bash
   npm run build
   ```

2. The `dist` folder is automatically updated

3. Nginx will serve the new files immediately (no reload needed for static files)
