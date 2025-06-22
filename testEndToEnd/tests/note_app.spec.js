const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith , createNote }= require('./helper')



describe('Note app tests',async () => {
  

    beforeEach(async ({ page ,request }) => {
       
       await request.post('/api/testing/reset')
       await request.post('/api/users',{
            data:{
                name:'MarcusDevTest',
                userName:'MarcusDevTest',
                password: 'MarcusDevTest'
            }
        })
        await page.goto('/')
    })



    
    test('user can login with correct credentials', async ({ page}) => {
        await loginWith(page,'MarcusDevTest','MarcusDevTest')
        await expect(page.getByText('MarcusDevTest logged-in')).toBeVisible()
    })

    test('login fails with wrong password',async ({page})=>{
        await page.getByRole('button', {name:'Log-in'}).click()
        await page.fill('[name="Username"]', 'MarcusDevTest')
        await page.fill('[name="Password"]', 'wrong')
        await page.getByRole('button', {name:'Login'}).click()
        const errorDiv = await page.locator('.error')

        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('MarcusDevTest logged-in')).not.toBeVisible()

    })

    test('front page can be opened', async ({ page }) => {
        
        const locator = await page.getByText('Notes') 
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
    })


    describe('When logged in',  () => {
        

        beforeEach(async ({ page }) => {
            await loginWith(page,'MarcusDevTest','MarcusDevTest')
        })
      
        
        test('a new note can be created', async ({ page }) => {
            await createNote(page,'prueba',true)
            await expect(page.getByText('prueba')).toBeVisible()

        })

        describe('and several notes exists',() =>{

            beforeEach( async ({page})=>{
                await createNote(page,'first note',true)
                await createNote(page,'second note',true)
                await createNote(page,'third note',true)
            })

            test('importance can be changed', async ({ page }) => {
                await page.pause()
                const otherNoteText = await page.getByText('second note')
                const otherNoteElement = await otherNoteText.locator('..')

                await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
                await expect(otherNoteElement.getByText('make important')).toBeVisible()

            })


        })


    })

   


})
