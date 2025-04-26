# Manga & Novel & Audio Platform
---

## I. Overview
This project is a full-featured online platform where users can enjoy:

- 📖 Novels (text-based stories)

- 📚 Comics (manga-style graphic stories)

- 🎧 Audio Books (listen to narrated stories)

The system supports different content types seamlessly and offers a smooth reading and listening experience.

Additionally, it features a comprehensive user account system with VIP membership benefits, including premium content access and personalized user experiences.
## II. How to use?
### 1. Install Required Software

Before starting, install the following:

- **Python** (>=3.8)
- **Node.js** (>=18) and npm (>=9)
- **MySQL** (>=8.0)
- **Git**
- **WSL** (if using Windows) with Ubuntu 22.04

### **1.1 Install WSL (if using Windows)**
If you're on Windows, install **Windows Subsystem for Linux (WSL)**:
```sh
wsl --install
```

### **1.2 Install Ubuntu (for WSL Users)**
If you have multiple Ubuntu versions, ensure you use the correct one:
```sh
wsl -l -v  # List installed WSL distributions
wsl -s Ubuntu-22.04  # Set the correct Ubuntu version as default
```

### **1.3 Install Git**
```sh
sudo apt update && sudo apt install git -y
```

### **1.4 Install Python and Pip**
```sh
sudo apt install python3 python3-pip -y
```

### **1.5 Install Node.js and npm**
Check your Node.js version first:
```sh
node -v  # If version is <16, upgrade
```
If Node.js is outdated, install an updated version:
```sh
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```
Verify installation:
```sh
node -v  # Should be v18+
npm -v
```

---

## 2. Set Up the Project Directory

### **2.1 Create the Project Directory**
```sh
mkdir comics-website
cd comics-website
```

### **2.2 Initialize Git Repository**
```sh
git init
```

---

## 3. Setup Django Backend

### **3.1 Install Django and Dependencies**
```sh
pip install django djangorestframework mysqlclient Pillow
```

### **3.2 Create Django Project and Apps**
```
server/
    manage.py
    server/
        settings.py
        urls.py
        wsgi.py
    chapter/
    manga/
    novel/
    audio/
    genres/
    users/
```

```sh
django-admin startproject server .
python manage.py startapp chapter
python manage.py startapp manga
python manage.py startapp novel
python manage.py startapp audio
python manage.py startapp genres
python manage.py startapp users
```

### **3.3 Configure MySQL Database**
Edit `server/settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```
Ensure MySQL is running before proceeding.


### **3.4.1 Fix Errors where correct password is mistakenly rejected due to incorrect attempt detection.
Verify if MySQL is running:
```sh
sudo service mysql status
```
If it is not running, start the device
```sh
sudo service mysql start
```

### **3.4.2 Fix Errors When Running Migrations**
If you get an **access denied error**:
```sh
sudo mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_db_password';
FLUSH PRIVILEGES;
EXIT;
```

### **3.5 Run Migrations**
```sh
python manage.py makemigrations
python manage.py migrate
```

### **3.6 Create a Superuser**
```sh
python manage.py createsuperuser
```

### **3.7 Run the Server**
```sh
python manage.py runserver
```

---

## 4. Setup React Frontend

### **4.1 Install Vite (React with TypeScript)**
```sh
npx create-vite@latest frontend --template react-ts
cd frontend
npm install
npm install axios react-router-dom
npm install react-icons
```

### **4.2 Create Directory Structure**
```sh
mkdir -p src/{components,screens,routes,api}
```

### **4.3 Start the Frontend**
```sh
npm run dev
```

---

## 5. Initialize Git and Push to GitHub

### **5.1 Create .gitignore**
```sh
echo "node_modules/\nfrontend/node_modules/\nvenv/\n__pycache__/\n.env" > .gitignore
```

### **5.2 Add and Push to GitHub**
```sh
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

---

