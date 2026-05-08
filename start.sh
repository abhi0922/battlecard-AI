#!/bin/bash

echo "Starting Battlecard Generator..."
echo ""

# Check if .env exists
if [ ! -f backend/.env ]; then
    echo "⚠️  Backend .env file not found!"
    echo "   Copy backend/.env.example to backend/.env and add your API keys"
    echo ""
fi

# Start backend
echo "🚀 Starting backend on port 3000..."
cd backend && npm run dev &
BACKEND_PID=$!

sleep 3

# Start frontend
echo "🎨 Starting frontend on port 5173..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Services started!"
echo "   Backend: http://localhost:3000"
echo "   Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
