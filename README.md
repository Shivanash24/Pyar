# Premium Romantic Proposal Website

A highly cinematic, luxury 3D proposal website built with Next.js 15, Framer Motion, GSAP, and React Three Fiber.

## Features
- **Passcode Protection:** Keep the surprise safe.
- **Cinematic 3D Scenes:** Immersive floating hearts, envelopes, and night skies.
- **Interactive Love Letter:** Beautiful typography and scrollable text.
- **Memory Gallery:** A masonry-style gallery of your favorite moments together.
- **Final Celebration:** Confetti and glowing heart animation when they click "Yes".
- **Admin Settings:** Change text, passcodes, and upload photos directly from the browser at `/admin`.

## Getting Started

First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The default passcode is `143`.

## Deployment to Vercel

This project is fully ready for Vercel deployment without any backend requirements since it utilizes `localStorage` for dynamic content.

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. Framework Preset will be automatically detected as **Next.js**.
5. Click **Deploy**.

## Customizing Assets
Before deploying, it's highly recommended to replace the placeholder photos in `public/memories/` with your own images:
- `public/memories/photo1.jpg`
- `public/memories/photo2.jpg`
- `...`
- `public/memories/cover.jpg` (For the passcode screen polaroid)

You can also drop a romantic audio file named `background.mp3` inside `public/audio/`.

## Accessing the Admin Dashboard
Once deployed (or locally), visit `your-domain.com/admin` to customize the Passcode, Letter, and upload photos from your device.

**Note:** Photos uploaded via the Admin dashboard are stored in browser `localStorage`. For permanent images visible to your partner on *their* device, make sure to replace the files in `public/memories/` before deploying.
