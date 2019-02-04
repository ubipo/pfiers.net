import SiteDataDeserializationException from "./SiteDataDeserializationException";

export type Project = {
  abrv: string,
  name: string,
  urlSafeName: string,
  technologies: Array<Technology>,
  gitUrl: string | null,
  short: string,
  longMdUrl: string | null,
  imgUrl: string | null
}

export type Technology = {
  name: string,
  urlSafeName: string,
  iconUrl: string,
  projects: Array<Project>,
  short: string,
  longMdUrl: string | null
}

type SerealizedSiteData = {
  projects: Array<any>,
  technologies: Array<any>
}

export type SiteData = {
  projects: Array<Project>,
  technologies: Array<Technology>
}

export class SiteDataLoader {
  data: SiteData | null = null;

  load(): Promise<SiteData> {
    return new Promise((resolve, reject) => {
      ajaxGetProjects().then(json => {
        let serialized: object = {};
        try {
          serialized = JSON.parse(json);
        } catch (err) {
          if (err.name === "SyntaxError")
            return reject(`JSON Parser Error: ${err.message}`);
        }
  
        if (!isSerealizedSiteData(serialized))
          return reject(`Data Structure Error: Site data is not in the right format.`)
  
        try {
          this.data = deserialize(serialized);

        } catch (err) {
          if (err.name === "SiteDataDeserializationException")
            return reject(`Deserializer Error: ${err.message}`);
        }

        return resolve();
      }).catch(err => reject(`HTTP Error: ${err}`));
    });
  }
}

function isSerealizedSiteData(obj: any): obj is SerealizedSiteData {
  if (!Object.prototype.hasOwnProperty.call(obj, 'projects') || !Array.isArray(obj['projects']))
    return false;

  if (!Object.prototype.hasOwnProperty.call(obj, 'technologies') || !Array.isArray(obj['technologies']))
    return false;

  return true;
}

function ajaxGetProjects(): Promise<string> {
  let req = new XMLHttpRequest();
  req.open("GET", "/content/siteData.json");

  return new Promise((resolve, reject) => {
    req.addEventListener("load", e => {
      if (req.status !== 200)
        return reject(req.statusText);

      resolve(req.responseText);
    });
    req.send();
  });
}

/**
 * 
 * @param serializedProjects 
 * 
 * @throws {SiteDataDeserializationException} 
 */
function deserialize(serializedProjects: SerealizedSiteData): 
{
  projects: Array<Project>,
  technologies: Array<Technology>
}
{
  let projects: Array<Project> = [];
  let technologies: Array<Technology> = [];

  for (const p of serializedProjects.projects) {
    // Temporary mock technology object, to be replaced in cyclic pass
    let technologiesMock = p.technologies.map((technology: string) => {
      return {
        name: technology
      }
    });

    let name = normalize(p.name);
    if (name === null)
      throw new SiteDataDeserializationException(`Unnamed project`);

    if (projects.find(val => val.name === name) !== undefined)
      throw new SiteDataDeserializationException(`A project with the name "${name}" already exists`);

    projects.push({
      abrv: normalize(p.abrv),
      name: name,
      urlSafeName: normalize(p.urlSafeName, makeUrlSafe(p.name)),
      technologies: technologiesMock,
      gitUrl: normalize(p.gitUrl),
      short: normalize(p.short),
      longMdUrl: normalize(p.longMdUrl) === null ? null : `/content/${p.longMdUrl}`,
      imgUrl: normalize(p.img) === null ? null : `/content/${p.img}`
    });
  }

  for (const t of serializedProjects.technologies) {
    let name = normalize(t.name);
    if (name === null)
      throw new SiteDataDeserializationException(`Unnamed technology`);

    if (technologies.find(val => val.name === name) !== undefined)
      throw new SiteDataDeserializationException(`A technology with the name "${name}" already exists`);
    
    let urlSafeName = normalize(t.urlSafeName, makeUrlSafe(t.name));
    technologies.push({
      name: name,
      urlSafeName: urlSafeName,
      iconUrl: `/content/tech-icons/${normalize(t.iconName, `${urlSafeName}`)}.svg`,
      short: normalize(t.short),
      longMdUrl: normalize(t.longMdUrl) === null ? null : `/content/${t.longMdUrl}`,
      projects: [] // To be filled in cyclic pass
    });
  }

  // Cyclic pass, makes references from projects to technologies and vice versa
  for (const project of projects) {
    for (let i = 0; i < project.technologies.length; i++) {
      const mockTechnology = project.technologies[i];
      let actualTechnology = technologies.find(val => val.name === mockTechnology.name);

      if (actualTechnology === undefined)
        throw new SiteDataDeserializationException(`Technology "${mockTechnology.name}" of ${project.name} could not be found`);

      actualTechnology.projects.push(project);
      project.technologies.splice(i, 1, actualTechnology);
    }
  }

  let siteData = {
    projects: projects,
    technologies: technologies
  }
  return siteData;
}

function makeUrlSafe(url: string): string {
  return encodeURIComponent(url.toLowerCase().replace(/ ?[ -] ?/g, '-'));
}

function normalize(val: any, def: any = null) {
  if (val === undefined || val === null)
    return def;

  return val;
}
