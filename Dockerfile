# STAGE 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Accept Build Args
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# 2. Copy ONLY package.json (since you don't have package-lock.json)
COPY package.json ./

# 3. Use 'npm install' (will generate a temporary lockfile inside the container)
RUN npm install

# 4. Copy everything else and build
COPY . .
RUN npm run build

# STAGE 2: Runner (Nginx)
FROM nginx:stable-alpine

# Create custom project directory
RUN mkdir -p /usr/share/nginx/front-end-ui

# Copy build output to project directory
COPY --from=builder /app/dist/ /usr/share/nginx/front-end-ui/

# Copy your custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
