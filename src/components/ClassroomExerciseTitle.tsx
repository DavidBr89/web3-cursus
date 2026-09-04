import useBaseUrl from "@docusaurus/useBaseUrl";

type ClassroomExerciseTitleProps = {
  children: string;
};

export default function ClassroomExerciseTitle({
  children,
}: ClassroomExerciseTitleProps) {
  return (
    <header className="technologyTitle">
      <a
        className="technologyTitle__logoLink"
        href="https://classroom50.org/"
        aria-label="Open Classroom50"
      >
        <img
          className="technologyTitle__logo"
          src={useBaseUrl("/img/classroom50.svg")}
          alt=""
        />
      </a>
      <h1>{children}</h1>
    </header>
  );
}
