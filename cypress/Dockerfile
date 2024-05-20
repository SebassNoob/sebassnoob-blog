FROM cypress/included
WORKDIR /app

COPY . .

RUN npm i

# Set a default browser
ARG BROWSER=chrome
ENV BROWSER=$BROWSER

# Set ports
ARG PORT=3000
ENV PORT=$PORT

# Install necessary dependencies if browser is webkit
RUN if [ "$BROWSER" = "webkit" ] ; then npx playwright install-deps webkit ; fi

# Run the script
ENTRYPOINT ["sh", "-c", "npx cypress run --browser \"$BROWSER\" > /tmp/cypress-\"$BROWSER\".log 2>&1"]