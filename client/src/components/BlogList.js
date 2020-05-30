import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo'

// step 1: making query
const getBlogQuery = gql`
    {
        Blogs{
            name
            problem
            tag
            id
        }
    }
`

const BlogList=(props)=> {
    const DisplayBlogs=()=>{
        const blogs = props.data;
        if(blogs.loading){
            return (
                <div>Loading Content...</div>
            )
        }else{
            return blogs.Blogs.map(blog=>{
               return <li key = { blog.id }>
                        <strong>{ blog.name }</strong> | { blog.tag }
                    </li>
            })
        }
    }
    return (
        <ul id="Blog-List">
            { DisplayBlogs() }
        </ul>
    )
}

export default graphql(getBlogQuery)(BlogList)
