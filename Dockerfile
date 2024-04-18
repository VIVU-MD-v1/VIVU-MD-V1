FROM node:lts-buster
RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/VIVU-MD-v1/VIVU-MD-V1/tree/main
WORKDIR /beta
RUN npm install
CMD ["node", "index.js"]
