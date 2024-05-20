#docker compose build # --no-cache
docker compose up -d

# define browsers to run tests
browsers=(chrome firefox edge webkit electron)

# create a space-separated list of container names
containers=()
for browser in "${browsers[@]}"; do
  containers+=("cypress-$browser")
done

# Wait for the containers to finish tests
docker wait ${containers[@]} > /dev/null

# if results folder does not exist, create it
if [ ! -d "./results" ]; then
  mkdir results
fi

# get all the reports in /tmp/cypress-results-<browser>.log
for browser in "${browsers[@]}"; do
  docker cp "cypress-${browser}":/tmp/cypress-"${browser}".log ./results/cypress-"${browser}".log
done

docker compose down

bun run reporter.ts
echo "All done! Report generated in results/index.html"