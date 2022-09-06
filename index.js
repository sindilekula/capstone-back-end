const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors
app.use(express.static("public"));
app.use(cors({
  origin: ['http://127.0.0.1:8080', 'http://localhost:8080'],
  credentials: true
}));
// credentials will allow you to access the cookie on your fetch(url, 
{
credentials: 'include'
}

// Import routes
const userRoute = require("./routes/userRoute");
const productsRoute = require("./routes/productsRoute");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "index.html");
});

app.use("/users", userRoute);
app.use("/products", productsRoute);

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on port ${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});
