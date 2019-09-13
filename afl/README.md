# American Fuzzy Lop

## Instructions

### Running the container

```
docker build -t afl .
docker run -it afl
```

### Fuzzing a binary

#### Make test files

`echo "hello world" > in/test1.txt`

#### Start fuzzing

`afl/afl-fuzz -i in -o out ./coreutils-build/bin/cat `

The output files will be stored in /app/out.