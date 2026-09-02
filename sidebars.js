// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    "intro",
    {
      type: "category",
      label: "Ontwikkelomgeving",
      link: { type: "doc", id: "ontwikkelomgeving" },
      collapsed: true,
      items: ["vscode", "nodejs"],
    },
    {
      type: "category",
      label: "JavaScript Verdieping",
      link: { type: "doc", id: "es6-plus" },
      collapsed: true,
      items: ["es6-plus", "modern-js-async"],
    },
    {
      type: "category",
      label: "TypeScript",
      link: { type: "doc", id: "typescript" },
      collapsed: true,
      items: ["typescript", "typescript-oefening"],
    },
    {
      type: "category",
      label: "React",
      collapsed: true,
      link: { type: "doc", id: "react/index" },
      items: [
        "react/components",
        "react/state",
        "react/interactivity",
        "react/hooks",
        "react/router",
        "react/hook-form",
        "react/axios",
        "react/query",
      ],
    },
    {
      type: "category",
      label: "Project",
      link: { type: "doc", id: "project/index" },
      collapsed: true,
      items: [
        "project/geintegreerd",
        "project/nodejs",
        "project/onderwerp",
      ],
    },
  ],
};

export default sidebars;
