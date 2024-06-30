import app from "./app.js";
import connectDB from "./config/db.js"
const PORT = process.env.PORT || 500

connectDB();

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));