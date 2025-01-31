# Assistenzhilfe

Website of [Assistenzhilfe](https://assistenzhilfe.de/) using the following tech stack:

- [Astro](https://astro.build/)
- [Storyblok](https://www.storyblok.com/)
- [Netlify](https://www.netlify.com/)

## Local setup

After cloning the project, run `npm install` to install all necessary dependencies.

- `npm start` will start your local development server.
- `npm run build` will first run a check of your project and give you either errors, warnings or hints before creating the actual build
- `npm run dev` is recommended for using it together with the Storyblok CMS, to make sure that the [visual editor](https://www.storyblok.com/faq/setting-up-https-on-localhost-in-astro) works without any issues

### Pre-commit hook

Before your changes are committed, `npm run build` will be executed to make sure that there are no issues and the project builds correctly. This is a safety net to make sure you don't push anything that's not working.

As this website is deployed on Netlify, a failed build will **not** break the live website. Netlify will simply ignore the failed build and keeps the previous (successful) one.

## How Astro works

For a deep-dive, reference the [Astro documentation](https://docs.astro.build/en/getting-started/). Astro is a static site generator outputting HTML with zero JavaScript by default.

The basic structure of an .astro file can look like this:

```javascript
---
// Component Script (JavaScript)
---

<!-- Component Template (HTML + JS Expressions) -->

<style>
/* Regular (scoped) CSS goes here */
</style>
```

If you know how to write (semantic & accessible) HTML, you know how to create an .astro file! 🤗

## What's special about this project

### CSS layers

We're utilizing CSS layers to avoid the usage of the `!important` hand grenade in CSS. If your new to this, read [Mayank's explanation of how CSS layers work](https://mayank.co/blog/css-reset-layer/#but-why). Every CSS file starts with the following line:

```css
@layer reset, variables, global, custom;
```

And the respective content is wrapped in a layer:

```css
@layer reset {
  /* Content */
}
```

Reading from left to right, it goes from least to most important. If you want to override a style defined in the `global` layer, you do that in the `custom` layer **without** using `!important`.

### Fluid responsive design & no breakpoints

Instead of relying on arbitrary pixel values defining how the layout should react to the viewport, we're letting the browser do the heavy lifting.

This approach was inspired by [Be the browser’s mentor, not its micromanager](https://buildexcellentwebsit.es/), [The ideal viewport doesn’t exist](https://viewports.fyi/) and [Utopia](https://utopia.fyi/).

In `variables.css`, you'll find all values for font sizes and spacing (as well as the color palette).

These values react to the viewport width of the device and are calculated accordingly. Special emphasis is put on the headings in `global.css`:

```css
h1 {
  font-size: calc(var(--step-5) * 1.2);
}

h2 {
  font-size: calc(var(--step-4) * 1.2);
}

h3 {
  font-size: calc(var(--step-3) * 1.2);
}
```

## Storyblok

Storyblok is the official partner of Astro and therefore lots of documentation and tutorials are available. Check out [Add a headless CMS to Astro in 5 minutes](https://www.storyblok.com/tp/add-a-headless-cms-to-astro-in-5-minutes) to understand how it works.

### Possible improvements

Due to certain constraints, there's still a lot of room to improve the implementation of Storyblok in this project.

#### Referencing Storyblok components

Currently, the individual Storyblok components are referenced directly in the frontend, for example:

```javascript
<StoryblokComponent blok={story.content.body[1]} />
```

This is not ideal, as a change in the CMS by the author will break the anticipated design.

A better, more flexible and robust solution would be to fetch everything via:

```javascript
<StoryblokComponent blok={story.content} />
```

#### Fallbacks

Also there are no fallbacks included. If there's an issue on Storyblok's end or the CMS author removes a components, it'll likely throw a 404 error. Which will be handled in the frontend.

#### Dynamic rendering

An even smoother approach would be to [Render Storyblok Stories Dynamically in Astro](https://www.storyblok.com/tp/render-storyblok-stories-dynamically-in-astro). This would reduce the amount of code in the frontend and increase flexibility for the author, if desired.

#### Draft mode

Lastly, hitting the "Save" button in Storyblok will publish the changes immediately and not save it as a draft. This might be due to the [Netlify adapter](https://docs.astro.build/en/guides/integrations-guide/netlify/) and / or the implementation in the frontend.
