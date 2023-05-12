import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword';
import SessionReact from 'supertokens-auth-react/recipe/session';
import Router from 'next/router';
import { appInfo } from './appInfo';

export const frontendConfig = () => ({
  appInfo,
  recipeList: [EmailPasswordReact.init(), SessionReact.init()],
  windowHandler: (oI: any) => ({
    ...oI,
    location: {
      ...oI.location,
      setHref: (href: string) => {
        Router.push(href);
      },
    },
  }),
});
