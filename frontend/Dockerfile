# ===== Build Stage =====
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ===== Production Stage =====
FROM nginx:alpine

# Удалим дефолтный конфиг, чтобы nginx просто отдавал build
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Добавим простой конфиг для SPA (React)
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { try_files $uri /index.html; } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
