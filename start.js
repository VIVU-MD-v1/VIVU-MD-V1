FROM node:lts-buster
RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/i-nrl/inrl-bot-md /beta
WORKDIR /beta
RUN npm install
CMD ["node", "index.js"]
