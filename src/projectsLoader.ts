import * as serializedProjects from "./res/projects.json";

export type tProject = {
  abrv: string,
  name: string,
  urlSafeName: string,
  technologies: Array<string>,
  gitUrl: string | null,
  short: string,
  longMdUrl: string | null,
  imgUrl: string | null
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
        return reject(`JSON Parser Error: ${String(err)}`);
      }

      resolve(deserializeProjects(projectsJSON));
    });
    req.send();
  });
}

function normalize(val: any, def: any = null, throwOnNull: boolean = false) {
  if (val === undefined || val === null) {
    if (throwOnNull) {
      throw new Error("Error parsing projects!");
    } else {
      return def;
    }
  }
  
  return val;
}

function deserializeProjects(serializedProjects: Array<any>): Array<tProject> {
  let projects: Array<tProject> = serializedProjects.map((s: any) => {
    return {
      abrv: s.abrv,
      name: normalize(s.name, null, true),
      urlSafeName: normalize(s.urlSafeName, makeUrlSafe(s.name)),
      technologies: normalize(s.technologies, []),
      gitUrl: normalize(s.gitUrl),
      short: normalize(s.short),
      longMdUrl: normalize(s.longMd) === null ? null : `/content/${s.longMd}`,
      imgUrl: normalize(s.img) === null ? null :  `/content/${s.img}`
    }
  });
  return projects;
}
