# Debian buster (used by node:14) is end-of-life and its apt repositories are gone,
# so the dev image uses a supported Debian release and Node version.
FROM node:22-bookworm

# Set automatically by docker build (amd64 on Intel, arm64 on Apple Silicon).
ARG TARGETARCH

RUN KUBEFWD_ARCH=$([ "$TARGETARCH" = "arm64" ] && echo arm64 || echo x86_64) && \
    curl -fL "https://github.com/txn2/kubefwd/releases/download/1.20.0/kubefwd_Linux_${KUBEFWD_ARCH}.tar.gz" -o - | tar -xzf - kubefwd && \
    chmod +x kubefwd && mv kubefwd /usr/local/bin/
RUN curl -fL "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/${TARGETARCH:-amd64}/kubectl" -o /usr/local/bin/kubectl && \
    chmod a+x /usr/local/bin/kubectl

WORKDIR /app

ENTRYPOINT [ "tail", "-f", "/dev/null" ]
