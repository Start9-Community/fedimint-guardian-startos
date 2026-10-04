# Updating the upstream version

The `fedimintd` image is built locally from `Dockerfile`, which extends the upstream `fedimint/fedimintd` Docker Hub image. That image is published from [`fedimint/fedimint`](https://github.com/fedimint/fedimint), which also serves the built-in Guardian Dashboard UI — there is no separate UI image to pin.

## Determining the upstream version

- **fedimint/fedimint** ([github.com/fedimint/fedimint](https://github.com/fedimint/fedimint)) — list upstream tags rather than relying on GitHub's Latest badge:

  ```sh
  gh api 'repos/fedimint/fedimint/tags?per_page=100' --paginate --jq '.[].name'
  ```

  Choose the newest stable release on the package's release line, skipping alpha, beta, and release-candidate tags. Cross-check that the matching tag exists on Docker Hub at [`fedimint/fedimintd`](https://hub.docker.com/r/fedimint/fedimintd):

  ```
  curl -fsSL "https://hub.docker.com/v2/repositories/fedimint/fedimintd/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
  ```

  Pin lives in `Dockerfile` as `FROM fedimint/fedimintd:v<version>`.

## Applying the bump

- **`Dockerfile`** — bump the `FROM fedimint/fedimintd:v<version>` line to the new upstream tag.
- **`startos/versions/current.ts`** — match the full upstream version, reset the wrapper revision to `:0`, and update the localized release notes. Preserve historical migrations according to the packaging guide.
- **`README.md` and `instructions.md`** — review any changed behavior and keep both accurate.
- Run `npm ci`, `npm run check`, `npx prettier --check startos`, and `make` to build both supported architectures. Check the built image's `fedimintd --version`.

## Guardian setup compatibility

New federation setup compares the exact upstream `x.y.z` release in guardian setup codes, including the patch version; StartOS wrapper revisions are not compared. Track patch releases even when upstream describes them as gateway-only and says existing guardians need not upgrade. That guidance does not remove the setup-version check: a guardian on the previous patch cannot create a new federation with guardians on the new patch.

Do not bypass the upstream check. Bump the packaged daemon so users can coordinate on the same release. Distinguish setup-code rejection from a consensus or connectivity failure in an already configured federation.
