// SPDX-License-Identifier: MIT
// Copyright (c) 2026 xyTom

/**
 * Cloudflare WhoAmI: a Cloudflare Snippet for Rich IP & Geo Echo
 *
 * A tiny Cloudflare Snippet that echoes client IP, geo, network,
 * edge, TLS, and connection metadata as JSON or plain text.
 *
 * Canonical upstream:
 *   https://github.com/xyTom/cf-whoami-snippet
 *
 * Recommended rule:
 *   http.request.uri.path eq "/whoami"
 *
 * Notes
 * -----
 * • Uses built‑in `request.cf` object for geo, network, TLS & colo info.
 * • Includes headers like `CF-Connecting-IP`, `CF-Ray`, User‑Agent, etc.
 * • No caching (`Cache-Control: no-store`) so repeat calls always reflect
 *   current session/IP.
 * • Add `?fmt=text` to get a simple plain‑text block instead of JSON.
 */

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const fmt = url.searchParams.get("fmt")?.toLowerCase();

    // ─── Gather Client & Edge Metadata ───
    const hdr = request.headers;
    const cf  = request.cf || {};

    const ip  = hdr.get("CF-Connecting-IP") || null;
    const ipVer = ip && ip.includes(":") ? 6 : 4;

    const data = {
      ip:            ip,
      ip_version:    ipVer,

      city:          cf.city          ?? null,
      region:        cf.region        ?? null,
      region_code:   cf.regionCode    ?? null,
      postal_code:   cf.postalCode    ?? null,
      metro_code:    cf.metroCode     ?? null,
      country:       cf.country       ?? null,
      continent:     cf.continent     ?? null,
      latitude:      cf.latitude      ?? null,
      longitude:     cf.longitude     ?? null,
      timezone:      cf.timezone      ?? null,

      asn:           cf.asn           ?? null,
      as_org:        cf.asOrganization?? null,

      colo:          cf.colo          ?? null,
      edge_routing:  hdr.get("CF-Ray") ?? null,

      tls_version:   cf.tlsVersion    ?? null,
      client_tcp_rtt:cf.clientTcpRtt  ?? null,

      languages:     hdr.get("Accept-Language") ?? null,
      user_agent:    hdr.get("User-Agent")     ?? null,

      map_link:      cf.latitude && cf.longitude
                     ? `https://www.openstreetmap.org/?mlat=${cf.latitude}&mlon=${cf.longitude}#map=12/${cf.latitude}/${cf.longitude}`
                     : null,
      source: "https://github.com/xyTom/cf-whoami-snippet",
    };

    // ─── Respond ───
    if (fmt === "text" || fmt === "plain") {
      const body = Object.entries(data)
        .map(([k, v]) => `${k.padEnd(14)}: ${v ?? ""}`)
        .join("\n");
      return new Response(body + "\n", {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }

    return new Response(JSON.stringify(data, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  },
};
