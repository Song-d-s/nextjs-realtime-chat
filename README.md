# Realtime Chat

Following the course building and deploying a realtime chat app on Next.js

## [Demo](https://nextjs-realtime-chat-tawny.vercel.app/)
![ezgif com-video-to-gif (3)](https://user-images.githubusercontent.com/110221789/235443437-7dfd1317-1c6e-4431-9a88-ee6120175a2c.gif)
![ezgif com-resize](https://user-images.githubusercontent.com/110221789/235443513-4dfb431a-8336-48ec-88b4-be75a1306737.gif)

## Tech Stacks

- Next.js
- Tailwind CSS
- Typescript
- Redis

## Features

- Google authentication on NextAuth
- Fetching data from Redis
- Realtime chat using Pusher
- Reusable components with class-variance-authority and clsx
- Mobile responsive layout with Tailwind CSS
- Middleware for Next.js API routes

## Notes

### Initial Setup

- Run dev server `npm run dev`
- Downgrading typescript version (if you need)
  1. Edit `package.json` to change `typescript` version.
  ```json
  "typescript": "4.9.5"
  ```
  2. Enter the commands below
  ```powershell
  Remove-Item -Recurse -Force node_modules
  Remove-Item package-lock.json
  npm install
  ```
- Creating user snippets
  `File> Preference> Configure user snippets> New Global Snippets file...`
  ```ts
  "Typescript React Function Component": {
    "prefix": "fc",
    "body": [
      "import { FC } from 'react'",
      "",
      "interface ${TM_FILENAME_BASE/\\w+/${0:/capitalize}/g}Props {",
      "  $1",
      "}",
      "",
      "const ${TM_FILENAME_BASE/\\w+/${0:/capitalize}/g}: FC<${TM_FILENAME_BASE/\\w+/${0:/capitalize}/g}Props> = ({$2}) => {",
      "  return <div>${TM_FILENAME_BASE/\\w+/${0:/capitalize}/g}</div>",
      "}",
      "",
      "export default ${TM_FILENAME_BASE/\\w+/${0:/capitalize}/g}"
    ],
    "description": "Typescript React Function Component"
  },
  ```
- [Class Variance Authority](https://cva.style/docs/getting-started)
  `npm i class-variance-authority`
- Lucide for icons `npm install lucide-react`
- Conditional className optimized for tailwindcss
  `npm install clsx tailwind-merge`
- [React Hot Toast](https://react-hot-toast.com/) `npm install react-hot-toast`

### Database & Auth

- [Upstash](https://upstash.com/) `npm install @upstash/redis`
- [NextAuth.js](https://next-auth.js.org/)

  ```bash
  npm install --save next-auth
  npm install @next-auth/upstash-redis-adapter
  ```

- Redirect URIs for OAuth Credentials `http://localhost:3000/api/auth/callback/google`
- Better-looking tailwind forms `npm install @tailwindcss/forms`
- react-hook-form, Zod for validation and axios
  `npm install react-hook-form @hookform/resolvers zod axios`

### Realtime

- [Pusher](pusher.com) `npm install pusher pusher-js`
- encoding for following error `npm install encoding`
  ```
  Module not found: Can't resolve 'encoding' in 'C:\coding\github\nextjs-realtime-chat\node_modules\node-fetch\lib'
  ```

### Mobile View

- Import component from headlessui `npm install @headlessui/react`

### Miscellaneous

- date-fns manipulating JS dates `npm install date-fns`
- nanoid string generator `npm install nanoid`
- autosizing textarea `npm install react-textarea-autosize`
- [react-loading-skeleton](https://www.npmjs.com/package/react-loading-skeleton) `npm install react-loading-skeleton`

## Refernces

- `resolver` for react-hook-form
  [Doc](https://react-hook-form.com/api/useform/#resolver)
- NextAuth ClientAPI [Doc](https://next-auth.js.org/getting-started/client#withauth)
- Reference on `Promise.all()` [stackoverflow](https://stackoverflow.com/questions/30362733/promise-all-and-foreach)
- Redis commands [Doc](https://redis.io/commands)
- `<pre>` tag [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre)
- Youtube lecture [link](https://www.youtube.com/watch?v=NlXfg5Pxxh8)
