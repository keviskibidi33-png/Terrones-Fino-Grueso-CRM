# Build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Coolify / Docker build args
ARG VITE_API_URL=https://api.geofal.com.pe
ARG VITE_CRM_LOGIN_URL=https://crm.geofal.com.pe/login
ARG VITE_MODULE_SLUG=terrones-fino-grueso
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CRM_LOGIN_URL=$VITE_CRM_LOGIN_URL
ENV VITE_MODULE_SLUG=$VITE_MODULE_SLUG

RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
