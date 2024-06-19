#!/usr/bin/perl

use strict;
use warnings;

sub run_command {
    my $command = shift;
    print "Executing: $command\n";

    # Uso system per eseguire il comando
    my $status = system($command);
    if ($status == 0) {
        print "\033[32m'$command' done.\033[0m\n";
    } else {
        print "\033[31m'$command' failed. Stato: $status\033[0m\n";
    }
}

# Lista di comandi da eseguire
my @commands = (
    'sudo apt update',
    'sudo apt upgrade',
    'sudo dpkg-reconfigure keyboard-configuration',
    'sudo apt install docker-compose'
);

foreach my $command (@commands) {
    run_command($command);
}