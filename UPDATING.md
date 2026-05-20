# Updating the upstream version

The `fedimintd` image is built locally from `Dockerfile`, which extends the upstream `fedimint/fedimintd` Docker Hub image. That image is published from [`fedimint/fedimint`](https://github.com/fedimint/fedimint), which also serves the built-in Guardian Dashboard UI — there is no separate UI image to pin.

## Determining the upstream version

- **fedimint/fedimint** ([github.com/fedimint/fedimint](https://github.com/fedimint/fedimint)) — latest GitHub release:

  ```
  gh release view -R fedimint/fedimint --json tagName -q .tagName
  ```

  Cross-check that the matching tag exists on Docker Hub at [`fedimint/fedimintd`](https://hub.docker.com/r/fedimint/fedimintd):

  ```
  curl -fsSL "https://hub.docker.com/v2/repositories/fedimint/fedimintd/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
  ```

  Pin lives in `Dockerfile` as `FROM fedimint/fedimintd:v<version>`.

## Applying the bump

- **`Dockerfile`** — bump the `FROM fedimint/fedimintd:v<version>` line to the new upstream tag.
