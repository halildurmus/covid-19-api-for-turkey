# COVID-19 API For Turkey

![GitHub top language](https://img.shields.io/github/languages/top/halildurmus/covid-19-api-for-turkey?style=for-the-badge)
[![GitHub contributors](https://img.shields.io/github/contributors-anon/halildurmus/covid-19-api-for-turkey?style=for-the-badge)](https://github.com/halildurmus/covid-19-api-for-turkey/graphs/contributors)
[![GitHub issues](https://img.shields.io/github/issues/halildurmus/covid-19-api-for-turkey?style=for-the-badge)](https://github.com/halildurmus/covid-19-api-for-turkey/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://github.com/halildurmus/covid-19-api-for-turkey/blob/master/LICENSE)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&labelColor=blue&style=for-the-badge)](https://linkedin.com/in/halildurmus)
![Visits](https://badges.pufler.dev/visits/halildurmus/covid-19-api-for-turkey?style=for-the-badge)

> **COVID-19 API For Turkey** is a **REST API** for **COVID-19** stats in **Turkey**.

## Table of Contents

* [Documentation](#documentation)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Code Contributors](#code-contributors)
* [Contributing](#-contributing)
* [Author](#author)
* [License](#-license)
* [Acknowledgements](#acknowledgements)

## Documentation

The documentation can be found **[here](https://covid-19-api-for-turkey.herokuapp.com/docs)**.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You need to have **[Redis](https://redis.io)** installed on your pc.
1. [Install Redis](https://redis.io/topics/quickstart)
2. Run `redis-server` to start redis server.

### Installation

1. Clone the repo using: `git clone https://github.com/halildurmus/covid-19-api-for-turkey.git`
2. In the project folder you will find a `example.env` file, copy it and rename it to `.env`.
3. Open the `.env` file and change the `REDIS_HOST` to `localhost` or `127.0.0.1`
4. Change the env variables to fit your environment.
5. Run `npm i` to install the packages needed for the project.
6. Run `npm run start`

## Usage

1. Make sure that the `redis-server` is running.
2. Open your browser and navigate to `localhost:{PORT}/api/v1/latest` (PORT being the port specified in your `.env` file). 
You should now see the latest report data on that page.

## Roadmap

See the [open issues](https://github.com/halildurmus/covid-19-api-for-turkey/issues) for a list of proposed features (and known issues).

## Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].


<a href="https://github.com/halildurmus/covid-19-api-for-turkey/graphs/contributors">
  <img class="avatar" alt="halildurmus" src="https://github.com/halildurmus.png?v=4&s=96" width="48" height="48" />
</a>

## 🤝 Contributing

Contributions, issues and feature requests are welcome.<br />
Feel free to check [issues page](https://github.com/halildurmus/covid-19-api-for-turkey/issues) if you want to contribute.<br />
[Check the contributing guide](./CONTRIBUTING.md).<br />

## Author

👤 **Halil İbrahim Durmuş**

- Github: [@halildurmus](https://github.com/halildurmus)

## 📝 License

This project is [MIT](https://github.com/halildurmus/covid-19-api-for-turkey/blob/master/LICENSE) licensed.

## Acknowledgements
* [T.C. Sağlık Bakanlığı COVID-19 Bilgilendirme Sayfası](https://covid19.saglik.gov.tr)
* [Img Shields](https://shields.io) 
