import { Router } from "vue-router";


export function subIsActive(router: Router, input: string, exact: boolean = false) {
  const paths = Array.isArray(input) ? input : [input];
  const currentPath = router.currentRoute.value.path
  const res = paths.some(path => exact ? currentPath === path : currentPath.startsWith(path))
  return res
}
