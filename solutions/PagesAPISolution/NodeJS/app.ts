import GraphPagesAPI, { IPage } from './GraphController.js';
import config from './config.js';
import print from './logHelper.js';

const { siteId } = config;

// uncomment to activate each example:
print.logEvent("Scenario #0: Get auth token", GetToken());
print.logEvent("Scenario #1: List all pages in a site", ListPages());
// print.logEvent("Scenario #2: Copy a page to multiple sites", CopyPageToMultipleSites(/* page id */, [/* site ids */]))
// print.logEvent("Scenario #3: Delete pages before a target date", DeletePageBeforeTargetDate(/* target date*/));
// print.logEvent("Scenario #4: Promote pages after a give date as new posts", PromotePagesAsNews(/* target date*/));

/**
 * Scenario #0: Get auth token
 */
async function GetToken() {
  const GraphPages = new GraphPagesAPI(config);
  const token = await GraphPages.getAuthenticationToken();
  print.logToken(token);
}

/**
 * Scenario #1: List all pages in a site
 *
 * @param {string} sourcePageId - source page id
 * @param {string[]} targetSiteIds - target site ids
 */
async function ListPages() {
  const GraphPages = new GraphPagesAPI(config);
  const token = await GraphPages.getAuthenticationToken();
  print.logToken(token);
  GraphPages.storeToken(token);

  const list = await print.logEvent("Get pages list", GraphPages.listPages(config.siteId));

  for (let i = 0; i < list.value.length; i++) {
    print.log(`Page name: ${list.value[i].name}, ID:(${list.value[i].id})`)
  }

  print.log(`Total pages: ${list.value.length}`);
}

/**
 * Scenario #2: Copy a page to multiple sites
 *
 * @param {string} sourcePageId - source page id
 * @param {string[]} targetSiteIds - target site ids
 */
async function CopyPageToMultipleSites(sourcePageId: string, targetSiteIds: string[]) {
  const GraphPages = new GraphPagesAPI(config);
  const token = await GraphPages.getAuthenticationToken();
  print.logToken(token);
  GraphPages.storeToken(token);

  const sourcePage = await print.logEvent(`Get page(${sourcePageId}) content`, GraphPages.getPage(siteId, sourcePageId));
  let count: number = 0;

  for (let targetSiteId of targetSiteIds) {
    const targetPage = modifyPage(sourcePage);
    const page = await print.logEvent(`Creating page(${targetPage.name})`, GraphPages.createPage(targetSiteId, targetPage));
    await print.logEvent(`Publishing page(${page.id})`, GraphPages.publishPage(targetSiteId, page.id!));
    count++;
  }

  print.log(`Copy the page to ${count} sites.`);
}

/**
 * Scenario #3: Delete pages before a target date
 * 
 * @param {Date} date - The target date
 */

async function DeletePageBeforeTargetDate(date: Date) {
  const GraphPages = new GraphPagesAPI(config);
  const token = await GraphPages.getAuthenticationToken();
  print.logToken(token);
  GraphPages.storeToken(token);

  print.log(`Target date: ${date}`);

  const response = await print.logEvent("List all pages", GraphPages.listPages(siteId));
  const pageList: IPage[] = response.value;
  let count: number = 0;

  for (let page of pageList) {
    if (new Date(page.lastModifiedDateTime!) < date) {
      print.log(`Page(ID: ${page.id}, name: ${page.name}, lastModifiedDateTime: ${page.lastModifiedDateTime}) is going to be deleted`);
      await print.logEvent(`Deleting page(${page.name})`, GraphPages.deletePage(siteId, page.id!));
      count++;
    }
  }

  print.log(`Deleted ${count} pages.`);
}

/**
 * Scenario #4: Promote pages after a give date as new posts
 *
 * @param {Date} date - The target date
 */
async function PromotePagesAsNews(date: Date) {
  const GraphPages = new GraphPagesAPI(config);
  const token = await GraphPages.getAuthenticationToken();
  print.logToken(token);
  GraphPages.storeToken(token);

  print.log(`Target date: ${date}`);

  const response = await print.logEvent("List all pages", GraphPages.listPages(siteId));
  const pageList: IPage[] = response.value;
  let count: number = 0;

  for (let page of pageList) {
    if (new Date(page.lastModifiedDateTime!) > date) {
      print.log(`Page(ID: ${page.id}, name: ${page.name}, lastModifiedDateTime: ${page.lastModifiedDateTime}) is going to be promoted`);
      await print.logEvent(`Promoting page(${page.name})`, GraphPages.updatePage(siteId, page.id!, { promotionKind: 'newsPost' }));
      await print.logEvent(`Publishing page(${page.name})`, GraphPages.publishPage(siteId, page.id!));
      count++;
    }
  }

  print.log(`Promoted ${count} pages.`);
}

/**
 * Update this function to modify your own page
 * @param {IPage} sourcePage
 * @return {*}  {IPage}
 */
function modifyPage(sourcePage: IPage): IPage {
  return {
    ...sourcePage
  };
}
