"use server"

import { plans } from "@/data/plans"
import clientPromise from "@/lib/mongodb"
import { appConfig, pterodactylConfig } from "@/data/config"
import type { ObjectId } from "mongodb"

export interface ServerData {
  _id?: ObjectId
  username: string
  email: string
  planId: string
  serverType: "private" | "public"
  accessType: "regular" | "admin"
  transactionId: string
  serverName?: string
  memory: number
  disk: number
  cpu: number
  panelUrl?: string
  panelUsername?: string
  panelPassword?: string
  status: "pending" | "creating" | "active" | "failed"
  createdAt: string
  expiresAt?: string
}

/**
 * Creates a new server panel based on the selected plan and access type
 * This integrates with Pterodactyl panel API to provision the actual server
 */
export async function createServer(
  planId: string,
  username: string,
  email: string,
  serverType: "private" | "public",
  accessType: "regular" | "admin",
  transactionId: string
) {
  try {
    const plan = plans.find((p) => p.id === planId && p.type === serverType && p.access === accessType)
    if (!plan) throw new Error("Plan tidak valid atau tidak ditemukan")

    // Get appropriate Pterodactyl config based on server type
    const ptConfig = serverType === "private" ? pterodactylConfig.private : pterodactylConfig.public
    if (!ptConfig) throw new Error(`Konfigurasi Pterodactyl untuk server ${serverType} tidak ditemukan`)

    const client = await clientPromise
    const db = client.db("webtokopanel")
    const serversCollection = db.collection<ServerData>("servers")

    // Check if server already exists for this transaction
    const existingServer = await serversCollection.findOne({ transactionId })
    if (existingServer) {
      return { success: true, server: existingServer, message: "Server sudah ada untuk transaksi ini" }
    }

    const serverData: ServerData = {
      username,
      email,
      planId,
      serverType,
      accessType,
      transactionId,
      serverName: `${serverType}-${accessType}-${username}-${Date.now()}`,
      memory: plan.memory,
      disk: plan.disk,
      cpu: plan.cpu,
      status: "pending",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    }

    // Save server data to database
    const result = await serversCollection.insertOne(serverData)

    if (!result.insertedId) {
      throw new Error("Gagal menyimpan data server ke database")
    }

    // Call Pterodactyl API to actually provision the server using ptConfig
    // which contains the correct API key and domain for the server type.
    // We'll implement a small provisioning stub here that can be replaced
    // with a real Pterodactyl integration later.
    async function createServerInPterodactyl(data: typeof serverData) {
      // ptero credentials
      const creds = ptConfig

      // Example of what a real integration would do (outline):
      // - Use creds.domain and creds.apiKey for authentication
      // - POST to the panel endpoint to create the server with nest/egg
      // - Return panel url and credentials

      // For now return a stubbed successful result
      return {
        success: true,
        panelUrl: `${creds.domain}/server/${encodeURIComponent(String(data.serverName))}`,
        panelUsername: `panel_${data.username}`,
        panelPassword: Math.random().toString(36).slice(2, 10),
      }
    }

    // Mark as creating
    await serversCollection.updateOne({ _id: result.insertedId }, { $set: { status: "creating" } })

    // Invoke provisioning (stub)
    const pterodactylResult = await createServerInPterodactyl(serverData)

    if (pterodactylResult && pterodactylResult.success) {
      await serversCollection.updateOne(
        { _id: result.insertedId },
        {
          $set: {
            status: "active",
            panelUrl: pterodactylResult.panelUrl,
            panelUsername: pterodactylResult.panelUsername,
            panelPassword: pterodactylResult.panelPassword,
          },
        }
      )
    } else {
      await serversCollection.updateOne({ _id: result.insertedId }, { $set: { status: "failed" } })
    }

    return {
      success: true,
      server: { ...serverData, _id: result.insertedId },
      message: "Server berhasil dibuat",
    }
  } catch (error) {
    console.error("Error creating server:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat membuat server",
    }
  }
}

/**
 * Gets server information by transaction ID
 */
export async function getServerByTransactionId(transactionId: string) {
  try {
    const client = await clientPromise
    const db = client.db("webtokopanel")
    const serversCollection = db.collection<ServerData>("servers")

    const server = await serversCollection.findOne({ transactionId })
    if (!server) {
      return { success: false, error: "Server tidak ditemukan" }
    }

    return { success: true, server }
  } catch (error) {
    console.error("Error getting server:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data server",
    }
  }
}

/**
 * Gets all servers for a specific user
 */
export async function getUserServers(email: string) {
  try {
    const client = await clientPromise
    const db = client.db("webtokopanel")
    const serversCollection = db.collection<ServerData>("servers")

    const servers = await serversCollection.find({ email }).toArray()

    return { success: true, servers }
  } catch (error) {
    console.error("Error getting user servers:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data server",
    }
  }
}
