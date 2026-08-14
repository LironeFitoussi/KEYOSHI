import { setServers } from "node:dns";
import { isIP } from "node:net";

let configured = false;

export function configureMongoDns() {
  if (configured) return;
  configured = true;

  const configuredServers = process.env.MONGODB_DNS_SERVERS;
  if (!configuredServers) return;

  const servers = configuredServers
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (servers.length === 0 || servers.some((server) => isIP(server) === 0)) {
    throw new Error("MONGODB_DNS_SERVERS must contain comma-separated IP addresses.");
  }

  setServers(servers);
}
