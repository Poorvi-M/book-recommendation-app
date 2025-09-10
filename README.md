# Book Recommendation App

A modern, cozy, full-stack web application for personalized book recommendations.

## Features

- User authentication (register, login, JWT)
- Browse, search, and view details for books
- Rate and review books
- Add books to your wishlist
- Admin can add/edit/remove books
- Clean, modern, cozy UI
- Theme toggle (light/dark)
- Responsive design

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Auth:** JWT

## Quick Start

1. **Clone the repository**
    ```bash
    git clone https://github.com/shreya-krj/book-recommendation-app.git
    cd book-recommendation-app
    ```

2. **Install dependencies**
    - Backend:  
      ```bash
      cd server
      npm install
      ```
    - Frontend:  
      ```bash
      cd ../client
      npm install
      ```

3. **Setup environment**
    - Create a `.env` file in `/server` with:
        ```
        MONGO_URI=mongodb://localhost:27017/bookrec
        JWT_SECRET=your_jwt_secret
        PORT=5000
        ```

4. **Run the app**
    - Start backend:  
      ```bash
      cd server
      npm start
      ```
    - Start frontend:  
      ```bash
      cd ../client
      npm start
      ```

5. **Open in browser**
    - Go to [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
book-recommendation-app/
├── client/      # React frontend
├── server/      # Express backend
├── README.md
└── ...
```

<!--## Want to deploy or customize?

- You can deploy backend and frontend to services like Heroku, Vercel, Netlify, or Render.
- Easily customize styles with Tailwind CSS and extend functionality as you wish!

---
