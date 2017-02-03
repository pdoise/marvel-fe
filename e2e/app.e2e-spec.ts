import { MarvelFePage } from './app.po';

describe('marvel-fe App', function() {
  let page: MarvelFePage;

  beforeEach(() => {
    page = new MarvelFePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
