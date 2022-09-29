import * as jsYaml from 'js-yaml'


export default function parseYaml(yaml: string) {
  return jsYaml.load(yaml, { schema: jsYaml.FAILSAFE_SCHEMA })
}
