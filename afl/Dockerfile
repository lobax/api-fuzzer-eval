FROM alpine as builder

# Install required packages
RUN apk add --no-cache \
  build-base \
  clang-dev \
  llvm-dev \
  acl-dev \
  attr-dev \ 
  gmp-dev \ 
  libcap-dev \ 
  perl \
  tar \ 
  xz

# Setup working directory
WORKDIR /app

# Setup user
RUN adduser -D appuser
RUN chown appuser:appuser /app
USER appuser

# Download american fuzzy lop
RUN mkdir afl
RUN wget -qO- http://lcamtuf.coredump.cx/afl/releases/afl-latest.tgz | tar --strip-components 1 -C $PWD/afl -xzf -

# Download coreutils
RUN mkdir coreutils
RUN wget -qO- https://ftp.gnu.org/gnu/coreutils/coreutils-8.25.tar.xz | tar --strip-components 1 -C $PWD/coreutils -xJf -

# Build afl
ENV CC clang
ENV CXX clang++
ENV AFL_NO_X86 1
RUN make -C afl
RUN make -C afl/llvm_mode

# Build coreutils
ENV AFL_HARDEN 1
RUN mkdir /app/coreutils-build
RUN cd coreutils && ./configure CC="/app/afl/afl-clang-fast" CXX="/app/afl/afl-clang-fast++" --prefix=/app/coreutils-build
RUN make -C coreutils
RUN make -C coreutils install

# -- Minimize image --

FROM alpine

# Install required packages
RUN apk add --no-cache \
  acl \
  attr \ 
  gmp \ 
  libcap \
  openssl \
  ca-certificates

# Setup working directory
WORKDIR /app
COPY --from=builder /app/afl afl
COPY --from=builder /app/coreutils-build coreutils-build

# Setup user
RUN adduser -D appuser
RUN chown -R appuser:appuser /app
USER appuser

# Create empty directories
RUN mkdir in out
