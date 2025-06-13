import { render , screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Blog from "../../src/components/Blog";
import { describe, expect ,beforeEach, test, vi} from 'vitest';




describe("Blog Component", () => {
    let container = null;
    beforeEach(() => {
        container =null
    })

    test("Should render blog title and author", async () => {
  
        const blog = {
            title: "Test Blog",
            author: "Test Author",
            user : {
                username: "testuser"
            },
        }
    
        container = render(<Blog blog={blog} username="testuser" />).container;
    
        let url = container.querySelector('.url');
       let likes = container.querySelector('.likes');
        

        expect(container).toHaveTextContent("Test Blog");
        expect(container).toHaveTextContent("Test Author");
        expect(url).toBeFalsy();
        expect(likes).toBeFalsy();
    
    })
    


    test("Should render blog  url and likes when view button is clicked", async () => {
        
        const blog = {
            title: "Test Blog",
            author: "Test Author",
            url: "http://testblog.com",
            likes: 5,
            user: {
                username: "testuser"
            },
        }

        const user = userEvent.setup()
        container = render(<Blog blog={blog} username="testuser" />).container;
        const viewButton = screen.getByText("view");
        await user.click(viewButton);
        let url = container.querySelector('.url');
        let likes = container.querySelector('.likes');
        expect(url).toBeTruthy();
        expect(likes).toBeTruthy(); 
    })

    test('Double click like button ', async () => {
        
        const toggleLike = vi.fn();

        const blog = {
            title: "Test Blog", 
            author: "Test Author",
            url: "http://testblog.com",         
            likes: 5,   
            user: {
                username: "testuser"
            },
        }
        const user = userEvent.setup()
        container = render(<Blog blog={blog} username="testuser" toggleLike={toggleLike}/>).container;
        
        const likeButton = screen.getByText("like");
        await user.dblClick(likeButton);
        
        expect(toggleLike.mock.calls).toHaveLength(2);
        
       })
})
