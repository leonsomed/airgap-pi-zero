# Airgap SeedQR Tool

See [AIRGAP.md](AIRGAP.md) for instructions on setting up an airgap device.

## Build a standalone HTML file

_ONLY USE THIS TOOL IN AN AIRGAP DEVICE_

The build bundles the BIP39, BIP32, QR-code, and Tailwind dependencies directly into `dist/btc.html`. The generated file has no runtime network dependencies and can be opened offline, including with `file://`.

Requirements: Node.js 18 or later and npm.

```sh
npm ci
npm run build
```

The finished standalone file is written to `dist/btc.html`.

The editable page template is `src/btc.template.html`. After changing the template or the build script, run `npm run build` again to regenerate `dist/btc.html`.
