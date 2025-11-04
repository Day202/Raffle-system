# Deploy to Vercel

This raffle system is configured for easy deployment to Vercel.

## Quick Deploy

### Option 1: Deploy from Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub (or your preferred method)
3. Click "Add New..." → "Project"
4. Import your repository
5. Vercel will auto-detect the settings
6. Click "Deploy"

### Option 2: Deploy from Command Line
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:5000`

## Features

✅ **Data Persistence**: All data (participants, prizes, winners) is saved to browser localStorage
✅ **No Backend Required**: Fully client-side application
✅ **Instant Deploy**: Works on Vercel, Netlify, or any static host
✅ **Responsive**: Works on desktop and mobile

## Data Storage

All data is stored in your browser's localStorage:
- `raffle-participants`: List of all participants
- `raffle-prizes`: Prize inventory and tracking
- `raffle-winners`: Complete winner history

**Note**: Data is stored locally in each browser. To share data across devices, you would need to add a database backend.

## File Structure

```
/
├── client/               # Frontend React app
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Dashboard, Participants, Prizes
│   │   └── hooks/       # localStorage hook
│   └── index.html
├── vercel.json          # Vercel configuration
└── package.json
```

## Customization

### Change Colors
Edit `client/src/index.css` to customize the purple theme colors.

### Modify Initial Data
Edit the default values in `client/src/App.tsx` (lines 35-47).

## Support

For issues or questions, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
