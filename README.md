# TIKI SDK (JavaScript) —Consumer Data Licensing
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The TIKI SDK for JavaScript makes it easy to add consumer data licensing to your web applications. It's the client-side component that your users will interact with to accept (or decline) data licensing offers. TIKI's SDK creates immutable, digitally signed license records using cryptographic hashing, forming an audit trail. Programmatically consume records and enforce terms client or server-side using developer-friendly data structures and [APIs](https://mytiki.com/reference/getting-started).

This library includes both configurable pre-built UI flows/elements and native low-level APIs for building custom experiences.

**Get started with our 📚 [SDK docs](https://mytiki.com/docs/sdk-overview), or jump right into the 📘 [API reference](https://tiki-sdk-js.docs.mytiki.com).**


## Installing

_Note: Before you get started, you will need a Publishing ID. It's free to create one; simply log in to our 🧑‍💻 [Developer Console](https://console.mytiki.com) and create a new Project._

Either

a) install the dependency from NPM

```
npm install @mytiki/tiki-sdk-js
```

or b) load it browser side from a CDN.

```
<script defer src="https://unpkg.com/@mytiki/tiki-sdk-js@1.0.1/dist/index.js"></script>
```

That's it. And yes, it's really that easy.

## Initialization
Initialize the TIKI SDK in minutes with the TIKI pre-built UI and a custom data offer —just 1 builder function ([interactive example](https://mytiki.com/recipes/sdk-pre-built-ui-setup)).

```
TikiSdk.config()
  .theme
  	.primaryTextColor('#1C0000')
  	.secondaryTextColor('#1C000099')
  	.primaryBackgroundColor('#FFFFFF')
  	.secondaryBackgroundColor('#F6F6F6')
  	.accentColor('00b272')
  	.fontFamily('"Space Grotesk", sans-serif')
  .offer
  	.description('Trade your IDFA (kind of like a serial # for your phone) for a discount.')
  	.reward('https://cdn.mytiki.com/assets/demo-reward.png')
  	.bullet({ text: 'Learn how our ads perform', isUsed: true })
  	.bullet({ text: 'Reach you on other platforms', isUsed: false })
  	.bullet({ text: 'Sold to other companies', isUsed: false })
  	.terms('terms.md')
  	.ptr('db2fd320-aed0-498e-af19-0be1d9630c63')
  	.tag(TikiSdk.TitleTag.deviceId())
  	.use({ usecases:[TikiSdk.LicenseUsecase.attribution()] })
  	.add()
  .initialize('<your-publishing-id>', '<your-user-id>');
```

Read about styling, selecting metadata, and desiging your offer in our [📚 SDK docs →](https://mytiki.com/docs/sdk-overview).

## UI Flows

The The SDK includes 2 pre-built flows: `present()` and `settings()`. Use `present()` to display to the user a new data licensing offer.

```
TikiSdk.present();
```

Use `settings()` to render a ...settings screen 😲 where users can change their mind and opt-out of an existing license agreement.

```
TikiSdk.settings();
```

# Contributing

- Use [GitHub Issues](https://github.com/tiki/tiki-sdk-js/issues) to report any bugs you find or to request enhancements.
- If you'd like to get in touch with our team or other active contributors, pop in our 👾 [Discord](https://discord.gg/tiki).
- Please use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) if you intend to add code to this project.

## Project Structure
_While this project compiles to a JS UMD for use in browsers, it is in fact mixed-language._

- `/src`: The primary implementation source for the library.
  - `/ui`: Declarative UI flows and elements (TS/JS/CSS/HTML)
  - `/core`: The TypeScript interface for the compiled `/lib` source.
- `/lib`: A [tiki-sdk-dart](https://github.com/tiki/tiki-sdk-dart) wrapper for JavaScript compatability and compilation.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://mytiki.com"><img src="https://avatars.githubusercontent.com/u/3769672?v=4?s=100" width="100px;" alt="Mike Audi"/><br /><sub><b>Mike Audi</b></sub></a><br /><a href="https://github.com/tiki/tiki-sdk-js/commits?author=mike-audi" title="Code">💻</a> <a href="https://github.com/tiki/tiki-sdk-js/commits?author=mike-audi" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/ricardolg/"><img src="https://avatars.githubusercontent.com/u/8357343?v=4?s=100" width="100px;" alt="Ricardo Gonçalves"/><br /><sub><b>Ricardo Gonçalves</b></sub></a><br /><a href="#maintenance-ricardobrg" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
