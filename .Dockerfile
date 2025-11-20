FROM oven/bun:1-alpine
WORKDIR /app

# Install tzdata and set timezone
RUN apk add --no-cache tzdata
ENV TZ=America/Los_Angeles

# Install ngrok in Alpine Linux
RUN apk add --no-cache curl unzip && \
    curl -sSL https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-stable-linux-amd64.zip -o ngrok.zip && \
    unzip ngrok.zip && \
    mv ngrok /usr/local/bin/ && \
    rm ngrok.zip && \
    chmod +x /usr/local/bin/ngrok

COPY package.json bun.lock* ./
RUN bun install
COPY . .

RUN bun run build
EXPOSE 3000

CMD ["bun", "start"]
