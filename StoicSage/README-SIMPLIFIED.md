# StoicSage Simplified

This is a simplified version of the StoicSage website focusing only on the quote generator and daily stoic practices features. The application has been streamlined to run easily on Windows machines.

## How to Run on Windows

1. **Download the Files**
   - Download all the files from this repository

2. **Install Dependencies**
   - Open Command Prompt or PowerShell in the project directory
   - Run: `npm install`

3. **Build the Frontend**
   - Run: `npm run build`

4. **Start the Server**
   - Run: `npm start`
   - The application will be available at: http://localhost:5000

## Simplified Features

This streamlined version includes:

1. **Stoic Quote Generator** - Get random quotes from famous Stoic philosophers
2. **Daily Stoic Practices** - Access stoic practices you can incorporate into your daily life

## File Structure

- `server-simple.js` - The simplified Express server with all the necessary endpoints
- `simple-package.json` - Rename this to `package.json` before running the app
- `client/` - Contains all the frontend React code (unchanged from the original)

## Using the Application

1. Visit http://localhost:5000 in your browser
2. Navigate through the website to access the Quote Generator and Daily Stoic Practices
3. The visual appearance remains the same as the original version

## Troubleshooting Windows Issues

If you encounter any issues on Windows:

1. **Port in Use**
   - If port 5000 is in use, you can change the port in `server-simple.js`:
   ```js
   const PORT = process.env.PORT || 3000; // Change 5000 to another port
   ```

2. **Node.js Version**
   - This app works best with Node.js version 16 or higher
   - Download from: https://nodejs.org/

3. **Building Issues**
   - If you have trouble with the build step, you can use the pre-built files:
   - Skip the build step and just run: `npm start`