import * as serializedProjects from "./res/projects.json";

export type Technology = "ts" | "web" | "webpack";

export interface Project {
  name: string,
  technologies: Array<Technology>,
  short: string,
  imgUrl: string
}

export function deserializeProjects(): Array<Project> {
  return serializedProjects.default.map((s: any) => {
    return {
      name: s.name,
      technologies: s.technologies,
      short: s.short,
      imgUrl: `/src/res/${s.imgUrl}`
    }
  });
}