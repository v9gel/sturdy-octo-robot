import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname,'..','.env'),
});
const port = parseInt(process.env.PORT_FRONTEND);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port,
  }
})
