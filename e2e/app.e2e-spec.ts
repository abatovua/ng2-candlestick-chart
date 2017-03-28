import { IntrinioPage } from './app.po';

describe('intrinio App', () => {
  let page: IntrinioPage;

  beforeEach(() => {
    page = new IntrinioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
