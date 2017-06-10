import { ObservableExamplePage } from './app.po';

describe('observable-example App', () => {
  let page: ObservableExamplePage;

  beforeEach(() => {
    page = new ObservableExamplePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
