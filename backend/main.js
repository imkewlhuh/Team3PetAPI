import createServer from "./server.js";

const server = createServer();

server.listen(8080, () => {
    console.log("App is listening at http://localhost:8080");
});


// import createServer from "./server.js";

// const server = createServer();

// const port = process.env.PORT || 8080;

// server.listen(port, () => {
//   console.log("Server is listening at localhost:8080");
// });