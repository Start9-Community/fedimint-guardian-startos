## How the upstream version is pulled
- `FROM` line in `Dockerfile`: `fedimint/fedimintd:v<version>`

## Why the Dockerfile materializes /etc/passwd
- The upstream Nix-built image ships `/etc/passwd`, `/etc/group`, and `/etc/nsswitch.conf` as symlinks into the `/nix/store`. StartOS's SubContainer fails to resolve those symlinks at runtime, so any `getpwuid_r`/`getpwnam_r` call (used by `pwd-grp` via `fs-mistrust` via `arti-client`) crashes with `open r /etc/passwd: No such file or directory`.
- The Dockerfile dereferences and writes those three files as regular files. `FS_MISTRUST_DISABLE_PERMISSIONS_CHECKS=true` is also set in the daemon env as defense-in-depth.
