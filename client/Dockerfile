FROM python:3.10.2-alpine

RUN mkdir -p /data

COPY requirements.txt /data/

RUN pip install -r /data/requirements.txt

COPY index.py /data/

COPY bin/ngrok /usr/local/lib/python3.10/site-packages/pyngrok/bin/ngrok

RUN chmod 777 /usr/local/lib/python3.10/site-packages/pyngrok/bin/ngrok

WORKDIR /data

CMD ["python", "index.py"]