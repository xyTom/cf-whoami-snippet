# Cloudflare WhoAmI

A tiny **Cloudflare Snippet** that returns useful metadata about the current request: public IP, approximate geolocation, ASN, Cloudflare edge location, TLS version, connection RTT, language, and user agent.

Useful as a lightweight `/whoami` endpoint for debugging VPNs, proxies, CDN routing, geo behavior, or network changes.

- No dependencies
- No database
- No external API
- JSON and plain-text output
- Designed for Cloudflare Snippets / Workers runtime

> **Official repository:** `https://github.com/xytom/cf-whoami-snippet`
>
> This is the original upstream repository for **Cloudflare WhoAmI**. If you redistribute or modify substantial portions of this project, please preserve the copyright and license notices required by the MIT License.

## Example

Request:

```text
https://example.com/whoami
```

Response:

```json
{
  "ip": "203.0.113.42",
  "ip_version": 4,
  "city": "San Francisco",
  "region": "California",
  "region_code": "CA",
  "postal_code": "94105",
  "metro_code": "807",
  "country": "US",
  "continent": "NA",
  "latitude": "37.77570",
  "longitude": "-122.39520",
  "timezone": "America/Los_Angeles",
  "asn": 7922,
  "as_org": "Comcast Cable Communications, LLC",
  "colo": "SJC",
  "cf_ray": "6af4c9e55bbc81aa-SJC",
  "tls_version": "TLSv1.3",
  "client_tcp_rtt": 7,
  "client_quic_rtt": null,
  "languages": "en-US,en;q=0.9",
  "user_agent": "Mozilla/5.0 ...",
  "map_link": "https://www.openstreetmap.org/?mlat=37.77570&mlon=-122.39520#map=12/37.77570/-122.39520"
}
```

Some values depend on the request and Cloudflare's available metadata, so fields may be `null`.

## Plain-text mode

Add `?fmt=text` or `?fmt=plain`:

```text
https://example.com/whoami?fmt=text
```

Example:

```text
ip              : 203.0.113.42
ip_version      : 4
city            : San Francisco
country         : US
colo            : SJC
tls_version     : TLSv1.3
client_tcp_rtt  : 7
...
```

## Deploy with Cloudflare Snippets

1. Open your Cloudflare zone.
2. Go to **Rules -> Snippets**.
3. Create a new Snippet.
4. Paste the contents of [`snippet.js`](./snippet.js).
5. Attach a rule that matches the endpoint you want, for example:

```text
http.request.uri.path eq "/whoami"
```

6. Deploy the Snippet.
7. Visit `https://your-domain.example/whoami`.

The hostname must be proxied through Cloudflare for the Snippet to run.

## Returned fields

| Field | Description |
| --- | --- |
| `ip` | Client IP from `CF-Connecting-IP` |
| `ip_version` | IPv4 (`4`) or IPv6 (`6`) |
| `city` | Approximate city |
| `region` / `region_code` | Approximate first-level region |
| `postal_code` | Approximate postal code |
| `metro_code` | Metro/DMA code when available |
| `country` | Two-letter country code |
| `continent` | Continent code |
| `latitude` / `longitude` | Approximate coordinates |
| `timezone` | IANA timezone |
| `asn` | Autonomous System Number |
| `as_org` | Organization associated with the ASN |
| `colo` | Cloudflare data-center code |
| `cf_ray` | Cloudflare Ray ID for the request |
| `tls_version` | Client-to-Cloudflare TLS version |
| `client_tcp_rtt` | Smoothed RTT for TCP connections |
| `client_quic_rtt` | Smoothed RTT for QUIC/HTTP/3 connections |
| `languages` | Browser `Accept-Language` header |
| `user_agent` | Browser/client `User-Agent` header |
| `map_link` | OpenStreetMap link based on approximate coordinates |

## Privacy

This project does **not** store or transmit request data anywhere by itself. It only returns metadata already available to the Cloudflare request handler.

If you expose the endpoint publicly, visitors can use it to view metadata about **their own request**. Treat IP addresses and approximate location data as potentially sensitive if you later add logging, analytics, or storage.

Responses include `Cache-Control: no-store`.

## Project provenance

The canonical upstream source is:

```text
https://github.com/xytom/cf-whoami-snippet
```

The public Git history, signed/verified commits where available, tags, and GitHub Releases form the project's publication timeline. See [`NOTICE`](./NOTICE) for attribution information.

If you publish a fork, please make it clear that it is a fork and link back to the upstream repository.

## Contributing

Small fixes and improvements are welcome. See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Security

For security-related reports, see [`SECURITY.md`](./SECURITY.md).

## License

Licensed under the **MIT License**. See [`LICENSE`](./LICENSE).

Copyright (c) 2026 xytom.
