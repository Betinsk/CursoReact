import React, { Component } from 'react';
import './Home.css';
import { Posts } from '../../components/Posts/posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button/button';
import { TextInput } from '../../components/textInput/textInput';

class Home extends Component {
  state = {
    posts: [
    ],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: ''
  };


  componentDidMount() {
    this.loadPosts();
  }


  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state

    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage })
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
  }


  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noNorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase()
        )
      })
      : posts;
      
    return (
      <section className='container'>

      <div className='search-container'>
          {!!searchValue && (
            <h1> search: {searchValue}</h1>
          )}

          <TextInput searchValue={searchValue}
            handleChange={this.handleChange} />

        </div>


        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts</p>
        )}

        <div className='button-container'>
          {!searchValue && (
            <Button text="On"
              onClick={this.loadMorePosts}
              disabled={noNorePosts} />
          )}


        </div>
      </section>
    )
  }
}
export default Home;