declare module "*.jpg";
// this doesn't have any types
declare module "pouchdb-debug";
declare module "*.svg" {
  const content: any;
  export default content;
}
