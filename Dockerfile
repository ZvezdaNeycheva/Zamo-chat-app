FROM node:18

WORKDIR /src
RUN chown -R node:node /src
USER node

COPY package*.json ./

ENV TURBOPACK=1
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm install

COPY . .

EXPOSE 3000

# Default command is shell so we can start Vercel and ngrok manually
#CMD ["/bin/sh"]
CMD ["npm", "run", "dev"]