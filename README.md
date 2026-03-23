# Terrones Fino Grueso CRM

Microfrontend Vite/React para el formulario de Terrones Fino Grueso consumido por `iframe` desde `crm-geofal`.

## Dominio productivo

- `https://terrones.finogrueso.geofal.com.pe`

## Variables

- `VITE_API_URL=https://api.geofal.com.pe`
- `VITE_CRM_LOGIN_URL=https://crm.geofal.com.pe/login`
- `VITE_MODULE_SLUG=terrones-fino-grueso`

## Desarrollo

```bash
npm install
npm run dev
```

## Deploy Coolify

El `Dockerfile` ya compila este repo en la raiz `/` con `VITE_MODULE_SLUG=terrones-fino-grueso`, listo para `https://terrones.finogrueso.geofal.com.pe`.
