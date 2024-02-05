import { NextRouter } from 'next/router';

export const createMockRouter = (router: Partial<NextRouter>): NextRouter => {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    isLocaleDomain: false,
    replace: () => new Promise((resolve) => resolve(true)),
    reload: () => {},
    push: jest.fn(),
    ...router,
  };
};

export const mockNextUseRouter = (router: Partial<NextRouter>) => {
  (jest.requireActual('next/router').useRouter as jest.Mock).mockReturnValue(createMockRouter(router));
};

export const mockNextNavigation = () => {
  const routerPushMock = jest.fn();
  jest.mock('next/navigation', () => ({
    useRouter: jest.fn().mockReturnValue({ push: routerPushMock }),
  }));
  return routerPushMock;
};
