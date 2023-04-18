cd server || exit
uvicorn api:app --reload &
cd ../client/src || exit
npm run dev