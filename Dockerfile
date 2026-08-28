# ---- Base image ----
FROM node:18-alpine

# ---- App directory ----
WORKDIR /usr/src/app

# ---- Install dependencies first (better layer caching) ----
COPY package*.json ./
RUN npm install --omit=dev

# ---- Copy the rest of the source code ----
COPY . .

# ---- Expose the port the app runs on ----
EXPOSE 3000

# ---- Environment ----
ENV NODE_ENV=production

# ---- Start the app ----
CMD ["npm", "run", "start"]
