# China-localized Zigbee2MQTT Fork

This repository is intended to stay close to upstream Zigbee2MQTT while carrying China-oriented operations improvements.

## Scope

- Keep the Zigbee2MQTT backend focused on Zigbee-to-MQTT bridging.
- Keep business logic in the external platform that consumes MQTT messages.
- Maintain frontend localization and mobile field-operations UX in the frontend fork.
- Preserve GPL license notices and publish source changes when distributing images or binaries.

## Related frontend fork

The mobile operations page and Simplified Chinese UI work live in the WindFront fork:

```text
../zigbee2mqtt-windfront
```

That frontend adds `#/mobile-ops`, a phone-friendly operations view for pairing, device checks, renaming, re-interviewing, removing devices, and viewing recent logs.

## Local source workflow

Build the frontend fork first:

```sh
cd ../zigbee2mqtt-windfront
npm install
npm run build
npm pack
```

On Windows, use this after `npm run build` if the upstream `clean` lifecycle script cannot run:

```powershell
npm pack --ignore-scripts
```

For local verification, install the packed frontend into this Zigbee2MQTT checkout:

```sh
cd ../zigbee2mqtt
pnpm install
pnpm add ../zigbee2mqtt-windfront/zigbee2mqtt-windfront-*.tgz
pnpm run build
```

Do not commit a `file:../...tgz` dependency to the public backend fork. It is only useful for local verification. Once the frontend fork has a public Git repository, npm package, or release tarball, replace `zigbee2mqtt-windfront` in `package.json` with that stable public dependency and regenerate `pnpm-lock.yaml`.

Then run Zigbee2MQTT from source:

```sh
pnpm start
```

In this local workspace, `pnpm start` is intentionally wired to use the single runtime data directory at `../data`. Do not add a second active `configuration.yaml` under `zigbee2mqtt/data`; that directory should only keep source templates such as `configuration.example.yaml`.

The runtime configuration should keep the default frontend package unless renamed:

```yaml
frontend:
  enabled: true
  package: zigbee2mqtt-windfront
```

## Docker image workflow

After replacing the `zigbee2mqtt-windfront` dependency with your public fork or packed package, build Zigbee2MQTT from this source checkout using the upstream Dockerfile:

```sh
docker build -f docker/Dockerfile -t your-registry/zigbee2mqtt-cn:2.12.0 .
```

For public releases, tag the backend and frontend forks together so the image source can be reconstructed.

## Deployment boundary

The business backend communicates with Zigbee2MQTT over MQTT only. It does not link to or embed Zigbee2MQTT source code. The Zigbee2MQTT fork and frontend fork remain GPL-compatible open-source projects, while the external platform can keep its own licensing.
