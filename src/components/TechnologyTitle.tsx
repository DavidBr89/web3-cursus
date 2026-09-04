import type { SimpleIcon } from "simple-icons";
import {
  siAxios,
  siBruno,
  siExpress,
  siGithub,
  siJsonwebtokens,
  siNodedotjs,
  siPrisma,
  siReact,
  siReacthookform,
  siReactrouter,
  siTailwindcss,
  siTanstack,
  siTestinglibrary,
  siVitest,
  siYarn,
  siZod,
} from "simple-icons";

const panoptoIcon = {
  title: "Panopto",
  slug: "panopto",
  hex: "5C8F22",
  path: "M6 3.8v16.4a1.5 1.5 0 0 0 2.3 1.27l11.4-8.2a1.55 1.55 0 0 0 0-2.54L8.3 2.53A1.5 1.5 0 0 0 6 3.8Z",
} as SimpleIcon;

const technologies = {
  axios: { icon: siAxios, href: "https://axios-http.com/" },
  bruno: { icon: siBruno, href: "https://www.usebruno.com/" },
  express: { icon: siExpress, href: "https://expressjs.com/" },
  github: { icon: siGithub, href: "https://github.com/" },
  jwt: { icon: siJsonwebtokens, href: "https://www.jwt.io/" },
  node: { icon: siNodedotjs, href: "https://nodejs.org/" },
  panopto: { icon: panoptoIcon, href: "https://www.panopto.com/" },
  prisma: { icon: siPrisma, href: "https://www.prisma.io/" },
  react: { icon: siReact, href: "https://react.dev/" },
  reactHookForm: { icon: siReacthookform, href: "https://react-hook-form.com/" },
  reactRouter: { icon: siReactrouter, href: "https://reactrouter.com/" },
  tailwind: { icon: siTailwindcss, href: "https://tailwindcss.com/" },
  tanstack: { icon: siTanstack, href: "https://tanstack.com/query/latest" },
  testingLibrary: { icon: siTestinglibrary, href: "https://testing-library.com/" },
  vitest: { icon: siVitest, href: "https://vitest.dev/" },
  yarn: { icon: siYarn, href: "https://yarnpkg.com/" },
  zod: { icon: siZod, href: "https://zod.dev/" },
} satisfies Record<string, { icon: SimpleIcon; href: string }>;

export type Technology = keyof typeof technologies;

type TechnologyTitleProps = {
  children: string;
  technologies: Technology[];
};

const iconColor = (icon: SimpleIcon) =>
  icon.hex === "000000" ? "currentColor" : `#${icon.hex}`;

export default function TechnologyTitle({
  children,
  technologies: selectedTechnologies,
}: TechnologyTitleProps) {
  return (
    <header className="technologyTitle">
      <span className="technologyTitle__logos">
        {selectedTechnologies.map((technology) => {
          const { icon, href } = technologies[technology];

          return (
            <a
              className="technologyTitle__logoLink"
              href={href}
              aria-label={`Open de officiële website van ${icon.title}`}
              key={technology}
            >
              <svg
                className="technologyTitle__logo technologyTitle__brandLogo"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill={iconColor(icon)}
              >
                <path d={icon.path} />
              </svg>
            </a>
          );
        })}
      </span>
      <h1>{children}</h1>
    </header>
  );
}
