import serializedSiteDataSchema from './serialized-site-data.jschema'
import Ajv from 'ajv'
const ajv = new Ajv()
const ajvValidate = ajv.compile(JSON.parse(serializedSiteDataSchema))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function validateSerializedSiteData(o: any): string | undefined {
  const valid = ajvValidate(o)
  if (!valid) return ajv.errorsText(ajvValidate.errors)
  return
}
