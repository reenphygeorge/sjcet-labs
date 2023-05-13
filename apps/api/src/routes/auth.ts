import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Dashboard from 'supertokens-node/recipe/dashboard';
import env from '../helpers/env';

const supertokensInit = () => {
  supertokens.init({
    framework: 'express',
    supertokens: {
      connectionURI: env.supertokensConnectionURL,
      apiKey: env.apiKey,
    },
    appInfo: {
      appName: env.appName,
      apiDomain: env.apiDomain,
      websiteDomain: env.websiteDomain,
      apiBasePath: env.apiBasePath,
      websiteBasePath: env.websiteBasePath,
    },
    recipeList: [EmailPassword.init(), Session.init(), Dashboard.init()],
  });
};

export default supertokensInit;
