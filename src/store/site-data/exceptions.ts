import { Exception } from '../../util/exception'

export class NoSiteDataException extends Exception {
  public name = 'NoSiteDataException';
}

export class SiteDataFetchException extends Exception {
  public name = 'SiteDataFetchException'
}
