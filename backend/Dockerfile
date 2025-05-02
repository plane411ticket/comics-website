# Sử dụng Python 3.9 làm base image
FROM python:3.9

# Đặt thư mục làm việc
WORKDIR /app

# Cài đặt các công cụ cần thiết
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && apt-get clean

# Copy file requirements.txt và cài đặt thư viện
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose cổng 8000 để truy cập server Django
EXPOSE 8000

# Chạy server Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
