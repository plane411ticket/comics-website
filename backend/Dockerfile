# Sử dụng Python 3.9 làm base image
FROM python:3.9

# Đặt thư mục làm việc
WORKDIR /app

# Copy file requirements.txt và cài đặt thư viện
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ mã nguồn vào container
COPY . .

# Chạy server Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
