
docker-compose up --build
docker ps
docker exec -it f96e2466755a /bin/sh
npm run dev

npm run build

chown -R node:node /src/build
chmod -R 755 /src/build

npx serve -s build -l 3002
    docker exec -it 72de8ae03ff3 /bin/sh
npx cloudflared tunnel --protocol http2 --url http://localhost:3002
