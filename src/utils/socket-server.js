import { Server } from "socket.io";
import { MessageModel } from '../DAO/models/db/msgs.model.db.js';

export function connectSocket(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', (socket) => {
    socket.on('msg_front_to_back', async (msg) => {
      const msgCreated = await MessageModel.create(msg);
      const msgs = await MessageModel.find({}); 
      socketServer.emit('msg_back_to_front', msgs);
    });
  });

  socketServer.on("connection", (socket) => {
    socket.on("new-product-created", async (newProduct) => {
      try {
        await productApiService.addProduct(newProduct);

        let allProducts = await productApiService.getProducts();
        socketServer.emit("all-the-products", allProducts);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("delete-product", async (iidd) => {
      try {
        await productApiService.deleteProduct(iidd);

        let allProducts = await productApiService.getProducts();
        console.log("socket server del back", allProducts)
        socketServer.emit("all-the-products", allProducts);
      } catch (error) {
        console.log(error);
      }
    });
  });
}