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
      label: "JavaScript Fundamenten",
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
        {
          type: "category",
          label: "Beschrijven van de UI",
          collapsed: true,
          link: { type: "doc", id: "react/components" },
          items: ["react/components-oefening"],
        },
        {
          type: "category",
          label: "State",
          collapsed: true,
          link: { type: "doc", id: "react/state" },
          items: ["react/state-oefening"],
        },
        {
          type: "category",
          label: "Interactiviteit",
          collapsed: true,
          link: { type: "doc", id: "react/interactivity" },
          items: ["react/interactivity-oefening"],
        },
        "react/styling",
        {
          type: "category",
          label: "Hooks",
          collapsed: true,
          link: { type: "doc", id: "react/hooks" },
          items: ["react/hooks-oefening"],
        },
        {
          type: "category",
          label: "Context",
          collapsed: true,
          link: { type: "doc", id: "react/context" },
          items: ["react/context-oefening"],
        },
        {
          type: "category",
          label: "Routing",
          collapsed: true,
          link: { type: "doc", id: "react/router" },
          items: ["react/router-oefening"],
        },
        {
          type: "category",
          label: "Formulieren",
          collapsed: true,
          link: { type: "doc", id: "react/hook-form" },
          items: ["react/hook-form-oefening"],
        },
        {
          type: "category",
          label: "Data fetching",
          collapsed: true,
          items: [
            "react/axios",
            "react/query",
            "react/data-fetching-oefening",
          ],
        },
        "react/architecture",
        "react/testing",
      ],
    },
    {
      type: "category",
      label: "Node.js en Express",
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Node.js en Express",
          collapsed: true,
          link: { type: "doc", id: "node/index" },
          items: ["node/index-oefening"],
        },
        {
          type: "category",
          label: "Routes en middleware",
          collapsed: true,
          link: { type: "doc", id: "node/routes-middleware" },
          items: ["node/routes-middleware-oefening"],
        },
        {
          type: "category",
          label: "REST API",
          collapsed: true,
          link: { type: "doc", id: "node/rest-api" },
          items: ["node/rest-api-oefening"],
        },
        {
          type: "category",
          label: "Validatie en fouten",
          collapsed: true,
          link: { type: "doc", id: "node/validation-errors" },
          items: ["node/validation-errors-oefening"],
        },
        {
          type: "category",
          label: "Prisma",
          collapsed: true,
          link: { type: "doc", id: "node/prisma" },
          items: ["node/prisma-oefening"],
        },
        {
          type: "category",
          label: "Authenticatie en beveiliging",
          collapsed: true,
          link: { type: "doc", id: "node/auth-security" },
          items: ["node/auth-security-oefening"],
        },
      ],
    },
    "voorbeeldcode",
    "lesopnames",
    {
      type: "category",
      label: "Project",
      link: { type: "doc", id: "project/index" },
      collapsed: true,
      items: ["project/geintegreerd", "project/nodejs", "project/onderwerp"],
    },
  ],
};

export default sidebars;
