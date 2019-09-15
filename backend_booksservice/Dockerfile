#Define the image we want to build from
FROM node:10.15.3

#Copy the current directory to a newly created working directory
COPY . /code

#Define the working directory - Change this to the directory your Node app is defined in
WORKDIR /code/server

#Install all the node dependencies
RUN npm install


# Run application
CMD [ "node", "server.js"]
