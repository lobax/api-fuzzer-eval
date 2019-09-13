#!/usr/bin/env python
# Designed for use with boofuzz v0.0.9
from boofuzz import *

def get_banner(target, logger, session, *args, **kwargs):
    banner_template = "Welcome to Vulnerable Server! Enter HELP for help."
    try:
        banner = target.recv(10000)
    except:
        print "Unable to connect. Target is down. Exiting."
        exit(1)
    logger.log_check('Receiving banner...')
    if banner_template in banner:
        logger.log_pass('banner received')
    else:
        logger.log_fail('No banner received')
        print "No banner received, exiting..."
        exit(1)

def main():
    session = Session(
            target=Target(
                connection=SocketConnection("vulnserver", 9999, proto='tcp')
                ),
            keep_web_open=False,
            fuzz_db_keep_only_n_pass_cases=1,
            )
    s_initialize(name="hter")
    s_string("HTER", fuzzable=False)
    s_delim(" ", fuzzable=False)
    s_string("FUZZ")
    s_static("\r\n")

    session.connect(s_get("hter"), callback=get_banner)
    session.fuzz()


if __name__ == "__main__":
    main()
