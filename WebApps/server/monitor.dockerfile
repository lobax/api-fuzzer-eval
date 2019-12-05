FROM python:2.7-buster
RUN apt-get update
RUN pip2.7 install boofuzz

RUN mkdir server
WORKDIR /server
RUN apt-get install wget -y
RUN wget https://raw.githubusercontent.com/jtpereyda/boofuzz/master/process_monitor_unix.py

COPY requirements_for_test.txt ./ 
RUN pip install -r requirements_for_test.txt
COPY test_application.py ./ 
RUN chmod +x test_application.py

CMD ["python", "process_monitor_unix.py"]
