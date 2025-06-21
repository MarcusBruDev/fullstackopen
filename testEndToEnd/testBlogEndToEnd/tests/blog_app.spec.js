const  { test , describe , expect ,beforeEach } = require('@playwright/test')
const { loginWith ,createBlog, createBlogAfter} = require('./helper')

describe('Blog App', ()=>{

  beforeEach(async ({page ,request})=>{
        
    await request.post('/api/testing/reset')
    await request.post('/api/users',{
      data:{
        name:'MarcusDevTest',
        username:'MarcusDevTest',
        password: 'MarcusDevTest'
      }
    })
    await request.post('/api/users',{
      data:{
        name:'UserNopuedeEliminar',
        username:'UserNopuedeEliminar',
        password: 'UserNopuedeEliminar'
      }
    })


    await page.goto('/')
    await page.getByRole('button',{name: 'Log in'}).click()
  })


  test('Login form is shown', async ({page})=>{
    await expect(page.getByText('Log in to application')).toBeVisible() 
  })

  describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {
      // ...
      await loginWith(page,'MarcusDevTest','MarcusDevTest')
      await expect(page.getByText('MarcusDevTest logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page,'MarcusDevTest','wrong')
      await expect(page.getByText('MarcusDevTest logged in')).not.toBeVisible()
    })

    describe('When logged in', () => {

      beforeEach(async ({ page }) => {
        await loginWith(page,'MarcusDevTest','MarcusDevTest')
      })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page,'Test','Test','Test')
        //await page.getByRole('button', {name : 'view'}).waitFor()
        await page.getByText('a new blog Test by Test added').waitFor()
        await expect(page.getByText('a new blog Test by Test added')).toBeVisible()
      })

      describe('When blog is created',()=>{
        beforeEach(async ({page,request})=>{
          await loginWith(page,'MarcusDevTest','MarcusDevTest')
          await createBlog(page,'Test','Test','Test1')
        })
                    
        test('Blog can be liked', async ({page})=>{
          await page.getByRole('button', {name : 'view'}).waitFor()
          await page.getByRole('button', {name : 'view'}).click()
          await page.getByRole('button', {name : 'like'}).waitFor()
        
          const likes = page.locator('div.likes');
        
          const like = likes.first(); // Selecciona el primer elemento de likes
          const valorAntes = await like.textContent();

                
          console.log('Valor antes ', valorAntes)
          await page.getByRole('button', {name : 'like'}).click()
                                                       
          await expect.poll(async () => {    // poll es una funcion de expect que permite esperar quye el valor like.textContent() cambie, esperoa un toempo comfigurable en este caso soin 5000 ms cuaqndo se cumpla la condicion de que no es igual al anterior sale y dqa el resultradio.
            return await like.textContent();  
          }, {
            message: 'El contador no cambió después de hacer clic',
            timeout: 5000, // espera máxima en ms
          }).not.toBe(valorAntes);
        })

        test('User can deleted blog',async ({page})=>{
          await page.getByRole('button', {name : 'view'}).waitFor()
          await page.getByRole('button', {name : 'view'}).click()
          const botonDeleted= await page.getByRole('button', {name : 'Remove'})
          await expect(botonDeleted).toBeVisible({ timeout: 10000 }); 

          // Escuchar el evento 'dialog' ANTES del clic // esto por que el cuado dr dialogo puede ejecutarse inmediatamente despues del click
          page.once('dialog', async (dialog) => {
            console.log('Dialog message:', dialog.message());
            await dialog.accept(); // o dialog.dismiss() según lo que necesites
          });

          await page.getByRole('button', {name : 'Remove'}).click()

          await page.getByText('Blog Test by Test removed').waitFor()
          await expect(page.getByText('Blog Test by Test removed')).toBeVisible()
        })

        test('User not authorized to delete blog',async ({page})=>{
          await page.getByRole('button', {name : 'Logout'}).waitFor()
          await page.getByRole('button', {name : 'Logout'}).click()
          await loginWith(page,'UserNopuedeEliminar','UserNopuedeEliminar')
          await page.getByRole('button', {name : 'view'}).waitFor()
          await page.getByRole('button', {name : 'view'}).click()
          const botonDeleted= await page.getByRole('button', {name : 'Remove'})
          await expect(botonDeleted).not.toBeVisible({ timeout: 10000 }); 
        })

        test('Blog with most likes is at first',async ({page}) => {
        

                await createBlog(page,'Test2','Test2','Test2')
                await createBlog(page,'Test3','Test3','Test3')
                await createBlog(page,'Test4','Test4','Test4')

                const buttonsView = page.locator('button', { hasText: 'view' });
                const likes = page.locator('div.likes');

                for (let i = 0; i < await buttonsView.count(); i++) {
                    await buttonsView.nth(i).click();
                
                }

                const buttonsLikes = page.locator('button', { hasText: 'like' });

                await buttonsLikes.nth(1).click();
                await expect(likes.nth(0)).toHaveText('1', { timeout: 10000 }); // espera hasta 10 segundos para que cambi el valor de likes
                await page.getByRole('button', {name : 'Remove'}).nth(1).waitFor()
            
                const count = await likes.count();
                const firstValue = parseInt(await likes.nth(0).textContent(), 10);

                expect(count).toBeGreaterThanOrEqual(2); // Aseguramos que haya al menos dos blogs para comparar        
                for (let e = 2; e < count; e++) {
                    const currentValue = parseInt(await likes.nth(e).textContent(), 10);
                
                    expect(firstValue).toBeGreaterThan(currentValue);
                };
 
        })


      })
    })
  })
})