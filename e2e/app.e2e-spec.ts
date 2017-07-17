import { NathansweatherPage } from './app.po';

describe('nathansweather App', () => {
  let page: NathansweatherPage;

  beforeEach(() => {
    page = new NathansweatherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
