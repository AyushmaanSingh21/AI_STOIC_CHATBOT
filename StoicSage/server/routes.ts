import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema } from "@shared/schema";
import { getBotResponse } from "../client/src/lib/utils";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ message: "Invalid message format" });
      }
      
      // Generate bot response
      const botResponse = getBotResponse(message);
      
      // Save the message in storage
      const botMessage = await storage.createChatMessage({
        isUser: false,
        text: botResponse,
      });
      
      return res.status(200).json(botMessage);
    } catch (error) {
      console.error("Error processing chat message:", error);
      return res.status(500).json({ message: "Failed to process your message" });
    }
  });

  // Get chat history
  app.get("/api/chat/history", async (req, res) => {
    try {
      const messages = await storage.getChatMessages();
      return res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      return res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
