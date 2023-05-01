<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<div align="center" markdown="1">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a>
    <img src="https://i.imgur.com/Y3xHpll.png" alt="Logo" width="180" height="180">
  </a>

<h3 align="center">YouTube Album</h3>

<div align="center">

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/7e905c51a8af469e89be97b6c91954bd)](https://app.codacy.com/gh/KrozT/youtube-album/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

</div>

  <p align="center">
An online album for YouTube videos. Save links, view thumbnails, and play back your content with ease.    <br />
<a href="https://github.com/KrozT/youtube-album"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://album-5be5b.web.app/">View Demo</a>
    ·
    <a href="https://github.com/KrozT/youtube-album/issues">Report Bug</a>
    ·
    <a href="https://github.com/KrozT/youtube-album/pulls">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#screenshots">Screenshots</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
      <ul>
        <li><a href="#packages">Packages</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#internationalization">Internationalization</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This is an online album of YouTube videos where you can save links and view all of the videos you've stored. You can see the video thumbnails and information, play them back, and remove them from your collection as desired. The interface is user-friendly and easy to navigate, making it simple to organize and access your favorite YouTube content.

This project provides a convenient way to keep track of your favorite videos and organize them for easy viewing. Whether you're a casual YouTube user or a content creator looking for a way to manage your uploads, this album is a great tool for keeping your videos organized and easily accessible.

### Screenshots
<details>

<summary>Images</summary>

[![YouTube Album ScreenShot 1][product-screenshot-1]](https://github.com/KrozT/youtube-album)

</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![TypeScript][TypeScript-shield]][TypeScript-url]
* [![Vue.js][Vue.js]][Vue-url]
* [![TailwindCSS][TailwindCSS-shield]][TailwindCSS-url]

### Packages
- [@heroicons/vue](https://github.com/tailwindlabs/heroicons)
- [@intlify/unplugin-vue-i18n](https://github.com/intlify/bundle-tools)
- [axios](https://github.com/axios/axios)
- [daysiui](https://github.com/saadeghi/daisyui)
- [firebase](https://github.com/firebase/firebase-js-sdk)
- [notie](https://github.com/jaredreich/notie)
- [vue](https://github.com/vuejs/core)
- [vue-i18n](https://github.com/intlify/vue-i18n-next)
- [vue-router](https://github.com/vuejs/router)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Get a necessary API Keys
   - [Firebase](https://console.firebase.google.com/)
   - [YouTube](https://console.cloud.google.com/)
     <br>

2. Clone the repo
   ```sh
   git clone https://github.com/KrozT/afex-frontend.git
   ```
3. Install packages
   ```sh
   yarn install
   ```
4. Add the API Keys to your environment variables
   ```dotenv
   VITE_APP_NAME='YOUR APP NAME'

   VITE_YOUTUBE_API_KEY='YOUR YOUTUBE API KEY'

   VITE_FIREBASE_API_KEY='YOUR FIREBASE API KEY'
   VITE_FIREBASE_AUTH_DOMAIN='YOUR FIREBASE AUTH DOMAIN'
   VITE_FIREBASE_PROJECT_ID='YOUR FIREBASE PROJECT ID'
   VITE_FIREBASE_STORAGE_BUCKET='YOUR FIREBASE STORAGE BUCKET'
   VITE_FIREBASE_MESSAGING_SENDER_ID='YOUR FIREBASE MESSAGING SENDER ID'
   VITE_FIREBASE_APP_ID='YOUR FIREBASE APP ID'
   VITE_FIREBASE_MEASUREMENT_ID='YOUR FIREBASE MEASUREMENT ID'
   ```
   OR
   ```text
   Firebase configuration is stored on environment variables for easy and fast deployment withouth having to change the code.
   If you don't want to use environment variables, you can change the configuration on the `src/composables/database.ts` file.
   ```
5. Build project
   ```sh
   yarn run build
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Once you have the project built and running on your preferred hosting service or locally,
just go to the address where you have it hosted or your localhost and you will be able to use it.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Internationalization

You can add new languages to the project by following these steps:

1. Create a new file in the `src/locales` folder with the name of the language you want to add following the IS0 631-1 standard (e.g. `fr-FR.json`).
2. Copy the contents of the `src/locales/en-US.json` file and paste it into the file you just created.
3. Change the values of the keys to the language you want to add.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] YouTube Integration
  - [x] Videos
  - [x] Thumbnails
  - [x] Information
  - [x] Playback
  - [x] Removal
- [x] Firebase Integration
  - [x] Database
  - [x] Analytics
- [ ] User Authentication
  - [ ] Google
  - [ ] Email
- [x] User Interface
  - [x] Responsive
  - [x] Mobile-friendly
  - [x] Automatic language detection (based on browser language)
  - [ ] Dark mode
- [x] Internationalization
  - [x] English (United States)
  - [x] Spanish (Chile)

See the [open issues](https://github.com/KrozT/youtube-album/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Othneil Drew](https://github.com/othneildrew/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/KrozT/youtube-album.svg?style=for-the-badge
[contributors-url]: https://github.com/KrozT/youtube-album/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/KrozT/youtube-album.svg?style=for-the-badge
[forks-url]: https://github.com/KrozT/youtube-album/network/members
[stars-shield]: https://img.shields.io/github/stars/KrozT/youtube-album.svg?style=for-the-badge
[stars-url]: https://github.com/KrozT/youtube-album/stargazers
[issues-shield]: https://img.shields.io/github/issues/KrozT/youtube-album.svg?style=for-the-badge
[issues-url]: https://github.com/KrozT/youtube-album/issues
[license-shield]: https://img.shields.io/github/license/KrozT/youtube-album.svg?style=for-the-badge
[license-url]: https://github.com/KrozT/youtube-album/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/matias-espinoza-bustos/
[product-screenshot-1]: https://i.imgur.com/Sr54lzZ.gif
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com

[TypeScript-url]: https://www.typescriptlang.org
[TypeScript-shield]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white

[Firebase-url]: https://firebase.google.com/
[Firebase-shield]: https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white

[TailwindCSS-url]: https://github.com/tailwindlabs/tailwindcss
[TailwindCSS-shield]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
