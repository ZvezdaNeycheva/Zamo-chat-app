
docker-compose up --build
docker ps
docker exec -it 194218bdfee1 /bin/sh
npm run dev

npm run build

chown -R node:node /src/build
chmod -R 755 /src/build

npx serve -s build -l 3005
    docker exec -it 72de8ae03ff3 /bin/sh
npx cloudflared tunnel --protocol http2 --url http://localhost:3005
