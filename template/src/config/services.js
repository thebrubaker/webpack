export default {
  'algolia': {
    id: env('ALGOLIA_ID', ''),
    key: env('ALGOLIA_KEY', '')
  },
  'firebase': {
    'apiKey': env('FIREBASE_API_KEY'),
    'authDomain': env('FIREBASE_AUTH_DOMAIN'),
    'databaseURL': env('FIREBASE_DATABASE_URL'),
    'storageBucket': env('FIREBASE_STORAGE_BUCKET'),
    'messagingSenderId': env('FIREBASE_MESSAGING_SENDER_ID')
  },
  'laravel': {
    'base_url': env('LARAVEL_BASE_URL', ''),
    'client_id': env('LARAVEL_CLIENT_ID', ''),
    'client_secret': env('LARAVEL_CLIENT_SECRET', ''),
    'grant_type': env('LARAVEL_GRANT_TYPE', 'password'),
    'scope': env('LARAVEL_SCOPE', '*')
  }
}
