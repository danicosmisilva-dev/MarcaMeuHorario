#!/bin/bash
# Setup script to inject environment variables for local development
# This script reads from .env.local and exports them to window before Angular runs

set -a
source .env.local 2>/dev/null || {
  echo "⚠️  .env.local file not found!"
  echo "Please copy .env.example to .env.local and fill in your Firebase credentials:"
  echo ""
  echo "  cp .env.example .env.local"
  echo ""
  exit 1
}
set +a

echo "✅ Environment variables loaded from .env.local"
echo "Starting development server with environment variables..."

# Start ng serve with environment variables available
exec npm start
