#STAGE 1:
FROM --platform=linux/arm64 node:19-alpine3.16 as BUILD

WORKDIR /app

# Copy build files
COPY package.json tsconfig.base.json yarn.lock ./

# Copy package.json & tsconfig.json of each workspace
COPY packages/client/*.json ./packages/client/
COPY packages/server/*.json ./packages/server/

ENV NODE_ENV production

# Install dependencies
SHELL ["/bin/bash", "-c"]

RUN yarn install

RUN npm install modclean -g && \
    rm -rf node_modules/*/test/ node_modules/*/tests/ && \
    npm prune && \
    ls -la && \ 
    pwd && \
    modclean -n default:safe --run && \
    modclean -p "packages/client" -n default:safe --run && \
    modclean -p "packages/server" -n default:safe --run && \
    npm uninstall -g modclean

# Copy code files
COPY . .

# Copy the public folder specifically for the client
COPY packages/client/public packages/client/public

RUN ls -la /app/packages/client

# Build all workspaces
RUN yarn client build
RUN yarn server build

#STAGE 2:
FROM --platform=linux/arm64 node:19-alpine3.16 

WORKDIR /app

# Copy necessary files from build stage
COPY --from=BUILD /app/package.json ./
COPY --from=BUILD /app/yarn.lock ./
COPY --from=BUILD /app/packages/client/package.json ./packages/client/
COPY --from=BUILD /app/packages/server/package.json ./packages/server/
COPY --from=BUILD /app/packages/client/build ./packages/client/build
COPY --from=BUILD /app/packages/server/build ./packages/server/build

# Copy node_modules from build stage
COPY --from=BUILD /app/node_modules ./node_modules
COPY --from=BUILD /app/packages/client/node_modules ./packages/client/node_modules
COPY --from=BUILD /app/packages/server/node_modules ./packages/server/node_modules


# Start server
CMD ["yarn", "workspace", "@replaylist/server", "start"]