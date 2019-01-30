import * as serializedProjects from "./res/projects.json";

export interface tProject {
  abrv: string,
  name: string,
  urlSafeName: string,
  technologies: Array<string>,
  gitUrl: string,
  short: string,
  longMdUrl: string,
  imgUrl: string
}

function makeUrlSafe(url: string): string {
  return encodeURIComponent(url.toLowerCase().replace(/ ?[ -] ?/g, '-'));
}

/**
 * Fills the provided array 
 */
export function loadProjects(): Promise<Array<tProject>> {
  let req = new XMLHttpRequest();
  req.open("GET", "/content/projects.json");

  return new Promise((resolve, reject) => {
    req.addEventListener("load", e => {
      if (req.status !== 200) 
        return reject(`HTTP Error: ${req.statusText}`);

      let projectsJSON: any = {};
      try {
        projectsJSON = JSON.parse(req.responseText);
      } catch (err) {
        console.error(err);
      }

      resolve(deserializeProjects(projectsJSON));
    });
    req.send();
  })


}

function deserializeProjects(serializedProjects: any): Array<tProject> {
  let projects: Array<tProject> = serializedProjects.map((s: any) => {
    return {
      abrv: s.abrv,
      name: s.name,
      urlSafeName: s.urlSafeName === null ? makeUrlSafe(s.name) : s.urlSafeName,
      technologies: s.technologies,
      gitUrl: s.gitUrl,
      short: s.short,
      longMdUrl: s.longMd === null ? null : `/content/${s.longMd}`,
      imgUrl: s.img === null ? null : `/content/${s.img}`
    }
  });
  return projects;
}
