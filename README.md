# advcloud: Coca-PT project - Benchmarking
This project has been made as part of the MSE master's program at HES-SO.

## Launching the front-end application
Done with pure javascript, html and css. You can just open `index.html` and you're good to go. You can also find it on [this site](dev.pittet.io).

## Benchmarking

In this folder, you will find all the scripts to run the benchmarks. First, create an instance on any Service Provider and save the .pem file. Modify the `ssh_ip_script_config.yml` with the path to the pem file and the IP address of your instance. Then you can run the script with the following command:
```
sudo ./pkb.py --benchmarks=<BENCHMARK_NAME> --benchmark_config_file=ssh_ip_script_config.yml --ip_addresses=EXTERNAL

```
For any issues with this script, the full documentation is available on [github](https://github.com/GoogleCloudPlatform/PerfKitBenchmarker

In `benchmark name`, you can launch different benchmarks, such as unixbench, fio, ping, etc.

When your benchmarking data has been collected, move the `perfkitbenchmarker_results.json` file the /tmp/ folder to your working directory and launch the `prettyfySendJson.py` script by executing this command:

```
python prettyfySendJson.py <API_URL> <PATH_TO_JSON_FILE> <SERVICE_PROVIDER_NAME> <FLAVOR>

```
examples of inputs:

- API_URL: http://lsds.hesge.ch/coca/api/v1.0/performance
- PATH_TO_JSON_FILE: path to where your perfkitbenchmarker_results.json file is
- SERVICE_PROVIDER_NAME: aws, gce, exoscale
- FLAVOR: tiny, small, medium, large

#API
The API can be accessed through: `http://lsds.hesge.ch/coca/api/v1.0` with two endpoints:
- GET data

```
http://lsds.hesge.ch/coca/api/v1.0/performance?serviceprovider=<SERVICE_PROVIDER_NAME>&flavor=<FLAVOR>
```
- POST data
```
http://lsds.hesge.ch/coca/api/v1.0/performance
```
