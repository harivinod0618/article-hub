The Better India Comments – MERN Stack Project
This is a full-stack MERN application with Firebase Authentication that allows:

Admins to upload posts and manage comments.

Users to sign in, view, like, and comment on posts.

Admin and user dashboards with different access levels.

For admin Login you have to use the code   "0618"  and login using the gmail by clicking the signin with google. 

🚀 Features
✅ Admin Panel:
Protected access via admin email or secret code (0618).

Upload post with image and content.

View uploaded posts with edit/delete options.

View and moderate user comments.

✅ User Panel:
Google sign-in via Firebase Authentication.

First-time profile setup: name, student ID, age, and image.

View posts uploaded by admin.

Like posts.

Comment on posts.

Tabs to view profile, liked posts, and commented posts.

🔐 Login Instructions
👤 User Login
Open the project in your browser.

Click "Sign in with Google".

If it's your first time logging in, you'll be asked to update your profile (name, ID, age, image).

Once the profile is complete, you'll be redirected to the User Dashboard.

🛠️ Admin Login
You have two ways to access the Admin Dashboard:

Option 1: Direct Admin Email
If you're using the email hari1018vinod@gmail.com, just click "Sign in with Google".

You'll be taken directly to the Admin Dashboard.

Option 2: Secret Admin Code
Before signing in, enter the admin code 0618 in the input field provided on the homepage.

Click "Verify Code".

Then sign in with any Gmail account.

You’ll be redirected to the Admin Dashboard.

📦 How to Run the Project
Backend Setup
Navigate to the backend directory:

bash
Copy
Edit
cd backend
Install dependencies:

bash
Copy
Edit
npm install
Start the backend server:

bash
Copy
Edit
node index.js
Frontend Setup
Navigate to the frontend directory:

bash
Copy
Edit
cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the React frontend:

bash
Copy
Edit
npm start
The project will be live at: http://localhost:3000

Tech Stack
Frontend: React, Tailwind CSS (optional), React Router

Backend: Node.js, Express

Database: MongoDB

Authentication: Firebase Google Sign-In

File Upload: Multer




📂 Folder Structure
css
Copy
Edit





📦 better-india-comments
│
├── 📂 backend
│   ├── 📂 models
│   │   ├── Comment.js
│   │   ├── post.js
│   │   └── User.js
│   │
│   ├── 📂 routes
│   │   ├── comments.js
│   │   ├── posts.js
│   │   └── users.js
│   │
│   ├── 📂 uploads                # Uploaded images from admin
│   ├── .env                     # Contains MONGO_URI, PORT, etc.
│   ├── server.js                # Main Express server
│   ├── package.json
│   └── package-lock.json
│
├── 📂 frontend
│   ├── 📂 public
│   │   └── index.html           # Default HTML template
│   │
│   ├── 📂 src
│   │   ├── 📂 components
│   │   │   ├── AdminDashboard.css
│   │   │   ├── AdminDashboard.js
│   │   │   ├── CommentForm.jsx
│   │   │   ├── CommentsList.jsx
│   │   │   ├── UpdateProfile.js
│   │   │   ├── UploadPost.css
│   │   │   ├── UploadPost.js
│   │   │   ├── UserDashboard.css
│   │   │   ├── UserDashboard.js
│   │   │   ├── ViewComments.js
│   │   │   ├── ViewPosts.css
│   │   │   └── ViewPosts.js
│   │   │
│   │   ├── 📂 images
│   │   │   └── google-logo.png
│   │   │
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── axiosConfig.js
│   │   ├── firebase.js
│   │   ├── index.js
│   │   ├── Login.js
│   │   ├── package.json
│   │   └── package-lock.json
│   │
│   └── README.md                # Usage guide, login details, setup
│
└── 📄 README.md                  # Root README for the full project




📌 Notes
Only the admin with verified code or authorized email can access post upload/edit/delete features.

Regular users are prompted to complete their profile before accessing content.

Admins and users are redirected appropriately after login.