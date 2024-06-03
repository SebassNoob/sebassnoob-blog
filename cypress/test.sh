# catch ctrl-c and call finish function
trap finish INT

# function to run when ctrl-c is pressed
function finish() {
  echo "Caught Ctrl-C, stopping containers..."
  docker compose down
  exit 1
}

# flags
# --no-cache: build the images from scratch
# --dev: run the tests and reload the runner on file changes

# default values for flags
no_cache=false
dev=false


# handle flags
for arg in "$@"
do
  case $arg in
    --no-cache)
      no_cache=true
      shift
      ;;
    --dev)
      dev=true
      shift
      ;;
    *)
      echo "Invalid option: $arg" 1>&2
      exit 1
      ;;
  esac
done

# check if docker is installed
if ! docker --version > /dev/null; then
  echo "Docker is not running. Please start Docker and try again."
  exit 1
fi

# check if docker is running
if ! docker info > /dev/null; then
  echo "Docker is not running. Please start Docker and try again."
  exit 1
fi

# check if docker-compose is installed
if ! docker compose --version > /dev/null; then
  echo "Docker Compose is not installed. Please install Docker Compose and try again."
  exit 1
fi

# check if bun is installed
if ! bun --version > /dev/null; then
  echo "Bun is not installed. Please install Bun and try again."
  exit 1
fi

# build and run the containers
if [ "$no_cache" = true ]; then
  docker compose build --no-cache
fi

if [ "$dev" = true ]; then
  docker compose watch
  
else 
  docker compose up -d
fi

# define browsers to run tests
browsers=(chrome firefox edge webkit electron)

# create a space-separated list of container names
containers=()
for browser in "${browsers[@]}"; do
  containers+=("cypress-$browser")
  echo "Running tests in container cypress-$browser"
done

# Wait for the containers to finish tests
docker wait ${containers[@]} > /dev/null

declare -A exit_codes

for container in "${containers[@]}"; do
  exit_codes[$container]=$(docker inspect --format='{{.State.ExitCode}}' $container)
done

# if results folder does not exist, create it
if [ ! -d "./results" ]; then
  mkdir results
fi

# get all the reports in /tmp/cypress-results-<browser>.log
for browser in "${browsers[@]}"; do
  docker cp "cypress-${browser}":/tmp/cypress-"${browser}".log ./results/cypress-"${browser}".log
done

docker compose down

# if not installed, install deps from package.json
if [ ! -d "./node_modules" ]; then
  bun install
fi

bun run reporter.ts
echo "All done! Report generated in cypress/results/index.html"

echo "Exit codes:"
for container in "${containers[@]}"; do
  echo "$container: ${exit_codes[$container]}"
done

for code in "${exit_codes[@]}"; do
  if [[ "$code" -ne 0 ]]; then
    echo "Some tests failed"
    exit 1
  fi
done

echo "All tests passed"
exit 0