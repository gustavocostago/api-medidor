FROM node:18-alpine

WORKDIR /app
COPY . .

COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build
RUN npx prisma generate

CMD ["sh", "-c", "npx prisma db push && node build/app.js"]
EXPOSE 25000