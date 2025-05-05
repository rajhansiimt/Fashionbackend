# Step 1: Use official Node image
FROM node:18

# Step 2: Create app directory inside container
WORKDIR /app

# Step 3: Copy only package files first to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy rest of your app
COPY . .

# Step 6: Expose port your app runs on (change if your app uses a different one)
EXPOSE 3000

# Step 7: Start the app
CMD ["node", "server.js"]
