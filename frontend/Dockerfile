# Sử dụng Node.js làm base image
FROM node:18-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json (nếu có)
COPY package.json package-lock.json* ./

# Cài đặt các package
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose port 3000 để chạy frontend
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"]
