# Use Node.js 20 on Debian Bookworm (for better compatibility)
FROM node:20-bookworm

# Install dependencies required by 'canvas'
RUN apt-get update && apt-get install -y \
  build-essential \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev \
  librsvg2-dev \
  pkg-config \
  python3 \
  && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app
COPY . .

# ---------------- BACKEND ----------------
WORKDIR /app/backend
RUN npm install
RUN npm rebuild canvas --build-from-source || echo "Canvas rebuild failed but continuing"

# ---------------- FRONTEND ----------------
WORKDIR /app/frontend
# Clean up npm cache and reinstall
RUN rm -rf node_modules package-lock.json && npm cache clean --force
# Retry npm install up to 3 times (for network hiccups)
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install --legacy-peer-deps || npm install --legacy-peer-deps || npm install --legacy-peer-deps


# Fix for Rolldown binding bug
ENV ROLLUP_USE_NATIVE=false
ENV VITE_ROLLUP_USE_NATIVE=false

RUN npm run build

# ---------------- STARTUP ----------------
WORKDIR /app/backend
EXPOSE 5000
CMD ["node", "index.js"]
