const  { test , describe , expect ,beforeEach } = require('@playwright/test')

const loginWith = async (page, username, password) =>{

    await page.fill('[name="userName"]',username)
    await page.fill('[name="password"]',password)
    await page.getByRole('button', { name: 'login' }).click();
    
}


const createBlog = async (page,tittle,author,url) => {
    await page.getByRole('button', {name : 'Create new Blog'}).click()
    await page.fill('[name="tittle"]',tittle)
    await page.fill('[name="author"]',author)
    await page.fill('[name="url"]',url)
    await page.getByRole('button', {name : 'create'}).click()
    await page.getByText(`a new blog ${tittle} by ${author} added`).waitFor()
}   


const createBlogAfter = async (page,tittle,author,url) => {
    await page.getByRole('button', {name : 'Cancel'}).waitFor()
    await page.getByRole('button', {name : 'Cancel'}).click()
    await page.getByRole('button', {name : 'Create new Blog'}).click()
    await page.fill('[name="tittle"]',tittle)
    await page.fill('[name="author"]',author)
    await page.fill('[name="url"]',url)
    await page.getByRole('button', {name : 'create'}).click()
    await page.getByText(`a new blog ${tittle} by ${author} added`).waitFor()

    const buttonsView = page.locator('button', { hasText: 'view' });

    const likes = page.locator('div.likes');

    

    for (let i = 0; i < await buttonsView.count(); i++) {
        await buttonsView.nth(i).click();
       
    }

    const buttonsLikes = page.locator('button', { hasText: 'like' });
    await buttonsLikes.nth(1).click();
    await expect(likes.nth(1)).toHaveText('1', { timeout: 10000 }); // espera hasta 10 segundos
    await page.getByRole('button', {name : 'Remove'}).nth(1).waitFor()
  
    const count = await likes.count();
    const firstValue = parseInt(await likes.nth(0).textContent(), 10);
 
    for (let e = 2; e < count; e++) {
        const currentValue = parseInt(await likes.nth(e).textContent(), 10);
      
        expect(firstValue).toBeGreaterThan(currentValue);
    };


}

export { loginWith ,createBlog, createBlogAfter}