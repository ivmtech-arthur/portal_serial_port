/* 
NODE_ENV=development
BUILD_PATH_MODE=development
APP_PREFIX=${APP_PREFIX}
SHOW_GRID_GUIDE=true
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_TTL=1
APP_URL=http://localhost:1111
#API_URL=$LOCAL_HOST:1337/api
API_URL=https://uat-api.gdmoment.com/api
BACKEND_URL=http://app:3000
PAYMENT_URL=https://payment-sandbox.pa-sys.com/app/page/5c3fa8b4-be0c-455e-a7b1-05b19d0bf813
*/

module.exports = {
    BACKEND_URL: process.env.BACKEND_URL,
    NODE_ENV: process.env.NODE_ENV,
    PAYMENT_URL: process.env.PAYMENT_URL,
    API_URL: process.env.API_URL || 'http://18.166.75.74:1337',
    APP_URL: process.env.APP_URL,
    GTM_ID: process.env.GTM_ID,
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  }
  