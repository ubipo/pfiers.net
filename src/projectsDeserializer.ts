import * as serializedProjects from "./res/projects.json";

export interface Project {
  name: string,
  technologies: Array<string>,
  short: string,
  imgUrl: string
}

export function deserializeProjects(): Array<Project> {
  return serializedProjects.default.map((s: any) => {
    return {
      name: s.name,
      technologies: s.technologies,
      short: s.short,
      imgUrl: `/dist/res/${s.imgUrl}`
    }
  });
}