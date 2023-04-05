[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a>
    <img src="https://cdn3.vectorstock.com/i/1000x1000/59/87/computer-science-lab-logo-icon-design-vector-22915987.jpg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Lab Management System</h3>

  <p align="center">
    Bookings, Reports, Seat allocations and much more!! 
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

A software that assists college faculties to maintain and manage the laboratory.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [ExpressJS](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Next.js](https://nextjs.org/)
- [ChakraUI](https://chakra-ui.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

You need to install

1. [Node v16](https://nodejs.org/en/)
2. [pnpm](https://pnpm.io/)

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/reenphygeorge/lab-management.git
   ```

2. Install all the NPM packages all the applications.

   > We are using PNPM workspace and turborepo to manage the applications in monorepo.

   ```sh
   pnpm install
   ```

3. Copy the `.env.example` for each applications to `.env` in the same directory and fill the values required

4. Start the api dev server and open `http://localhost:8000`

   ```sh
   pnpm --filter api dev
   ```

5. Start the web application dev server and open `http://localhost:3000`

   ```sh
   pnpm --filter web dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation with Docker compose

| Not ready yet. Coming soon

1. You need to install

- [Docker](https://www.docker.com/) / [Podman](https://podman.io/)
- [Docker Compose](https://docs.docker.com/compose/)

2. Run

```sh
docker-compose up
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Command Center

<details>

  <summary>
  All the commands for applications can be executed from the root directory using PNPM Workspace and Turborepo.
  </summary>

1. Web application PNPM commands

   ```sh
     pnpm --filter web <pnpm options>
   ```

2. API Server PNPM commands

   ```sh
     pnpm --filter api <pnpm options>
   ```

3. Turbo Pipeline Commands

   ```sh
     pnpm turbo run <pipeline_action_1> <pipeline_action_2>
   ```

4. Package installation command

   ```sh
   pnpm add "package-name" --filter "workspace-name"
   ```

### Misc Commands

1. Run lint

   ```sh
     pnpm lint
   ```

2. Run lint with autofixable fixes

   ```sh
     pnpm lint-fix
   ```

</details>

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/reenphygeorge/lab-management.svg?style=for-the-badge
[contributors-url]: https://github.com/reenphygeorge/lab-management/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/reenphygeorge/lab-management.svg?style=for-the-badge
[forks-url]: https://github.com/reenphygeorge/lab-management/network/members
[stars-shield]: https://img.shields.io/github/stars/reenphygeorge/lab-management.svg?style=for-the-badge
[stars-url]: https://github.com/reenphygeorge/lab-management/stargazers
[issues-shield]: https://img.shields.io/github/issues/reenphygeorge/lab-management.svg?style=for-the-badge
[issues-url]: https://github.com/reenphygeorge/lab-management/issues
[license-shield]: https://img.shields.io/github/license/reenphygeorge/lab-management.svg?style=for-the-badge
[license-url]: https://github.com/reenphygeorge/lab-management/blob/main/LICENCE
