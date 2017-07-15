import { FileSaveNg4ExamplePage } from './app.po';

describe('file-save-ng4-example App', () => {
  let page: FileSaveNg4ExamplePage;

  beforeEach(() => {
    page = new FileSaveNg4ExamplePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
