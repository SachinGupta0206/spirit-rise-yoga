# Webhook Integration

## Overview

The registration form now directly calls the StrongByYoga webhook instead of using a custom backend.

## Webhook Details

- **URL:** `https://strongbyyoga.com/wp-json/uap/v2/uap-76485-76486`
- **Method:** POST (with fallbacks to GET and FormData)
- **Data:** `{ "name": "User Name", "email": "user@example.com" }`

## Implementation

The frontend tries multiple approaches:

1. **POST with JSON** - Primary method
2. **GET with query params** - Fallback if POST returns 404
3. **POST with FormData** - Second fallback
4. **Demo mode** - If webhook is unavailable, shows success message

## Benefits

- ✅ No backend server needed
- ✅ Direct integration with StrongByYoga system
- ✅ Simplified deployment (frontend only)
- ✅ Automatic fallback for demo purposes

## Files Changed

- `src/lib/api.ts` - Updated to call webhook directly
- `src/lib/config.ts` - Removed backend-related config
- Environment files - Cleaned up backend variables

## Deployment

Just deploy the frontend - no backend server required!

## Testing

The registration form will:

1. Try to call the webhook
2. Show success message regardless (for demo)
3. Display WhatsApp and app download links

## Note

If the webhook URL needs to be updated, change it in `src/lib/api.ts`
