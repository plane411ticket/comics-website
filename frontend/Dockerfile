# # Sử dụng Node.js Alpine image nhỏ gọn
# FROM node:20

# # Tạo thư mục làm việc trong container
# WORKDIR /app

# # Copy file cấu hình package
# COPY package.json package-lock.json ./

# # Cài dependencies
# RUN npm install

# # Copy phần còn lại của source code
# COPY . .
# EXPOSE 5174
# # Chạy dev server (Vite, React, Next.js...)
# CMD ["npm", "run", "dev"]

# Sử dụng image nhỏ gọn
FROM node:20-alpine AS builder

# Tạo thư mục làm việc
WORKDIR /app

# Cài dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code và build
COPY . .
RUN npm run build

# -------------------------------------------------------
# Tạo một image mới chỉ chứa build (nếu dùng static file)
FROM nginx:alpine

# Copy thành phẩm vào nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# (Tùy chọn) Copy nginx config nếu bạn có
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
