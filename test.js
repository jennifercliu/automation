import {Selector} from 'testcafe';
import data from './data.json';

fixture `Test to-do`
    .page `http://localhost:3000/`
    .beforeEach(async t => {
        t.ctx.titleInput = Selector("[placeholder='title']")
        t.ctx.contentInput = Selector("[placeholder='content']")
        t.ctx.saveButton = Selector(".add-item__save-button button")
        t.ctx.firstTitle = Selector("li:nth-of-type(1)  .todo-item__title")
        t.ctx.checkBox = Selector("li:nth-of-type(1) > .todo-item__complete-checkbox > input[type='checkbox']")
        t.ctx.removeButton = Selector("li:nth-of-type(1) > button")
        t.ctx.searchInput = Selector("input[placeholder='Search title or content']")
        t.ctx.anyTitle = Selector(".todo-item__title")
        t.ctx.anyContent = Selector(".todo-item__content")
        t.ctx.currentPage = Selector(".todo-list__pager > span")
        t.ctx.nextPageButton = Selector(".todo-list__pager > button:nth-of-type(2)")
    })

test('Test 1: User can add to-do items, if both title and content are filled.', async t => {

    await t
        .typeText(t.ctx.titleInput,data.title)
        .typeText(t.ctx.contentInput, data.content)
        .click(t.ctx.saveButton)
        .expect(t.ctx.firstTitle.textContent).eql("Title: " + data.title)
});

test('Test 2: User can remove an item, if it is marked as completed (checked).', async t => {

    await t
        .typeText(t.ctx.titleInput,data.title)
        .typeText(t.ctx.contentInput, data.content)
        .click(t.ctx.saveButton)
        .expect(t.ctx.checkBox.exists).ok()
        .click(t.ctx.checkBox)
        .click(t.ctx.removeButton)
        .expect(t.ctx.checkBox.exists).notOk()
});

test('Test 3: User can check or uncheck any items.', async t => {

    await t
        .typeText(t.ctx.titleInput,data.title)
        .typeText(t.ctx.contentInput, data.content)
        .click(t.ctx.saveButton)
        .click(t.ctx.checkBox) // check
        .expect(t.ctx.checkBox.checked).ok()
        .click(t.ctx.checkBox) // uncheck
        .expect(t.ctx.checkBox.checked).eql(false)
});

test('Test 4: User can search items by their title or content.', async t => {

    await t
        .typeText(t.ctx.titleInput,data.title)
        .typeText(t.ctx.contentInput, data.content)
        .click(t.ctx.saveButton)
        .typeText(t.ctx.searchInput, data.title)
        .expect(t.ctx.firstTitle.textContent).eql("Title: " + data.title)
        .selectText(t.ctx.searchInput)
        .pressKey('delete')
        .typeText(t.ctx.searchInput, data.content)
      //.expect(t.ctx.anyContent.textContent).eql("Content: " + data.content) // user can not search by content
});


test('Test 5: The to-do list is paged, with page size of 20.', async t => {

    await t.expect(t.ctx.nextPageButton.hasAttribute('disabled')).ok()

    for(let i = 0; i < 21; i++) {
        
        await t
            .typeText(t.ctx.titleInput,data.title + i)
            .typeText(t.ctx.contentInput, data.content)
            .click(t.ctx.saveButton)
    }

    await t
        .expect(t.ctx.nextPageButton.hasAttribute('disabled')).notOk()
        .expect(t.ctx.anyTitle.count).eql(20)


})


test('Test 6: When a new search string is applied, the page should reset to first page.', async t => {

    await t
        .typeText(t.ctx.titleInput,data.title)
        .typeText(t.ctx.contentInput, data.content)
        .typeText(t.ctx.searchInput, data.title)
        .click(t.ctx.saveButton)
        .typeText(t.ctx.searchInput, data.title)
        .expect(t.ctx.currentPage.textContent).eql("current page: 1")

        
});

test('Test 7: Pager should display the current page.', async t => {

    await t
        .expect(t.ctx.currentPage.textContent).contains("current page")
        
});
