#!/usr/bin/env python
# Designed for use with boofuzz v0.0.9
from boofuzz import *

def post_test_callback(target, fuzz_data_logger, session, sock, *args, **kwargs):
    error_template = "HTTP/1.0 500 INTERNAL SERVER ERROR"
    try:
        res = target.recv()
    except:
        print "Unable to get data. Target is not responding."
        exit(1)
    if error_template in res:
        fuzz_data_logger.log_fail('Server error')
    print("Recv: ")
    print(res)


def main():
    host = "server"
    start_commands = ['./test_application.py']
    stop_commands = 'pkill -f test_application.py'
    session = Session(
            target=Target(
                connection=SocketConnection(host, 5000, proto='tcp'),
                procmon=pedrpc.Client(host, 26002),
                procmon_options={
                    "start_commands": [start_commands],
                    "stop_commands": [stop_commands]
                    },
                ),
            keep_web_open=False,
            fuzz_db_keep_only_n_pass_cases=1,
            post_test_case_callbacks=[post_test_callback],
            )
    s_initialize(name="Request")
    with s_block("Request-Line"):
        s_string("GET", name='Method', fuzzable=False)
        s_delim(" ", name='space-1', fuzzable=False)
        s_string("/exception/", name='Request-URI', fuzzable=False)
        s_string("a", name='Integer_ID', max_len=20)
        s_delim(" ", name='space-2', fuzzable=False)
        s_string('HTTP/1.1', name='HTTP-Version', fuzzable=False)
        s_static("\r\n", name="Request-Line-CRLF")
    s_static("\r\n", "Request-CRLF")

    session.connect(s_get("Request"))
    session.fuzz()


if __name__ == "__main__":
    main()
