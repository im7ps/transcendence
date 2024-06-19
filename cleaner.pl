#!/usr/bin/perl

use strict;
use warnings;

print "Inizio pulizia di Docker...\n";

my @commands = (
    'sudo docker-compose down -v',
    'sudo docker stop $(docker ps -aq)',
    'sudo docker rm $(docker ps -aq)',
    'sudo docker rmi $(docker images -q)',
    'sudo docker volume rm $(docker volume ls -q)',
    'sudo docker network rm $(docker network ls -q)',
    'sudo docker system prune -a --volumes',
    'sudo docker system prune -f',
);

foreach my $cmd (@commands) {
    print "Eseguo: $cmd\n";
    my $status = system($cmd);
    if ($status == 0) {
        print "Comando '$cmd' eseguito con successo.\n";
    } else {
        print "Errore nell'esecuzione del comando '$cmd'. Stato: $status\n";
    }
}
print "Pulizia di Docker completata.\n";

