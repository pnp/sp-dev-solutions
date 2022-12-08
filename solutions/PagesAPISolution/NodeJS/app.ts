import GraphPagesAPI, { IPage } from './GraphController.js';
import config from './config.js';
import print from './logHelper.js';

const { siteId } = config;

// uncomment to activate each example:
// GetToken()
ListPages()
// CopyPageToMultipleSites(/* page id */, [/* site ids */])
// DeletePageBeforeTargetDate(/* target date*/);
// PromotePagesAsNews([ /* page ids */]);

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

  const list = await print.log("Get pages list", GraphPages.listPages(config.siteId));

  for (let i = 0; i < list.value.length; i++) {
    console.log(list.value[i]);
  }
}

/**
 * Scenario #2: Copy a page to multiple sites
 *
 * @param {string} sourcePageId - source page id
 * @param {string[]} targetSiteIds - target site ids
 */
async function CopyPageToMultipleSites(sourcePageId: string, targetSiteIds: string[]) {
  console.log('Copy page to multiple sites ...');
  console.log('*'.repeat(80));

  const GraphPages = new GraphPagesAPI(config);
  const token = await GraphPages.getAuthenticationToken();
  print.logToken(token);
  GraphPages.storeToken(token);

  const sourcePage = await print.log("Get page content", GraphPages.getPage(siteId, sourcePageId));

  for (let targetSiteId of targetSiteIds) {
    const targetPage = modifyPage(sourcePage);
    const page = await print.log(`Creating page(${targetPage.name})`, GraphPages.createPage(targetSiteId, targetPage));
    await print.log(`Publish page(${page.id})`, GraphPages.publishPage(targetSiteId, page.id!));
  }

  console.log(`Copy page to ${targetSiteIds.length} sites successfully!`);
  console.log('*'.repeat(80));
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

  const response = await print.log("List pages", GraphPages.listPages(siteId));
  const pageList: IPage[] = response.value;

  pageList
    .filter(page => new Date(page.lastModifiedDateTime!) < date)
    .forEach(async page => {
      print.log("Deleting page", GraphPages.deletePage(siteId, page.id!));
    });
}

/**
 * Scenario #4: Promote multiple pages as newposts
 *
 * @param {string[]} pageIds - Ids of the pages should be promoted
 */
async function PromotePagesAsNews(pageIds: string[]) {
  const GraphPages = new GraphPagesAPI(config);
  const token = await GraphPages.getAuthenticationToken();
  print.logToken(token);
  GraphPages.storeToken(token);

  pageIds
    .forEach(id => {
      print.log("Update page", GraphPages.updatePage(siteId, id, { promotionKind: 'newsPost' }));
    });
}

/**
 * Update this function to modify your own page
 * @param {IPage} sourcePage
 * @return {*}  {IPage}
 */
function modifyPage(sourcePage: IPage): IPage {
  return {
    ...sourcePage,
  };
}
