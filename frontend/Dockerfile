# Sử dụng Node.js làm base image
FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Copy file package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose cổng 5173 để chạy Vite
EXPOSE 5173

# Chạy server Vite
CMD ["npm", "run", "dev", "--", "--host"]