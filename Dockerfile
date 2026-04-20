FROM fedimint/fedimintd:v0.10.0

# Workaround: the upstream Nix-built image has /etc/passwd, /etc/group, and
# /etc/nsswitch.conf as symlinks into the /nix/store. StartOS's SubContainer
# fails to resolve these symlinks at runtime, so fedimintd's getpwuid/
# getpwnam calls crash with `open r /etc/passwd: No such file or directory`.
# Materialize the targets as regular files to fix lookups.
RUN bash -c 'set -e; for f in passwd group nsswitch.conf; do cp -L /etc/$f /etc/$f.real; rm /etc/$f; mv /etc/$f.real /etc/$f; done'
