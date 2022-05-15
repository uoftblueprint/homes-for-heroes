FROM mysql:8
COPY . .
#ADD . ./docker-entrypoint-initdb.d/
ADD . ./bin/docker-entrypoint.sh 
RUN chmod 0644  ./mysql.sh

RUN chmod +x  ./mysql.sh

CMD ./mysql.sh