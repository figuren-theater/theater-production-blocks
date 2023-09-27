<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/figuren-theater/theater-production-blocks">
    <img src="https://raw.githubusercontent.com/figuren-theater/logos/main/favicon.png" alt="figuren.theater Logo" width="100" height="100">
  </a>

  <h1 align="center">Theater Production Blocks</h1>

  <p align="center">
    WordPress blocks for theater productions to be used with the Site- and Block-Editor.
    <br /><br /><br />
  </p>
</div>

## Background & Motivation

This Plugin contains the following blocks related to theater:

- Duration
- Premiere Date
- Target Group

I don't wanted to reinvent the wheel, that's why this plugin is an extension to **wp-theater**

It will also work standalone, as long as you provide it the slugs of one or more existing post_types via the included filters.

## Install

1. Install via command line
    ```sh
    composer require figuren-theater/theater-production-blocks
    ```

## Usage

Open a new production and insert one of the new blocks.


### Actions and Filters included

1. uses the *(yet non existent, default)* `wp-theater-production-posttype` filter of the *future* **wp-theater** plugin
2. `Figuren_Theater\Production_Blocks\Registration\post_types`
3. `Figuren_Theater\Production_Blocks\Registration\post_type_supports`


## Built with & uses

  - [dependabot](/.github/dependabot.yml)
  - [code-quality](https://github.com/figuren-theater/code-quality/)
     A set of status checks to ensure high and consitent code-quality for the figuren.theater platform.
  - ....

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning. For the versions
available, see the [tags on this repository](https://github.com/figuren-theater/theater-production-blocks/tags).

## Authors

  - **Carsten Bach** - *Provided idea & code* - [figuren.theater/crew](https://figuren.theater/crew/)

See also the list of [contributors](https://github.com/figuren-theater/theater-production-blocks/contributors)
who participated in this project.

## License

This project is licensed under the **GPL-3.0-or-later**, see the [LICENSE](/LICENSE) file for
details
