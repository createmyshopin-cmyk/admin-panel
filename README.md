# admin-panel (Next.js Admin Console)

This is the web admin dashboard for the coin-based voice calling system. It provides platform metrics, system administration consoles, user profiles, creator records management, call history views, safety control reviews, and a complete financial dashboard (revenue analytics, coin sales tracking, top-creator statistics, payouts, and CSV reporting).

---

## Technical Stack
- **Framework**: Next.js (React / TypeScript)
- **Routing**: Next.js App Router
- **Styling**: Tailwind CSS / Vanilla CSS
- **APIs**: Rest API client connecting to `backend-api`

---

## Local Development Setup

### 1. Prerequisite Installations
- Node.js (v18.x or v20.x recommended)
- npm (v9.x or later)

### 2. Dependency Installation
Run the following command in the repository root directory:
```bash
npm install
```

### 3. Environment Variable Configuration
Create a `.env.local` file at the root:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
Update the API URL parameter to point to your live `backend-api` instance if querying production data.

### 4. Running the Development Server
To launch the server with hot reloading:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the console.

### 5. Compiling a Production Build
To verify the dashboard compiles successfully:
```bash
npm run build
```

---

## Production Deployment: Vercel

Vercel is the recommended host for hosting Next.js applications:

1. **Create Repository**: Push this code to a private GitHub repository.
2. **Setup Vercel Project**:
   - Go to [Vercel.com](https://vercel.com) and log in.
   - Click **Add New** → **Project** and import your repository.
3. **Configure Environment Variables**:
   - Add a key `NEXT_PUBLIC_API_URL` under the environment variables section.
   - Set the value to the production URL of your hosted `backend-api` (e.g., `https://your-api.railway.app/api`).
4. **Deploy**:
   - Click **Deploy**. Vercel will automatically compile, optimize, and deploy the application.
5. **Configuring Domain**:
   - In your Vercel project settings, navigate to the **Domains** tab to link a custom dashboard subdomain (e.g., `admin.yourdomain.com`).
