# ? -------------------------
# ? Builder: Build the App
# ? -------------------------

FROM node:18-alpine as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

# copy sources
COPY src ./src
COPY static ./static
COPY *.js ./
COPY *.ts ./
COPY tsconfig.json ./

# no need to waste time installing pnpm globally, we only using it once
RUN npx pnpm -r i --frozen-lockfile

# compile
RUN npx pnpm build

# ? -------------------------
# ? Runner: Production to run
# ? -------------------------

FROM node:18-alpine as runner

LABEL name "espresso-generator"

WORKDIR /app

USER node
ENV NODE_ENV production

# Copy built files
COPY --chown=node:node --from=builder /app/build ./build
COPY --chown=node:node --from=builder /app/package.json ./package.json
COPY espresso/espresso-alpine-amd64 ./espresso/espresso-alpine-amd64

ENV HOST=0.0.0.0
ENV ORIGIN=https://espresso.leomotors.me
ENV PORT=5204
ENV ESPRESSO_PATH=espresso-alpine-amd64

EXPOSE 5204

CMD ["node", "build/index.js"]
