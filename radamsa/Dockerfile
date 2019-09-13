FROM alpine

# Install required packages
RUN apk add --no-cache \
  build-base \
  acl-dev \
  attr-dev \ 
  gmp-dev \ 
  libcap-dev \
  gawk \
  bc \
  perl \
  bash \
  vim

# Setup default compilers
ENV CC gcc
ENV CXX g++

# Setup working directory
WORKDIR /app

# Setup user
RUN adduser -D appuser
RUN chown appuser:appuser /app
USER appuser

# Download radamsa
RUN mkdir radamsa
RUN wget -qO- https://gitlab.com/akihe/radamsa/-/archive/develop/radamsa-develop.tar.gz | tar --strip-components 1 -C $PWD/radamsa -xzf -

# Build radamsa
RUN make -C radamsa
ENV PATH /app/radamsa/bin:$PATH

# Copy over local files
COPY --chown=appuser files files
COPY --chown=appuser *.sh ./
COPY --chown=appuser pre pre
COPY --chown=appuser init init
COPY --chown=appuser final final

CMD [ "/bin/bash" ]
