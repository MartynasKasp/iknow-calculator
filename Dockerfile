FROM node:14.5.0-buster

RUN apt update && \
    apt install -y \
    chromium \
    libxss1

RUN curl -fL https://github.com/txn2/kubefwd/releases/download/1.20.0/kubefwd_Linux_x86_64.tar.gz -o - | tar -xzf - kubefwd && chmod +x kubefwd && mv kubefwd /usr/local/bin/
RUN curl -fL "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" -o /usr/local/bin/kubectl && chmod a+x /usr/local/bin/kubectl

ENTRYPOINT [ "tail", "-f", "/dev/null" ]
